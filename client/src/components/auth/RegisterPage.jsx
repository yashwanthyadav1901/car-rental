import React, { useState } from "react";
import "./auth.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8001/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        console.log("user has been created");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(name, email, password);
  };
  return (
    <div className="main">
      <div className="auth-container">
        <div className="login-header">
          <div className="text">SignUp</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="login-inputs">
            <div className="login-input">
              <IoIosPerson className="login-icon" />
              <input
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="login-input">
              <MdEmail className="login-icon" />
              <input
                type="text"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="login-input">
              <FaLock className="login-icon" />
              <input
                type="text"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="signup">
              Already have an account? <a href="/">login</a>
            </div>

            <div className="submit-section">
              <button className="login-button" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
