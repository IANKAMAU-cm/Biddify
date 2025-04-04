import React, { useState } from "react";
import axios from "axios";
import "../styles/styles.css";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register/admin", formData);
      alert("Admin registration successful!");
    } catch (error) {
      console.error("Admin registration failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <h2 className="auth-title">Admin Registration</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;