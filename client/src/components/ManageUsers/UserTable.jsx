import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8001/dashboard/manage-users/users/${id}`)
      .then(() => {
        console.log("user deleted successfully");
        // After successful deletion, update the user state without reloading the entire page
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
    window.location.reload();
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#FFFFFF",
        secondary: "#2aa198",
      },
      background: {
        default: "#031630",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#fff",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/dashboard/manage-users/users"
      );
      setUsers(response.data);
      console.log(users);
      setFilteredUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <button
          className="button"
          onClick={() => {
            deleteUser(row.id);
          }}
        >
          DELETE
        </button>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const result = users.filter((user) => {
      return user.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search]);
  return (
    <DataTable
      theme="solarized"
      columns={column}
      data={filteredUsers}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="480px"
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="search"
          className="user-search"
          value={search || ""} // Initialize with an empty string if search is undefined
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default UserTable;
