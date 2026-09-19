import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cars } from "./data/cars";
import "./TestDrive.css";
import { useAuth } from "./AuthContext";

export default function TestDrive() {
  const { user } = useAuth();  
  const { brand, slug } = useParams();
  const navigate = useNavigate();

  const car = useMemo(
    () => cars.find((c) => c.brand === brand && c.slug === slug),
    [brand, slug]
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    city: "Mumbai",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!car) {
    return (
      <div className="testdrive-page">
        <div className="testdrive-nav">
          <Link className="testdrive-back" to="/">← BACK HOME</Link>
          <div className="testdrive-title">TEST DRIVE</div>
          <div style={{ width: 120 }} />
        </div>

        <div className="testdrive-card">
          <h2>Car not found</h2>
          <p>Brand/slug match nahi kar raha.</p>
          <Link className="testdrive-btn" to="/">Go Home</Link>
        </div>
      </div>
    );
  }

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.phone || !form.date) {
      setError("Full Name, Phone, and Date required hai.");
      return;
    }

    const payload = {
  id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
  createdAt: new Date().toISOString(),
  userEmail: user?.email || null,   
  car: { brand: car.brand, slug: car.slug, name: car.name },
  customer: form,
  status: "REQUESTED",
};

    const existing = JSON.parse(localStorage.getItem("testDrives") || "[]");
    existing.unshift(payload);
    localStorage.setItem("testDrives", JSON.stringify(existing));

    setSubmitted(true);

    // optional: 2 sec baad back to car details
    setTimeout(() => {
      navigate(`/cars/${car.brand}/${car.slug}`);
    }, 2000);
  };

  return (
    <div className="testdrive-page">
      <div className="testdrive-nav">
        <Link className="testdrive-back" to={`/cars/${car.brand}/${car.slug}`}>
          ← BACK
        </Link>
        <div className="testdrive-title">BOOK TEST DRIVE</div>
        <Link className="testdrive-back" to="/">HOME →</Link>
      </div>

      <div className="testdrive-wrap">
        <div className="testdrive-card">
          <h2>{car.name}</h2>
          <p className="testdrive-sub">
            Fill details — we’ll confirm your slot.
          </p>

          <form onSubmit={onSubmit} className="testdrive-form">
            <label>
              Full Name *
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                placeholder="Enter your name"
              />
            </label>

            <label>
              Phone *
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="10-digit number"
              />
            </label>

            <label>
              Email
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Preferred Date *
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
              />
            </label>

            <label>
              City
              <select name="city" value={form.city} onChange={onChange}>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Pune</option>
                <option>Hyderabad</option>
              </select>
            </label>

            {error && <div className="testdrive-error">{error}</div>}

            <button className="testdrive-btn" type="submit">
              SUBMIT REQUEST
            </button>

            {submitted && (
              <div className="testdrive-success">
                Request submitted! Redirecting back…
              </div>
            )}
          </form>
        </div>

        <div className="testdrive-preview">
          <img src={car.img} alt={car.name} />
        </div>
      </div>
    </div>
  );
}
