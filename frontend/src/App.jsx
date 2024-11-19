import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HomePage from "./pages/HomePage";
import LoginPage from "./components/LoginPage"; // Login form component
import RegisterPage from "./components/RegisterPage"; // Register form component
import { login, register } from "./services/authServices"; // Ensure correct import
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import AddPayment from "./components/AddPayment";
import PaymentHistory from "./components/PaymentHistory";
import StudentPayment from "./components/StudentPayment";
import PgRegistrationForm from "./components/PgRegistrationForm";
import PgData from "./components/pgData";
import StudentDashboard from "./components/StudentDashboard";

const App = () => {
  const navigate = useNavigate(); // Initialize useNavigate
//   const studentId = req.params.id;
  const handleLogin = async (userData) => {
    try {
      const data = await login(userData);
      console.log("Logged in successfully:", data);
      // Redirect to dashboard on successful login
      // navigate("auth/dashboard");

      // Check the role and navigate accordingly
      if (data.role === "student") {
        // navigate("student/dashboard"); // Redirect to student dashboard
        // Correct: Ensure the ID is a valid ObjectId
        // navigate(`/student/${studentId}`);
        navigate(`/student/${data._id}/dashboard`); // assuming studentId is returned in data
      } else if (data.role === "pgOwner") {
        navigate("auth/dashboard"); // Redirect to PG owner dashboard
      } else {
        console.error("Unknown role:", data.role);
        // Optionally, redirect to a default page or show an error
      }
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
      <Route path="auth/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage onSubmit={handleLogin} />} />
      <Route
        path="/register"
        element={<RegisterPage onSubmit={handleRegister} />}
      />
      <Route path="/add-student" element={<StudentForm />} />
      <Route path="/students/:id/edit" element={<StudentForm />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/student/:id" element={<StudentDetails />} />
      <Route path="/students/:id/add-payment" element={<AddPayment />} />
      <Route path="/auth/payment-history" element={<PaymentHistory />} />
      <Route
        path="/students/:id/payment-history"
        element={<StudentPayment />}
      />
      <Route path="/auth/register-pg" element={<PgRegistrationForm />} />
      <Route path="/auth/pg-status" element={<PgData />} />
      <Route path="/student/:id/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default App;
