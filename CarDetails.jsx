import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CarDetails.css";
import { cars } from "./data/cars";

export default function CarDetails() {
  const { brand, slug } = useParams();
  const car = cars.find((c) => c.brand === brand && c.slug === slug);

  if (!car) {
    return (
      <div className="car-details-page">
        <div className="car-details-nav">
          <Link className="car-details-back" to="/">← BACK HOME</Link>
          <div className="car-details-title">CAR DETAILS</div>
          <div style={{ width: 120 }} />
        </div>

        <div className="car-details-notfound">
          <h1>Car not found</h1>
          <p>Brand/slug match nahi kar raha.</p>
          <Link className="car-details-btn" to={`/${brand}`}>Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="car-details-nav">
        <Link className="car-details-back" to={`/${brand}`}>← BACK</Link>
        <div className="car-details-title">{car.name}</div>
        <Link className="car-details-back" to="/">HOME →</Link>
      </div>

      <div className="car-details-container">
        <div className="car-details-image">
          <img src={car.img} alt={car.name} />
        </div>

        <div className="car-details-info">
          <p className="car-details-starting">{car.starting}</p>
          <h2 className="car-details-price">{car.price}</h2>
          <div className="car-details-rating">{car.rating}</div>

          <div className="car-details-specs">
            <div><span>Engine:</span> {car.specs.engine}</div>
            <div><span>Power:</span> {car.specs.power}</div>
            <div><span>0–100:</span> {car.specs.zeroToHundred}</div>
            <div><span>Top Speed:</span> {car.specs.topSpeed}</div>
            <div><span>Drivetrain:</span> {car.specs.drivetrain}</div>
          </div>

          <Link className="car-details-btn" to={`/test-drive/${car.brand}/${car.slug}`}>
  BOOK TEST DRIVE
</Link>
        </div>
      </div>
    </div>
  );
}