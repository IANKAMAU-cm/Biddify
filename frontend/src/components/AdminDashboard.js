import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/admin/add-auction-item">Add Auction Item</Link>
          </li>
          <li>
            <Link to="/admin/manage-auctions">Manage Auctions</Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <h2>Welcome, Admin</h2>
        <p>Use the navigation menu to manage auctions or add new auction items.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;