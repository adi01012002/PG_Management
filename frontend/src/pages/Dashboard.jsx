// // src/components/Dashboard.jsx

// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { logoutUser } from "../redux/actions/authActions"; // Import your logout action
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Call the logout action from Redux
//     dispatch(logoutUser());
//     // Redirect to the home page or login page after logout
//     navigate("/");
//   };
//   const user = useSelector((state) => state.auth.user); // Get user info from Redux
//   // const { student, loading, error } = useSelector((state) => state.students || {});
//   // const { loading, error} = useSelector((state) => state.auth);
//     // const navigate = useNavigate();

//     // Function to navigate to other pages
//     const handleNavigation = (path) => {
//         navigate(path);
//     };

//   return (
//     <div className="dashboard-container">
//       <h1>Dashboard</h1>
//       <p>PG Management System!</p>
//       <button onClick={handleLogout}>Logout</button>
//       <h1 className="welcome-message">Welcome to your Dashboard, {user?.username || "PG Owner"}!</h1>
//       <div className="dashboard-actions">
//         <button onClick={() => handleNavigation("/add-student")}>
//           Add Student
//         </button>{" "}
//         <button onClick={() => handleNavigation("/students")}>
//           Show All Students
//         </button>
//         <button onClick={() => handleNavigation("/auth/payment-history")}>
//           My Payments
//         </button>
//         <button onClick={() => handleNavigation("/auth/register-pg")}>
//           Register My Pg
//         </button>
//         <button onClick={() => handleNavigation("/auth/pg-status")}>
//           My Pg Status
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



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
