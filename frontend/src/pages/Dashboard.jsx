


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions"; // Import your logout action
import "../styles/Dashboard.css";
import { FaUserPlus, FaListAlt, FaMoneyBill, FaHome, FaBuilding } from "react-icons/fa";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">PG Management</div>
        <div className="user-info">
          Welcome, {user?.username || "PG Owner"}!
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => handleNavigation("/add-student")}>
        <FaUserPlus /> Add Student
        </button>
        <button onClick={() => handleNavigation("/students")}>
          <FaListAlt /> All Students
        </button>
        <button onClick={() => handleNavigation("/auth/payment-history")}>
        <FaMoneyBill /> My Payments
        </button>
        <button onClick={() => handleNavigation("/auth/register-pg")}>
        <FaHome /> Register PG
        </button>
        <button onClick={() => handleNavigation("/auth/pg-status")}>
        <FaBuilding /> My PG Status
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Manage your PGs efficiently from here.</p>
        <p>Select an option from the sidebar to get started!</p>
      </div>
    </div>
  );
};

export default Dashboard;
