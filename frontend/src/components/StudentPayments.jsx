import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentPayments } from "../redux/actions/studentActions"; // Fetch student payments action
// import "../styles/StudentPayments.css";

const StudentPayments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { payments, loading, error } = useSelector((state) => state.students);
console.log(user)
  useEffect(() => {
    if (user) {
      dispatch(fetchStudentPayments(user._id)); // Fetch payments when component mounts
    }
  }, [dispatch, user]);

  return (
    <div className="student-payments">
      <h1>My Payments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : payments?.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Date:</strong> {payment.date}</p>
              <p><strong>Status:</strong> {payment.type}</p>
              <p><strong>Description:</strong> {payment.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default StudentPayments;
