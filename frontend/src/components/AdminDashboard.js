import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav>
        <Link to="/admin/add-auction-item">Add Auction Item</Link>
        <Link to="/admin/manage-auctions">Manage Auctions</Link>
      </nav>
      <div className="content">
        <h2>Welcome, Admin</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
// This code defines an admin dashboard component with navigation links for managing auction items.