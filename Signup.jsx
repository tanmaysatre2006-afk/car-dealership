import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!name || !email || !password) {
      return setErr("All fields required");
    }

    const res = signup({ name, email, password });
    if (!res.ok) return setErr(res.message);

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>SIGN UP</h2>
        <p>New user account banao.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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