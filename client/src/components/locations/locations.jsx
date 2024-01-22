import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/dashboard/manage-location")
      .then((result) => {
        console.log(result);
        if (result.data.Status) {
          setLocations(result.data.Result);
        } else {
          console.log("error deleting location");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (locationId) => {
    axios
      .delete(`http://localhost:8001/dashboard/manage-location/${locationId}`)
      .then((result) => {
        if (result.data.Status) {
          setLocations(
            locations.filter((location) => location.id !== locationId)
          );
        } else {
          console.log(result.data.error);
        }
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-container">
      <div className="main-title">
        <h3>Locations</h3>
      </div>
      <div className="px-5 mt-3">
        <Link to="/dashboard/add-location" className="btn btn-success">
          Add Location
        </Link>
        <div className="mt-3">
          <table className="table color">
            <thead className="color">
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(location.id)}
                    >
                      Delete
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

export default Locations;
