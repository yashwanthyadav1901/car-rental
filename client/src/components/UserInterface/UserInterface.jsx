import React from "react";
import "./UserInterface.css";
import BookCar from "./BookCar";

import Header from "./Header";

const UserInterface = ({ name }) => {
  return (
    <div>
      <Header />
      <div className="username">{name}</div>
      <div className="form">
        <BookCar />
      </div>
    </div>
  );
};

export default UserInterface;
