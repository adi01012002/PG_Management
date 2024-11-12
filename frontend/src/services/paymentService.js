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


export const fetchPaymentHistory = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${BASE_URL}/payments/history`, config);

  console.log(response)
  console.log(response.data)
  return response.data;
};



export const fetchStudentPayments = async (studentId) => {
    console.log(studentId)
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${BASE_URL}/payments/${studentId}/history`, config);
    return response.data;
};

//http://localhost:8090/payments/student/6732112bb88a98334e73e770