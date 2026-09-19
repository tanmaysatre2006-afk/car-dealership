import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const [requests, setRequests] = useState([]);

  const load = () => {
    const data = JSON.parse(localStorage.getItem("testDrives") || "[]");
    setRequests(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = (id, status) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status } : r
    );
    localStorage.setItem("testDrives", JSON.stringify(updated));
    setRequests(updated);
  };

  const deleteReq = (id) => {
    const updated = requests.filter((r) => r.id !== id);
    localStorage.setItem("testDrives", JSON.stringify(updated));
    setRequests(updated);
  };

  const clearAll = () => {
    if (window.confirm("Delete ALL requests?")) {
      localStorage.removeItem("testDrives");
      setRequests([]);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-nav">
        <Link className="admin-back" to="/">← HOME</Link>
        <div className="admin-title">ADMIN DASHBOARD</div>
        <button className="admin-clear" onClick={clearAll}>
          CLEAR ALL
        </button>
      </div>

      <div className="admin-wrap">
        <div className="admin-stats">
          <div className="stat-box">
            <span>Total</span>
            <h2>{requests.length}</h2>
          </div>
          <div className="stat-box">
            <span>Requested</span>
            <h2>{requests.filter((r) => r.status === "REQUESTED").length}</h2>
          </div>
          <div className="stat-box">
            <span>Approved</span>
            <h2>{requests.filter((r) => r.status === "APPROVED").length}</h2>
          </div>
          <div className="stat-box">
            <span>Rejected</span>
            <h2>{requests.filter((r) => r.status === "REJECTED").length}</h2>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="admin-empty">
            <h3>No test drive requests yet.</h3>
            <p>Forms submitted will be shown here.</p>
          </div>
        ) : (
          <div className="admin-table">
            <div className="admin-row admin-head">
              <div>Car</div>
              <div>Customer</div>
              <div>Contact</div>
              <div>Date</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {requests.map((r) => (
              <div className="admin-row" key={r.id}>
                <div>{r.car?.name}</div>

                <div>
                  {r.customer?.fullName}
                  <div className="muted">{r.customer?.city}</div>
                </div>

                <div>
                  {r.customer?.phone}
                  <div className="muted">{r.customer?.email || "—"}</div>
                </div>

                <div>{r.customer?.date}</div>

                <div>
                  <span className={`badge ${r.status?.toLowerCase()}`}>
                    {r.status}
                  </span>
                </div>

                <div className="admin-actions">
                  <button
                    className="btn-approve"
                    onClick={() => updateStatus(r.id, "APPROVED")}
                  >
                    ✓
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => updateStatus(r.id, "REJECTED")}
                  >
                    ✕
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteReq(r.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}