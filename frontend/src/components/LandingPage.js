import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Biddify</h1>
      <p className="landing-description">Discover amazing auctions and start bidding!</p>
      <div className="auth-buttons">
        <div className="user-buttons">
          <Link to="/register/user" className="btn btn-primary">Register</Link>
          <Link to="/login/user" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
