// // src/components/Student.jsx
// import React from 'react';
// import PropTypes from 'prop-types';

// const Student = ({ student, onDetailsClick, onUpdateClick, onDeleteClick ,onPaymentClick}) => {
//     const { name, address, age, year, phoneNumber, _id } = student;  // Destructuring
//     return (
//         <div className="student-card">
//             <h3>{name}</h3>
//             <p>Address: {address}</p>
//             <p>Year: {year}</p>
//             <p>Age: {age}</p>
//             <p>Phone Number: {phoneNumber}</p>
//             <button onClick={() => onDetailsClick(student)}>View Details</button>
//             <button onClick={() => onUpdateClick(student)}>Update</button>
//             <button onClick={() => onDeleteClick(_id)}>Delete</button>
//             <button onClick={() => onPaymentClick(_id)}>PaymentHistory</button>
//         </div>
//     );
// };

// // Prop validation
// Student.propTypes = {
//     student: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         address: PropTypes.string.isRequired,
//         age: PropTypes.number.isRequired,
//         year: PropTypes.number.isRequired,
//         phoneNumber: PropTypes.string.isRequired,
//     }).isRequired,
//     onDetailsClick: PropTypes.func.isRequired,
//     onUpdateClick: PropTypes.func.isRequired,
//     onDeleteClick: PropTypes.func.isRequired,
//     onPaymentClick: PropTypes.func.isRequired,
// };

// export default Student;



// src/components/StudentDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchStudentByIdAction,deleteStudentAction}  from '../redux/actions/studentActions';  // Define action to fetch a single student by ID
import { fetchStudentPaymentsAction } from '../redux/actions/paymentActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentDetails.css';


const StudentDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { student, loading, error } = useSelector((state) => state.students || {});
    // const { student, loading, error } = useSelector((state) => ({
    //     student: state.student || null,  // Fallback to null if undefined
    //     loading: state.student|| false,  // Fallback to false if undefined
    //     error: state.student || null        // Fallback to null if undefined
    // }));
    
    useEffect(() => {
        dispatch(fetchStudentByIdAction(id));
    }, [dispatch, id]);

    const handleUpdateClick = () => {
        // console.log('Update Student:', student);
        navigate(`/students/${student._id}/edit`, { state: { student } });
        // Add functionality here to update student
    };

    const handleDeleteClick = () => {
        // console.log('Delete Student ID:', student._id);

        // Add functionality here to delete student
        dispatch(deleteStudentAction(student._id));
        navigate('/students');
    };

    // const handlePaymentClick = () => {
    //     console.log('View Payment History for Student ID:', student._id);
    //     // Add functionality here for payment history
    // };
    const handlePaymentClick = () => {
        dispatch(fetchStudentPaymentsAction(student._id));
        navigate(`/students/${student._id}/payment-history`);
    };

    // Inside StudentDetails component
const handleAddPaymentClick = () => {
    navigate(`/students/${student._id}/add-payment`);
};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log(student)
    if (!student) return <p>Student details are loading...</p>;

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <>
        <div className="student-details-container">
        <button className="back-button" onClick={() => handleNavigation("/students")}>
            Go To Students
        </button>
        </div>
        <div className="student-card">
        <h2>{student.name}</h2>
        <p>Address: {student.address}</p>
        <p>Year: {student.year}</p>
        <p>Age: {student.age}</p>
        <p>Phone Number: {student.phoneNumber}</p>
        <div className="student-actions">
        <button onClick={handleUpdateClick} className="action-button">Update</button>
        <button onClick={handleDeleteClick} className="action-button delete-button">Delete</button>
        <button onClick={handleAddPaymentClick} className="action-button">Add Payment </button>
        <button onClick={handlePaymentClick} className="action-button">View Payment History</button>
        </div>
    </div></>
        
    );
};

export default StudentDetails;
