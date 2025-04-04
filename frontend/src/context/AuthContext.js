import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Save token to local storage
  };

  const logout = (role) => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token from local storage
    if (role === "admin") {
      navigate("/login/admin"); // Redirect to admin login page
    } else {
      navigate("/login/user"); // Redirect to user login page
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
