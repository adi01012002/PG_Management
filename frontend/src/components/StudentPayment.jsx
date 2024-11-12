import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentPaymentsAction } from "../redux/actions/paymentActions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const StudentPayment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { payments, loading, error } = useSelector((state) => state.payments);
  // const { student } = useSelector((state) => state.students || {});
  useEffect(() => {
    dispatch(fetchStudentPaymentsAction(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div>
      <button onClick={() => handleNavigation("/auth/dashboard")}>
        Go To Dashboard
      </button>
      <h2>Payment History for Student</h2>
      {/* <p>Name: {payments.id.name}</p> */}
      {payments && payments.length > 0 ? (
        payments.map((payment) => (
          <div key={payment._id} className="payment-card">
            <p>Amount: {payment.amount}</p>
            <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
            <p>Type: {payment.type}</p>
            <p>Description: {payment.description}</p>
          </div>
        ))
      ) : (
        <p>No payments found for this student.</p>
      )}
    </div>
  );
};

export default StudentPayment;
