

import React from "react";
import AuthForm from "../components/AuthForm";
import '../styles/LoginPage.css';

const RegisterPage = ({ onSubmit }) => {
  return (
    <div>
      {/* <h2>Register</h2> */}
      <AuthForm isLogin={false} onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
