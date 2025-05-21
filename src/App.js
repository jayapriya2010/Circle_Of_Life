import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import FarmDashboard from './components/FarmDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [users, setUsers] = useState([
    // Pre-populated users for testing
    { 
      email: "admin@aquagrow.com", 
      password: "admin123", 
      fullName: "Admin User", 
      role: "admin" 
    },
    { 
      email: "owner@aquagrow.com", 
      password: "owner123", 
      fullName: "John Owner", 
      role: "owner" 
    },
    { 
      email: "farmer@aquagrow.com", 
      password: "farmer123", 
      fullName: "Bob Smith", 
      role: "farmer", 
      farmId: "1" 
    }
  ]);
  
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle signup with role
  const handleSignup = (email, password, fullName, role, farmId = null) => {
    const newUser = { email, password, fullName, role, farmId };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log("Signup Successful!");
    console.log("New user:", newUser);
    return true;
  };

  // Function to handle login with role-based redirection
  const handleLogin = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      console.log("Login Successful!");
      console.log("Logged in user:", user);
      setCurrentUser(user);
      return { success: true, user };
    } else {
      console.error("Invalid credentials!");
      return { success: false };
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Protected routes with role-based access */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              user={currentUser} 
              allowedRoles={['farmer', 'owner']} 
              redirectPath="/login"
            >
              <FarmDashboard 
                user={currentUser} 
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute 
              user={currentUser} 
              allowedRoles={['admin']} 
              redirectPath="/login"
            >
              <AdminDashboard 
                users={users}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
