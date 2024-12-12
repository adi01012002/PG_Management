

import axios from "axios";

const BASE_URL = "http://localhost:8090"; 


export const register = async (userData) => {
  try {
    console.log("Registering user with data:", userData);

    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    // Ensure success response is only logged when status is 2xx
    if (response.status >= 200 && response.status < 300) {
      console.log("Registration successful, response data:", response.data);
      return response.data;
    } else {
      console.error(
        "Unexpected response status:",
        response.status,
        response.data
      );
      throw new Error(response.data.message || "Unexpected server response");
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status code
      console.error("Error response from server:", error.response.data);
      console.error("Status code:", error.response.status);
      throw new Error(
        error.response.data.message || "Failed to register user"
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received from server:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened
      console.error("Error in setting up the request:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};


export const login = async (userData) => {
  try {
    console.log("Logging in user with data:", userData);
    const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Login successful, response data:", response.data);
    return response.data;
  } catch (error) {
    // Handle all types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response from server:", error.response.data);
      console.error("Status code:", error.response.status);
      throw new Error(
        error.response.data.message || "Failed to log in user"
      );
    } else if (error.request) {
      // Request was made, but no response was received
      console.error("No response received from server:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something else happened in setting up the request
      console.error("Error in setting up the request:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
