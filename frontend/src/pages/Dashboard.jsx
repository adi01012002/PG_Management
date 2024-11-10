// // src/pages/Dashboard.js
// import React from 'react';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

// const Dashboard = () => {
//     // const user = useSelector((state) => state.auth.user); // Get user info from Redux
//     // const navigate = useNavigate();

//     // Function to navigate to other pages
//     // const handleNavigation = (path) => {
//     //     navigate(path);
//     // };

//     return (
//         <div className="dashboard-container">
//             {/* <h1>Welcome to your Dashboard, {user?.name || "PG Owner"}!</h1> */}
//             <h1>Welcome to your Dashboard</h1>
//             <p>Manage your PG efficiently with the options below:</p>

//             {/* <div className="dashboard-actions">
//                 <button onClick={() => handleNavigation('/add-student')}>Add Student</button>
//                 <button onClick={() => handleNavigation('/students')}>Show All Students</button>
//                 <button onClick={() => handleNavigation('/payment-history')}>My Payment History</button>
//             </div> */}
//         </div>
//     );
// };

// export default Dashboard;

// src/components/Dashboard.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logoutUser } from "../redux/actions/authActions"; // Import your logout action

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout action from Redux
    dispatch(logoutUser());
    // Redirect to the home page or login page after logout
    navigate("/login");
  };
  const user = useSelector((state) => state.auth.username); // Get user info from Redux
    // const navigate = useNavigate();

    // Function to navigate to other pages
    const handleNavigation = (path) => {
        navigate(path);
    };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to the PG Management System!</p>
      <button onClick={handleLogout}>Logout</button>
      <h1 className="welcome-message">Welcome to your Dashboard, {user?.name || "PG Owner"}!</h1>
      {/* <div className="dashboard-actions"> */}
        <button onClick={() => handleNavigation("/add-student")}>
          Add Student
        </button>{" "}
        <button onClick={() => handleNavigation("/students")}>
          Show All Students
        </button>
        <button onClick={() => handleNavigation("/payment-history")}>
          My Payment History
        </button>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
