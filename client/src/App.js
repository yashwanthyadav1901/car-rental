import "./App.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/AdminDashboard/Dashboard";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import ManageCars from "./components/ManageCars/ManageCars";
import ManageBookings from "./components/Bookings/ManageBookings";
import Admin from "./components/AdminDashboard/admin";
import Locations from "./components/locations/locations";
import AddLocations from "./components/locations/AddLocations";
import AddCarDetails from "./components/ManageCars/AddCars";
import UserInterface from "./components/UserInterface/UserInterface.jsx";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import AddAdmin from "./components/AdminDashboard/Add-admin.jsx";
import AddUser from "./components/ManageUsers/AddUser.jsx";
import CarSearch from "./components/UserInterface/CarSearch.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8001/verify-token", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          setName(response.data.name);

          if (response.data.is_admin == 1) {
            console.log(response.data.is_admin === 1);
            setAdmin(true);
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.error("Error verifying token:", err);
        navigate("/");
      });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />{" "}
        {loggedIn ? (
          <>
            <Route path="/user" element={<UserInterface name={name} />} />
            <Route path="/user/car-search" element={<CarSearch />} />
            {admin ? (
              <>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard/admin" element={<Admin />} />
                  <Route
                    path="/dashboard/admin/add-admin"
                    element={<AddAdmin />}
                  />
                  <Route
                    path="/dashboard/manage-users"
                    element={<ManageUsers />}
                  />
                  <Route
                    path="/dashboard/manage-users/add-user"
                    element={<AddUser />}
                  />
                  <Route
                    path="/dashboard/manage-cars"
                    element={<ManageCars />}
                  />
                  <Route
                    path="/dashboard/manage-bookings"
                    element={<ManageBookings />}
                  />
                  <Route
                    path="/dashboard/manage-locations"
                    element={<Locations />}
                  />
                  <Route
                    path="/dashboard/add-location"
                    element={<AddLocations />}
                  />
                  <Route
                    path="/dashboard/add-cardetails"
                    element={<AddCarDetails />}
                  />
                </Route>
              </>
            ) : null}
          </>
        ) : null}
      </Routes>
    </>
  );
}

export default App;
