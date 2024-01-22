import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLocations = () => {
  const [locations, setLocations] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/dashboard/manage-location", { locations })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/manage-locations");
          console.log(typeof locations);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-container">
      <div className="d-flex justify-content-center align-items-center h-75 color">
        <div className="p-3 rounded w-25 border">
          <h2>Add Location</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="locations">
                <strong>Location:</strong>
              </label>
              <input
                type="text"
                name="Location"
                placeholder="Enter Location"
                onChange={(e) => setLocations(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add Location
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLocations;
