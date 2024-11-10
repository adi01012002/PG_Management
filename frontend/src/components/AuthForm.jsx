import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import '../styles/AuthForm.css';
import { useDispatch } from "react-redux";
// import AuthForm from "./AuthForm";
import { loginUser, registerUser } from "../redux/actions/authActions";

const AuthForm = ({ isLogin ,onSubmit}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useDispatch();
  const { loading, error} = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      dispatch(registerUser(formData));
      onSubmit({ username:formData.username,email: formData.email, password: formData.password });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Instead of dispatching directly, call the onSubmit prop with the relevant data
  //   if (isLogin) {
  //     // Call the onSubmit prop function for login
  //     onSubmit({ email: formData.email, password: formData.password });
  //   } else {
  //     // Dispatch the registerUser action for registration
  //     // dispatch(registerUser(formData));
  //     onSubmit({ username:formData.username,email: formData.email, password: formData.password });
  //   }
  // };

  // useEffect(() => {
  //   if (status === "success") {
  //     // Navigate to the dashboard upon successful login or registration
  //     console.log("useEffect triggered, status:", status); // Add this for debugging
  //     navigate("/dashboard");
  //   }
  // }, [status, navigate]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {isLogin ? "Login" : "Register"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AuthForm;
