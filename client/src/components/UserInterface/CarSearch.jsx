import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarCard from "./CarCard";
import CarSearchDetailsHeader from "./CarSearchDetailsHeader";

const CarSearch = () => {
  const location = useLocation().state?.location;

  const DropOfLoc = useLocation().state?.dropOfLocation;
  const pickTime = useLocation().state?.pickTime;
  const dropTime = useLocation().state?.pickTime;

  console.log(DropOfLoc);

  const [cars, setCars] = useState([]);

  const GetCarsByLocation = () => {
    axios
      .post("http://localhost:8001/user/cars/by-location", {
        location: location,
      })
      .then((response) => {
        setCars(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  useEffect(() => {
    GetCarsByLocation();
  }, []);

  return (
    <div className="car-search-header ">
      <h2 className="car-header-text">Book Cars Now</h2>
      <div>
        <CarSearchDetailsHeader
          pickUpLocation={location}
          DropOfLocation={DropOfLoc}
          pickTime={pickTime}
          dropTime={dropTime}
        />
      </div>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          model={car.model}
          manual={car.manual}
          fuel={car.fuel}
          seats={car.seat}
          imageUrl={`http://localhost:8001/assets/${car.image_path}`} // Adjust image URL based on the model
        />
      ))}
    </div>
  );
};

export default CarSearch;
