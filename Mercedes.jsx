import React from "react";
import { Link } from "react-router-dom";
import { cars as allCars } from "./data/cars";
import "./Mercedes.css";

function Mercedes() {
  const cars = allCars.filter((c) => c.brand === "mercedes");

  return (
    <div className="mercedes-page">
      {/* Navigation */}
      <nav className="mercedes-nav">
        <Link to="/" className="back-home">
          ← GERMAN MOTORS
        </Link>

        <div className="mercedes-nav-title">MERCEDES-BENZ</div>

        <button className="mercedes-login">Login</button>
      </nav>

      {/* Hero */}
      <section className="mercedes-hero">
        <div className="mercedes-hero-overlay"></div>

        <div className="mercedes-hero-content">
          <p className="mercedes-small-title">WELCOME TO</p>

          <h1>MERCEDES-BENZ</h1>

          <p>Discover luxury, performance and timeless German engineering.</p>

          <button
            className="collection-btn"
            onClick={() =>
              document
                .getElementById("mercedes-cars")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Cars */}
      <section className="mercedes-cars-section" id="mercedes-cars">
        <div className="mercedes-heading">
          <p>THE COLLECTION</p>

          <h2>Choose Your Mercedes</h2>

          <span>
            Explore our selection of premium Mercedes-Benz automobiles.
          </span>
        </div>

        <div className="mercedes-car-grid">
          {cars.map((car) => (
            <div className="mercedes-car-card" key={car.slug}>
              <div className="car-image-container">
                <img src={car.img} alt={car.name} />
              </div>

              <div className="car-info">
                <h3>{car.name}</h3>

                <div className="rating">{car.rating}</div>

                <p className="starting">Starting from</p>

                <h4>{car.price}</h4>

                <Link className="car-explore" to={`/cars/mercedes/${car.slug}`}>
                  Explore Car →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mercedes-footer">
        <h3>GERMAN MOTORS</h3>
        <p>Experience German Engineering.</p>
        <p>© 2026 German Motors</p>
      </footer>
    </div>
  );
}

export default Mercedes;