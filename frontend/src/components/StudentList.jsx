// src/components/StudentList.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStudentsAction } from '../redux/actions/studentActions';
// import Student from './Student';

// const StudentList = () => {
//     const dispatch = useDispatch();
//     const { students = [], loading, error } = useSelector((state) => state.students || {});
//     // console.log("Students in StudentList after FETCH_STUDENTS_SUCCESS:", students);
    
//     // const { students, loading, error } = useSelector((state) => state.student);
//     // const students = useSelector((state) => state.students);

//     useEffect(() => {
//         dispatch(fetchStudentsAction());
//     }, [dispatch]);

//     const handleDetailsClick = (students) => {
//         console.log('Student Details:', students);
//     };

//     const handleUpdateClick = (student) => {
//         console.log('Update Student:', student);
//     };

//     const handleDeleteClick = (id) => {
//         console.log('Delete Student ID:', id);
//     };
//     const handlePaymentClick = (id) => {
//         console.log('Payment of Student ID:', id);
//     };

//     // const validStudents = Array.isArray(students) ? students : [];
//     // console.log("Is students an array?", Array.isArray(students));
//     // console.log("validStudents:", validStudents);


//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//     // console.log(students)
//     // const students = Array.isArray(students) ? students : [students];
    

//     return (
//         <div>
//             <h2>Student List</h2>
//             {students.length === 0 ? (
//                 <p>No students found</p>
//             ) : (
//                 students.map((student) => (
//                     <Student
//                         key={student._id}
//                         student={student}
//                         onDetailsClick={handleDetailsClick}
//                         onUpdateClick={handleUpdateClick}
//                         onDeleteClick={handleDeleteClick}
//                         onPaymentClick={handlePaymentClick}
//                     />
//                 ))
//             )}
//         </div>
//     );
// };



// export default StudentList;




// src/components/StudentList.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStudentsAction } from '../redux/actions/studentActions';
// import Student from './Student';

// const StudentList = () => {
//     const dispatch = useDispatch();
//     const { students = [], loading, error } = useSelector((state) => state.students || {});
//     const [expandedStudentId, setExpandedStudentId] = useState(null);  // Track which student is expanded

//     useEffect(() => {
//         dispatch(fetchStudentsAction());
//     }, [dispatch]);

//     const handleDetailsClick = (student) => {
//         setExpandedStudentId(prevId => prevId === student._id ? null : student._id);
//     };

//     const handleUpdateClick = (student) => {
//         console.log('Update Student:', student);
//     };

//     const handleDeleteClick = (id) => {
//         console.log('Delete Student ID:', id);
//     };

//     const handlePaymentClick = (id) => {
//         console.log('Payment History for Student ID:', id);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>Student List</h2>
//             {students.length === 0 ? (
//                 <p>No students found</p>
//             ) : (
//                 students.map((student) => (
//                     <Student
//                         key={student._id}
//                         student={student}
//                         onDetailsClick={() => handleDetailsClick(student)}
//                         onUpdateClick={() => handleUpdateClick(student)}
//                         onDeleteClick={() => handleDeleteClick(student._id)}
//                         onPaymentClick={() => handlePaymentClick(student._id)}
//                         showDetails={expandedStudentId === student._id}
//                     />
//                 ))
//             )}
//         </div>
//     );
// };

// export default StudentList;


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
