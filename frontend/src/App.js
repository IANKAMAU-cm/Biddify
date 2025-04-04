import './App.css';
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import RegisterUser from "./components/RegisterUser";
import RegisterAdmin from "./components/RegisterAdmin";
import LoginUser from "./components/LoginUser";
import LoginAdmin from "./components/LoginAdmin";
import AddAuctionItem from "./components/AddAuctionItem"; // Import AddAuctionItem
import ManageAuctions from "./components/ManageAuctions"; // Import ManageAuctions
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const location = useLocation(); // Get the current route

  // Define routes where the Navbar should not be visible
  const hideNavbarRoutes = ["/register/user", "/login/user", "/admin/register", "/admin/login"];

  return (
    <ErrorBoundary>
      <AuthProvider>
        {/* Conditionally render Navbar */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/add-auction-item" element={<PrivateRoute><AddAuctionItem /></PrivateRoute>} /> {/* Add Auction Item */}
          <Route path="/admin/manage-auctions" element={<PrivateRoute><ManageAuctions /></PrivateRoute>} /> {/* Manage Auctions */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
