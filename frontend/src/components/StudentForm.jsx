// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addStudentAction } from '../redux/actions/studentActions';

// const StudentForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         age: '',
//         address: '',
//         phoneNumber: '',
//         year: ''
//     });
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { loading, error } = useSelector((state) => state.students);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addStudentAction(formData));
//         navigate(`/auth/dashboard`);  // Redirect back to the dashboard page
//     };


//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     dispatch(addPaymentAction(id, paymentDetails));
//     //     navigate(`/student/${id}`);  // Redirect back to the student details page
//     // };
//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//             <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//             <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//             <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
//             <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
//             <button type="submit" disabled={loading}>Add Student</button>
//             {error && <p>{error}</p>}
//         </form>
//     );
// };

// export default StudentForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { addStudentAction } from '../redux/actions/studentActions';

// const StudentForm = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const student = location.state?.student || {}; // Load existing student data if present

//     const [formData, setFormData] = useState({
//         name: student.name || '',
//         age: student.age || '',
//         address: student.address || '',
//         phoneNumber: student.phoneNumber || '',
//         year: student.year || ''
//     });

//     const { loading, error } = useSelector((state) => state.students);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addStudentAction(formData)); // If updating, call updateStudentAction here instead
//         navigate(`/auth/dashboard`);  // Redirect back to the dashboard page
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//             <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//             <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//             <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
//             <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
//             <button type="submit" disabled={loading}>{student ? "Update Student" : "Add Student"}</button>
//             {error && <p>{error}</p>}
//         </form>
//     );
// };

// export default StudentForm;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudentAction, updateStudentAction, fetchStudentByIdAction } from '../redux/actions/studentActions';
import '../styles/StudentForm.css'; // Import the CSS file
const StudentForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { student, loading, error } = useSelector((state) => state.students);
    
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        phoneNumber: '',
        year: ''
    });

    // Fetch student details if editing
    useEffect(() => {
        if (id) {
            dispatch(fetchStudentByIdAction(id));
        }
    }, [dispatch, id]);

    // Populate form with existing data when in edit mode
    useEffect(() => {
        if (student && id) {
            setFormData({
                name: student.name,
                age: student.age,
                address: student.address,
                phoneNumber: student.phoneNumber,
                year: student.year
            });
        }
    }, [student, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            // Dispatch update action if editing
            dispatch(updateStudentAction(id, formData));
            navigate(`/student/${id}`);
        } else {
            // Dispatch add action if creating new student
            dispatch(addStudentAction(formData));
            navigate(`/auth/dashboard`);
            
        }
    };

    return (
        <form className="form-container"  onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input className="age" type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{id ? 'Update Student' : 'Add Student'}</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default StudentForm;
