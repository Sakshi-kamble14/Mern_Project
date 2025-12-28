import React from "react";
import AdminNavbar from "../components/AdminNavbar";

function Admin() {
  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin panel.</p>
      </div>
    </>
  );
}

export default Admin;
