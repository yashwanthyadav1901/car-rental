import React from "react";
import Header from "../AdminDashboard/Header";
import BookingsTable from "./BookingsTable";

const ManageBookings = () => {
  return (
    <div className="main-container">
      <div className="main-title">
        <h3>BOOKINGS</h3>
      </div>
      <BookingsTable />
    </div>
  );
};

export default ManageBookings;
