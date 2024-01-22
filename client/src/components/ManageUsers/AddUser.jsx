import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("user has been created", response.data);
        navigateTo("/dashboard/manage-users");
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Add User</h2>
        <form className="row g-3 w-50">
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit-section">
            <button className="login-button" onClick={handleSubmit}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
