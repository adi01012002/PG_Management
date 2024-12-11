
// src/components/StudentList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsAction } from '../redux/actions/studentActions';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudentList = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { students = [], loading, error } = useSelector((state) => state.students || {});
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        dispatch(fetchStudentsAction());
    }, [dispatch]);

    const handleViewMoreClick = (id) => {
        // history.push(`/student/${id}`);
navigate(`/student/${id}`);
    };
    // Function to navigate to other pages
const handleNavigation = (path) => {
    navigate(path);
};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        <button onClick={() => handleNavigation("/auth/dashboard")}>
            Go To Dashboard
        </button>
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No students found</p>
            ) : (
                students.map((student) => (
                    <div key={student._id} className="student-card">
                        <p><strong>{student.username}</strong></p>
                        <p><strong>Pg-Name:</strong> {student?.pgId?.name}</p>
                        <button onClick={() => handleViewMoreClick(student._id)}>View More Details</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default StudentList;
