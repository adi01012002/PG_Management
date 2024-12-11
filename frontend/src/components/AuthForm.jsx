

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../redux/actions/authActions";
import '../styles/AuthForm.css';

const AuthForm = ({ isLogin ,onSubmit}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      console.log(formData)
      dispatch(registerUser(formData));
      onSubmit({ username:formData.username,email: formData.email, password: formData.password ,role:formData.role});
    }
  };

  return (
    <div className="form-container">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Name</label>
            <input type="text" name="username" value={formData.name} onChange={handleChange} required />
          </>
        )}

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        {!isLogin && (
          <>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="pgOwner">PG Owner</option>
            </select>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
