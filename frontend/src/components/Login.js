import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  console.log("Form Data:", formData); // Debugging log

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Debugging log
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData); // Backend login endpoint
      console.log("Login response:", res.data); // Debugging log
      login(res.data); // Update AuthContext
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        alert(error.response.data.error); // Display backend error message
      }
      else {
        alert(error.message); // Display generic error message
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
// This code defines a simple login form using React.