import React, { useState } from "react";

const CarSearchDetailsHeader = (props) => {
  const [values, setValues] = useState({
    "pick-up-location": props.pickUpLocation,
    "drop-of-location": props.DropOfLocation,
    "pick-up-time": props.pickTime,
    "drop-of-time": props.dropTime,
  });

  return (
    <div className="header-container">
      {Object.entries(values).map(([heading, value]) => (
        <div key={heading} className="header-item">
          <h2 className="search-heading">{heading}</h2>
          <p className="search-value">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CarSearchDetailsHeader;
