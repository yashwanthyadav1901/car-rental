// Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Header.css";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <div className="user-header">
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            CAR-RENTAL
          </Link>
        </div>

        <ul className={`nav-menu ${isToggleOpen ? "open" : ""}`}>
          <li>
            <Link to={"#"} className="nav-menu-list">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/cars"} className="nav-menu-list">
              Cars
            </Link>
          </li>

          <li>
            <Link to={"/About"} className="nav-menu-list">
              About us
            </Link>
          </li>
          <li>
            <Link to={"/Contact"} className="nav-menu-list">
              Contact
            </Link>
          </li>
        </ul>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </div>
    </>
  );
};
export default Header;
