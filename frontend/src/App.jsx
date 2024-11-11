import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HomePage from "./pages/HomePage";
import LoginPage from './components/LoginPage'; // Login form component
import RegisterPage from './components/RegisterPage'; // Register form component
import { login, register } from './services/authServices'; // Ensure correct import
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import AddPayment from "./components/AddPayment";
import PaymentHistory from "./components/PaymentHistory";

const App = () => {
  const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (userData) => {
        try {
            const data = await login(userData);
            console.log("Logged in successfully:", data);
            // Redirect to dashboard on successful login
            navigate("auth/dashboard");
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    const handleRegister = async (userData) => {
        try {
            const data = await register(userData);
            console.log("Registered successfully:", data);
            // Optionally redirect to login form or dashboard after registration
            navigate("/login"); // Redirect to login after registration
        } catch (error) {
            console.error("Registration failed:", error.message);
        }
    };

  return (
      
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage onSubmit={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onSubmit={handleRegister}/>} />
        <Route path="/add-student" element={<StudentForm/>} />
        <Route path="/students" element={<StudentList/>} />
        <Route path="/student/:id" element={<StudentDetails/>} />
        <Route path="/students/:id/add-payment" element={<AddPayment/>} />
        <Route path="/auth/payment-history" element={<PaymentHistory/>} />
        </Routes>
    
   
  );
};

export default App;