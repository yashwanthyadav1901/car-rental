import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { MdCarRental } from "react-icons/md";
import { Link } from "react-router-dom";

import AdminTable from "./AdminTable";

const Card = ({ title, icon, count }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <h3>{title}</h3>
        <div className="icon">{icon}</div>
      </div>
      <h1>{count}</h1>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="main-container">
      {" "}
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <Card title="USERS" icon={<FaUsers />} count={26} />
        <Card title="CARS" icon={<IoCarSportSharp />} count={20} />
        <Card title="BOOKINGS" icon={<MdCarRental />} count={0} />
      </div>
      <div className="main-title">
        <h3>ADMINS</h3>
      </div>
      <div className="add-admin">
        {" "}
        <Link to="/dashboard/admin/add-admin" className="btn btn-success">
          Add admin
        </Link>
      </div>
      <div className="admin-table">
        <AdminTable />
      </div>
    </div>
  );
};

export default Admin;
