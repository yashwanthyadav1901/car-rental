import React from "react";
import UserTable from "./UserTable";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  return (
    <div className="main-container">
      <div className="main-title">
        <h3>USERS</h3>
      </div>
      <div className="add-admin">
        {" "}
        <Link to="/dashboard/manage-users/add-user" className="btn btn-success">
          Add users
        </Link>
      </div>
      <div className="user-table">
        <UserTable />
      </div>
    </div>
  );
};

export default ManageUsers;
