// import React from 'react';
// import AuthForm from '../components/AuthForm';

// const RegisterPage = () => {
//     return (
//         <div>
//             <h2>Register</h2>
//             <AuthForm isLogin={false} />
//         </div>
//     );
// };

// export default RegisterPage;
// src/components/RegisterPage.jsx

// import React, { useState } from 'react';

// const RegisterPage = ({ onSubmit }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit({ email, password });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Register</h2>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//             />
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default RegisterPage;
// src/components/RegisterPage.jsx

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
