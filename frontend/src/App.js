//import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

          </Routes>
      </Router>
  );
}

export default App;
