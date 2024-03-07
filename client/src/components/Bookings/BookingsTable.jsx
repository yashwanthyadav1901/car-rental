import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);

  const getAllBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/dashboard/manage-bookings"
      );
      setBookings(response.data);
    } catch (error) {
      console.log("error fetching booking data", error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

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
              <th>dropoff</th>
              <th>dropoff location</th>
              <th>total cost</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.booking_id}</td>
                <td>model</td>
                <td>{booking.pickup_location}</td>
                <td>{booking.pickup_date}</td>
                <td>{booking.dropoff_location}</td>
                <td>{booking.dropoff_date}</td>
                <td>{booking.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
