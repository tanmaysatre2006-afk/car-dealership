import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!name || !email || !password) {
      setErr("All fields required");
      return;
    }

    // Login function se naya session create ho jayega
    login(email, password, name);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>SIGN UP</h2>
        <p>New user account banao.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {err && <div className="auth-error">{err}</div>}

          <button className="auth-btn" type="submit">
            CREATE ACCOUNT
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Already have account?</Link>
          <Link to="/">Back home</Link>
        </div>
      </div>
    </div>
  );
}
