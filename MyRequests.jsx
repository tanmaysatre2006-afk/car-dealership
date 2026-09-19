import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./MyRequests.css";

export default function MyRequests() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("testDrives") || "[]");
    const mine = all.filter((r) => r.userEmail && r.userEmail === user?.email);
    setItems(mine);
  }, [user?.email]);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="myreq-page">
      <div className="myreq-nav">
        <Link className="myreq-back" to="/">← HOME</Link>
        <div className="myreq-title">MY REQUESTS</div>
        <div style={{ width: 120 }} />
      </div>

      <div className="myreq-wrap">
        <h2>Hi, {user.name}</h2>
        <p className="muted">Your booked test drive requests.</p>

        {items.length === 0 ? (
          <div className="myreq-empty">
            <p>No requests yet.</p>
            <Link className="myreq-btn" to="/bmw">Book one</Link>
          </div>
        ) : (
          <div className="myreq-list">
            {items.map((r) => (
              <div className="myreq-card" key={r.id}>
                <div>
                  <h3>{r.car?.name}</h3>
                  <p className="muted">
                    Date: {r.customer?.date} • City: {r.customer?.city}
                  </p>
                </div>

                <div className={`badge ${r.status?.toLowerCase()}`}>
                  {r.status}
                </div>

                <Link className="myreq-link" to={`/cars/${r.car.brand}/${r.car.slug}`}>
                  View Car →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}