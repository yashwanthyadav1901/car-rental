import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const AdminTable = () => {
  const [admins, setAdmins] = useState();

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

  const getAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8001/dashboard/admin");
      setAdmins(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8001/dashboard/admin/${id}`)
      .then(() => {
        console.log("admin deleted successfully"); // Assuming response.data contains success message
      })
      .catch((err) => {
        console.log("Error deleting admin:", err);
      });
    window.location.reload();
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
    getAdmins();
  }, []);

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
        justifyContent: "center",
        backgroundColor: "#1d2634",
      },
    },
    rowCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "0 8px",
        justifyContent: "center",
      },
    },
  };

  return (
    <DataTable
      theme="solarized"
      className="data-table"
      columns={column}
      data={admins}
      highlightOnHover
    />
  );
};

export default AdminTable;
