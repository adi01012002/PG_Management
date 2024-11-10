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
import  {fetchStudentByIdAction}  from '../redux/actions/studentActions';  // Define action to fetch a single student by ID
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
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
        console.log('Update Student:', student);
        // Add functionality here to update student
    };

    const handleDeleteClick = () => {
        console.log('Delete Student ID:', student._id);
        // Add functionality here to delete student
    };

    const handlePaymentClick = () => {
        console.log('View Payment History for Student ID:', student._id);
        // Add functionality here for payment history
    };
    // Inside StudentDetails component
const navigate = useNavigate();
const handleAddPaymentClick = () => {
    navigate(`/students/${student._id}/add-payment`);
};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log(student)
    if (!student) return <p>Student details are loading...</p>;

    return (
        <div>
            <h2>{student.name}</h2>
            <p>Address: {student.address}</p>
            <p>Year: {student.year}</p>
            <p>Age: {student.age}</p>
            <p>Phone Number: {student.phoneNumber}</p>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleAddPaymentClick}>Add Payment </button>
            <button onClick={handlePaymentClick}>View Payment History</button>
        </div>
    );
};

export default StudentDetails;
