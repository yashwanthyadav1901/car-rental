import React from "react";
import { BsJustify } from "react-icons/bs";

function Header({ OpenSidebar, current }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div>
        <h2 className="secondary-heading">Admin dashboard</h2>
      </div>
    </header>
  );
}

export default Header;
