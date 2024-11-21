import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions"; // Import your logout action
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user); // Fetch logged-in user info

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // Redirect to login
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to desired path
  };

  

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">PG Management</div>
        <div className="user-info">
          Welcome, {user?.username || "Student"}!
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => handleNavigation(`/student/${user?._id}/profile`)}>
          My Profile
        </button>
        <button onClick={() => handleNavigation(`/student/${user?._id}/payments`)}>
          My Payments
        </button>
        <button onClick={() => handleNavigation(`/student/${user?._id}/complaints`)}>
          My Complaints
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Student Dashboard</h1>
        <p>Welcome to your student dashboard, where you can manage your profile, view payments, and handle complaints.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
