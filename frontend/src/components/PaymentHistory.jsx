// // components/PaymentHistory.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPaymentHistoryAction } from '../redux/actions/paymentActions';

// const PaymentHistory = () => {
//   const dispatch = useDispatch();
//   const { payments, loading, error } = useSelector((state) => state.payments);

//   useEffect(() => {
//     dispatch(fetchPaymentHistoryAction());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>My Payment History</h2>
//       {payments.length > 0 ? (
//         <ul>
//           {payments.map((payment) => (
//             <li key={payment._id}>
//               <p>Student Name: {payment.studentId.name}</p>
//               <p>Amount: {payment.amount}</p>
//               <p>Date: {payment.date}</p>
//               <p>Type: {payment.type}</p>
//               <p>Description: {payment.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No payments found.</p>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;



// 


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentHistoryAction } from "../redux/actions/paymentActions";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentHistory.css"; // Import the CSS file
// import '../styles/LoginPage.css';

const PaymentHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector((state) => state.payments);

    useEffect(() => {
        dispatch(fetchPaymentHistoryAction());
    }, [dispatch]);

    // Function to navigate to other pages
    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) return <p>Loading payment history...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="payment-history-container">
            <button
                className="dashboard-button"
                onClick={() => handleNavigation("/auth/dashboard")}
            >
                Go to Dashboard
            </button>
            <h2>Payment History</h2>
            {payments.length > 0 ? (
                payments.map((payment) => (
                    <div key={payment._id} className="payment-card">
                        <center><h3>Student Name: {payment.id?.name}</h3></center>
                        <p>Amount: {payment.amount} Rs</p>
                        <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
                        <p>Type: {payment.type}</p>
                        <p>Description: {payment.description}</p>
                    </div>
                ))
            ) : (
                <p>No payments found</p>
            )}
        </div>
    );
};

export default PaymentHistory;



// import React from "react";
// import { useSelector } from "react-redux";
// import "../styles/PaymentHistory.css"; // Add styling as needed

// const PaymentHistory = () => {
//     const { paymentHistory, loading, error } = useSelector((state) => state.payments);

//     if (loading) return <p>Loading payment history...</p>;
//     if (error) return <p>Error fetching payment history: {error}</p>;

//     return (
//         <div className="payment-history-container">
//             <h2>Payment History</h2>
//             {paymentHistory.length === 0 ? (
//                 <p>No payments found for this user.</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Student Name</th>
//                             <th>Amount</th>
//                             <th>Date</th>
//                             <th>Type</th>
//                             <th>Description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {paymentHistory.map((payment) => (
//                             <tr key={payment._id}>
//                                 <td>{payment.id.name}</td>
//                                 <td>{payment.amount}</td>
//                                 <td>{new Date(payment.date).toLocaleDateString()}</td>
//                                 <td>{payment.type}</td>
//                                 <td>{payment.description}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default PaymentHistory;
