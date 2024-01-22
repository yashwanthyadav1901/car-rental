// CarCard.js

import React from "react";

const CarCard = ({ model, manual, fuel, seats, imageUrl }) => {
  return (
    <div className="car-main">
      <div className="card-container">
        {/* Image side */}
        <div className="card-image">
          <img src={imageUrl} alt={`${model} Image`} />
        </div>

        {/* Details side */}
        <div className="card-details">
          <h2>{model}</h2>
          <p>{manual}</p>
          <p>{fuel}</p>
          <p>{seats} seater</p>
          <button className="card-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
