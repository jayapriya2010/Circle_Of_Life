import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import FarmDashboard from './components/FarmDashboard';
const App = () => {
  const [users, setUsers] = useState([]);

  // Function to handle signup
  const handleSignup = (email, password) => {
    setUsers((prevUsers) => [...prevUsers, { email, password }]);
    console.log("Signup Successful!");
    console.log("Email:", email);
    console.log("Password:", password);
    alert("User signed up successfully!");
  };

  // Function to handle login
  const handleLogin = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      console.log("Login Successful!");
      console.log("Logged in user:", user);
      return true; // Return true if credentials are valid
    } else {
      console.error("Invalid credentials!");
      return false; // Return false if credentials are invalid
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<FarmDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
