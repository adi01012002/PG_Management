import axios from "axios";

const BASE_URL = "http://localhost:8090"; // Replace with your actual base URL
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8090';

export const register = async (userData) => {
  // console.log("Sending userData:", userData); // Check the data here
  const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  // console.log("Response data:", response.data);
  return response.data;
};

// export const login = async (userData) => {
//     console.log("Sending userData:", userData);
//     const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
//         headers: { "Content-Type": "application/json" }
//     });
//     console.log("Response data:", response.data);
//     return response.data;
// };

export const login = async (userData) => {
  try {
    console.log("Sending userData:", userData);
    const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
