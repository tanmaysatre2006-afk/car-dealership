import React from "react";
import { Link } from "react-router-dom";
import "./Porsche.css";
import { cars as allCars } from "./data/cars";

export default function Porsche() {
  const porscheCars = allCars.filter((c) => c.brand === "porsche");

  const scrollToCollection = () => {
    const section = document.getElementById("porsche-collection");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="porsche-page">
      <nav className="porsche-nav">
        <Link className="porsche-back-home" to="/">← BACK HOME</Link>
        <div className="porsche-nav-title">PORSCHE MOTORS</div>
        <button className="porsche-login">LOGIN</button>
      </nav>

      <header className="porsche-hero">
        <div className="porsche-hero-overlay" />
        <div className="porsche-hero-content">
          <p className="porsche-small-title">BUILT FOR THE ROAD</p>
          <h1>PORSCHE</h1>
          <p>Iconic design, precision performance, and timeless engineering.</p>

          <button className="porsche-collection-btn" onClick={scrollToCollection}>
            VIEW COLLECTION
          </button>
        </div>
      </header>

      <section className="porsche-cars-section" id="porsche-collection">
        <div className="porsche-heading">
          <p>PORSCHE SIGNATURE MODELS</p>
          <h2>Our Collection</h2>
          <span>Performance. Heritage. Innovation.</span>
        </div>

        <div className="porsche-car-grid">
          {porscheCars.map((car) => (
            <div className="porsche-car-card" key={car.slug}>
              <div className="porsche-car-image-container">
                <img src={car.img} alt={car.name} />
              </div>

              <div className="porsche-car-info">
                <h3>{car.name}</h3>
                <div className="porsche-rating">{car.rating}</div>
                <div className="porsche-starting">{car.starting}</div>
                <h4>{car.price}</h4>

                <Link className="porsche-car-explore" to={`/cars/porsche/${car.slug}`}>
                  EXPLORE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="porsche-footer">
        <h3>PORSCHE MOTORS</h3>
        <p>© {new Date().getFullYear()} Porsche Collection. All Rights Reserved.</p>
      </footer>
    </div>
  );
}