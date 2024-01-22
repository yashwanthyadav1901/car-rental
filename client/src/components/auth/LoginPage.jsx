import React, { useState } from "react";
import "./auth.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoieWFzaHVAZ21haWwuY29tIiwicm9sZSI6MCwiaWF0IjoxNzA0NDUyMjc0LCJleHAiOjE3MDQ1Mzg2NzR9.iaEK3zIrWVauC3X4bX7lI66gg_AYYjB_7HArysjDOF8";
  // const decode = jwtDecode(token);
  // console.log(decode);
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:8001/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.loginStatus) {
          const { data: token } = response.data;

          authUser(token);
        } else {
          console.error("Login unsuccessful or token not received");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const authUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      console.log(typeof decoded.is_admin);
      if (decoded.is_admin === 1) {
        navigateTo("/dashboard/admin");
      } else if (decoded.is_admin === 0) {
        navigateTo("/user");
      }
    } catch (error) {
      console.log("Token decoding error:", error);
    }
  };

  return (
    <div className="main">
      <div className="auth-container">
        <div className="login-header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="login-inputs">
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
                type="text" // Change type to "password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="signup">
              Don't have an account? <Link to="/register">register</Link>{" "}
              {/* Use Link for navigation */}
            </div>

            <div className="submit-section">
              <button className="login-button" onClick={handleSubmit}>
                login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
