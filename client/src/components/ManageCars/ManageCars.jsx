import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  const getAllCars = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/dashboard/manage-cars"
      );
      setCars(response.data);
    } catch (error) {
      console.log("error fetching car data", error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8001/dashboard/manage-cars/${id}`)
      .then(() => {
        console.log("car deleted successfully");
      })
      .catch((err) => {
        console.log("Error deleting car:", err);
      });
    window.location.reload();
  };

  return (
    <div className="main-container">
      <div className="main-title">
        <h3>CARS</h3>
      </div>
      <div className="add-car">
        <Link to="/dashboard/add-cardetails" className="btn btn-success">
          Add Car
        </Link>
      </div>
      <div className="px-5 py-3">
        <div className="d-flex justify-content-center mt-2">
          <table className="table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Image</th>
                <th>Availability</th>
                <th>Rent(per day)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index}>
                  <td>{car.model}</td>
                  <td>
                    <img
                      src={`http://localhost:8001/assets/${car.image_path}`}
                      alt=""
                      className="employee_image"
                    />
                  </td>
                  <td>{car.is_available}</td>
                  <td>{car.rent_per_day}</td>
                  <td>
                    <Link
                      to={`/dashboard/manage-cars/${car.id}`} // Use the correct URL pattern
                      className="btn btn-primary btn-sm me-2"
                    >
                      details
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
