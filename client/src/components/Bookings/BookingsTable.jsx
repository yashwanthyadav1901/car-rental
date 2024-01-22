import React from "react";

const BookingsTable = () => {
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <table className="table">
          <thead>
            <tr>
              <th>booking ID</th>
              <th>Model</th>
              <th>pickup</th>
              <th>pickupdate</th>
              <th>duration</th>
              <th>total cost</th>
            </tr>
          </thead>
          <tbody>
            {/* {cars.map((car, index) => (
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
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
