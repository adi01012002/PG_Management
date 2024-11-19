// // src/components/HomePage.js

// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/HomePage.css';

// const HomePage = () => {
//     return (
//         <div className="home-container">
//             <h1>Welcome to PG Management System</h1>
//             <div>
//                 <Link to="/login">
//                     <button>Login</button>
//                 </Link>
//                 <Link to="/register">
//                     <button>Register</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default HomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">PG Management</div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/features">Features</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <div className="auth-buttons">
                    <Link to="/login">
                        <button className="nav-button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="nav-button">Register</button>
                    </Link>
                </div>
            </nav>

            {/* Body Section */}
            <div className="body-section">
                <h1>Welcome to PG Management System</h1>
                <p>Your one-stop solution to manage PG accommodations effortlessly!</p>
                <div className="card-container">
                    <div className="card">
                        <h3>Centralized Data</h3>
                        <p>Keep all PG and tenant information in one place for easy access and management.</p>
                    </div>
                    <div className="card">
                        <h3>Payment Tracking</h3>
                        <p>Monitor payment history and dues for each tenant with ease.</p>
                    </div>
                    <div className="card">
                        <h3>Room Availability</h3>
                        <p>Track the number of available rooms and beds in your PG.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 PG Management System. All rights reserved.</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
