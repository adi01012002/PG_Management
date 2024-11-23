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
    // console.log(student)
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
        <h2>{student.username}</h2>
        <p><strong>Pg-Name:</strong> {student?.pgId?.name}</p>
        {/* <p><strong>Pg-Owner:</strong> {student?.createdBy?.username}</p> */}
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone Number:</strong>{student.phone}</p>
        <p> <strong>Address:</strong>{student.address}</p>
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
