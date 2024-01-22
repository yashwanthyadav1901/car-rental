import React from "react";
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { IoLogOut, IoGitPullRequestSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, text }) => {
  return (
    <li className="sidebar-list-item">
      <Link to={to} className="sidebar-links">
        <div className="sidebar-link">
          <Icon className="icon" />
          {text}
        </div>
      </Link>
    </li>
  );
};

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">ADMIN</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <SidebarLink
          to="/dashboard/admin"
          icon={MdOutlineDashboardCustomize}
          text="Dashboard"
        />
        <SidebarLink
          to="/dashboard/manage-locations"
          icon={IoLocationSharp}
          text="Locations"
        />

        <SidebarLink
          to="/dashboard/manage-users"
          icon={FaUsers}
          text="Manage Users"
        />
        <SidebarLink
          to="/dashboard/manage-cars"
          icon={ImBooks}
          text="Manage Cars"
        />
        <SidebarLink
          to="/dashboard/manage-bookings"
          icon={IoGitPullRequestSharp}
          text="Bookings"
        />

        <SidebarLink to="/login" icon={IoLogOut} text="Logout" />
      </ul>
    </aside>
  );
}

export default Sidebar;
