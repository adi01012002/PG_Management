// services/paymentService.js
import axios from "axios";
const BASE_URL = "http://localhost:8090";

export const addPaymentService = async (studentId, paymentData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  console.log(studentId, paymentData);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.post(
      `${BASE_URL}/payments/${studentId}/add`,
      paymentData,
      config
    );
    alert("Payment successfully added!");
    console.log(response.data)
    return response.data; //payments
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};
