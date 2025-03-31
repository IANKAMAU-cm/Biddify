import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Biddify</h1>
      <p>Discover amazing auctions and start bidding!</p>
      <div className="auth-buttons">
        <Link to="/register" className="btn">Register</Link>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
