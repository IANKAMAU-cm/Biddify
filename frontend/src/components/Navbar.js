import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/styles.css"; // Import the CSS file

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (user) {
      logout(user.role); // Pass the user's role to the logout function
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Biddify</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Featured</Link>
            <Link to="/dashboard/electronics">Electronics</Link>
            <Link to="/dashboard/vehicles">Vehicles</Link>
            <Link to="/dashboard/machinery">Machinery</Link>
            <Link to="/dashboard/real estate">Real Estate</Link>
            <Link to="/dashboard/furniture">Furniture</Link>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login/user" className="btn btn-primary">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;