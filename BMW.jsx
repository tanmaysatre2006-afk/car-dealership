import React from "react";
import { Link } from "react-router-dom";
import "./BMW.css";
import { cars as allCars } from "./data/cars";

export default function BMW() {
  const bmwCars = allCars.filter((c) => c.brand === "bmw");

  const scrollToCollection = () => {
    const section = document.getElementById("bmw-collection");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bmw-page">
      <nav className="bmw-nav">
        <Link className="bmw-back-home" to="/">← BACK HOME</Link>
        <div className="bmw-nav-title">BMW MOTORS</div>
        <button className="bmw-login">LOGIN</button>
      </nav>

      <header className="bmw-hero">
        <div className="bmw-hero-overlay" />
        <div className="bmw-hero-content">
          <p className="bmw-small-title">THE ULTIMATE DRIVING MACHINE</p>
          <h1>BMW</h1>
          <p>Precision engineering, aggressive performance, and luxury crafted for drivers.</p>
          <button className="bmw-collection-btn" onClick={scrollToCollection}>
            VIEW COLLECTION
          </button>
        </div>
      </header>

      <section className="bmw-cars-section" id="bmw-collection">
        <div className="bmw-heading">
          <p>BMW EXCLUSIVE MODELS</p>
          <h2>Our Collection</h2>
          <span>Performance. Luxury. Innovation.</span>
        </div>

        <div className="bmw-car-grid">
          {bmwCars.map((car) => (
            <div className="bmw-car-card" key={car.slug}>
              <div className="bmw-car-image-container">
                <img src={car.img} alt={car.name} />
              </div>

              <div className="bmw-car-info">
                <h3>{car.name}</h3>
                <div className="bmw-rating">{car.rating}</div>
                <div className="bmw-starting">{car.starting}</div>
                <h4>{car.price}</h4>

                <Link className="bmw-car-explore" to={`/cars/bmw/${car.slug}`}>
                  EXPLORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bmw-footer">
        <h3>BMW MOTORS</h3>
        <p>© {new Date().getFullYear()} BMW Collection. All Rights Reserved.</p>
      </footer>
    </div>
  );
}