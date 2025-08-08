import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    // Get current user from localStorage (if exists)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // Register new user
  const register = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (existingUsers.some((user) => user.email === email)) {
      toast.error("Email Already Exist");
      return false; // User already registered
    }

    const newUser = {
      id: crypto.randomUUID(), // Generate unique ID
      name,
      email,
      password,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    return true;
  };

  // Login existing user
  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("user", JSON.stringify(validUser));
      setUser(validUser);
      return true;
    }

    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const value = { user, setUser, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
