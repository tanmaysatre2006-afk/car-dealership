import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const res = login({ email, password });
    if (!res.ok) return setErr(res.message);

    // Admin goes to admin, user goes back or home
    if (res.role === "admin") return navigate("/admin");
    const backTo = location.state?.from || "/";
    navigate(backTo);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>LOGIN</h2>
        <p>Both the User and Admin can login.</p>

        <form className="auth-form" onSubmit={onSubmit}>
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
            LOGIN
          </button>
        </form>

        <div className="auth-links">
          <Link to="/signup">Create account</Link>
          <Link to="/">Back home</Link>
        </div>

        <div style={{ marginTop: 12, color: "#777", fontSize: 12 }}>
          Admin: admin@germanmotors.com / admin123
        </div>
      </div>
    </div>
  );
}