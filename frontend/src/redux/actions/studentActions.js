// import { addStudent ,fetchStudents,deleteStudent,updateStudent,fetchStudentByIdService} from '../../services/studentService';
// // import { useNavigate } from 'react-router-dom';
// export const addStudentAction = (studentData) => async (dispatch) => {
//     dispatch({ type: 'ADD_STUDENT_REQUEST' });
    
//     try {
//         // const navigate = useNavigate();  // useNavigate hook
//         const data = await addStudent(studentData);
//         dispatch({ type: 'ADD_STUDENT_SUCCESS', payload: data.student });
//     } catch (error) {
//         dispatch({ type: 'ADD_STUDENT_FAILURE', payload: error.message });
//     }
// };




//   // redux/actions/studentActions.js
// export const fetchStudentsAction = () => async (dispatch) => {
//     dispatch({ type: 'FETCH_STUDENTS_REQUEST'});
//     try {
//         const response = await fetchStudents(); // Call the service function
//         console.log(response)
//         console.log(response.data)

//         // dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: data.data });
//         dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: response });

//     } catch (error) {
//         dispatch({ type: 'FETCH_STUDENTS_FAIL', payload: error.message });
//     }
// };


// // Action to fetch a student by ID
// export const fetchStudentByIdAction = (id) => async (dispatch) => {
//     dispatch({ type: 'FETCH_STUDENT_BY_ID_REQUEST' });

//     try {
//         const student = await fetchStudentByIdService(id);
//         console.log(student)
//         dispatch({ type: 'FETCH_STUDENT_BY_ID_SUCCESS', payload: student });
//     } catch (error) {
//         dispatch({ type: 'FETCH_STUDENT_BY_ID_FAILURE', payload: error.message });
//     }
// };

// // redux/actions/studentActions.js


// export const deleteStudentAction = (id) => async (dispatch) => {
//   dispatch({ type: 'DELETE_STUDENT_REQUEST' });
//   try {
//     // const token = localStorage.getItem('token');
//     // const config = { headers: { Authorization: `Bearer ${token}` } };
//     // await axios.delete(`http://localhost:8090/students/${studentId}`, config);
//     await deleteStudent(id);
    
//     dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
//   } catch (error) {
//     dispatch({ type: 'DELETE_STUDENT_FAILURE', payload: error.message });
//   }
// };


// // Action to update an existing student
// export const updateStudentAction = (id, updatedData) => async (dispatch) => {
//     try {
//         dispatch({ type: "UPDATE_STUDENT_REQUEST" });
//         const data = await updateStudent(id, updatedData);
//         dispatch({ type: "UPDATE_STUDENT_SUCCESS", payload: data });
//     } catch (error) {
//         dispatch({
//             type: "UPDATE_STUDENT_FAILURE",
//             payload: error.response?.data?.message || error.message,
//         });
//     }
// };


// src/redux/actions/studentActions.js
import {
    addStudent,
    fetchStudents,
    fetchStudentByIdService,
    deleteStudent,
    updateStudent,
} from '../../services/studentService';

// Action to add a student
export const addStudentAction = (studentData) => async (dispatch) => {
    dispatch({ type: 'ADD_STUDENT_REQUEST' });

    try {
        const { student } = await addStudent(studentData); // Assuming the service returns { student }
        dispatch({ type: 'ADD_STUDENT_SUCCESS', payload: student });
    } catch (error) {
        console.error("Error adding student:", error);
        dispatch({
            type: 'ADD_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to fetch all students
export const fetchStudentsAction = () => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST' });

    try {
        const students = await fetchStudents(); // Assuming the service returns a list of students
        dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: students });
    } catch (error) {
        console.error("Error fetching students:", error);
        dispatch({
            type: 'FETCH_STUDENTS_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to fetch a student by ID
export const fetchStudentByIdAction = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENT_BY_ID_REQUEST' });

    try {
        const student = await fetchStudentByIdService(id);
        dispatch({ type: 'FETCH_STUDENT_BY_ID_SUCCESS', payload: student });
    } catch (error) {
        console.error(`Error fetching student with ID ${id}:`, error);
        dispatch({
            type: 'FETCH_STUDENT_BY_ID_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to delete a student
export const deleteStudentAction = (id) => async (dispatch) => {
    dispatch({ type: 'DELETE_STUDENT_REQUEST' });

    try {
        await deleteStudent(id); // Assuming the service handles the API call
        dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
    } catch (error) {
        console.error(`Error deleting student with ID ${id}:`, error);
        dispatch({
            type: 'DELETE_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to update a student
export const updateStudentAction = (id, updatedData) => async (dispatch) => {
    dispatch({ type: 'UPDATE_STUDENT_REQUEST' });

    try {
        const updatedStudent = await updateStudent(id, updatedData); // Assuming the service returns updated student
        dispatch({ type: 'UPDATE_STUDENT_SUCCESS', payload: updatedStudent });
    } catch (error) {
        console.error(`Error updating student with ID ${id}:`, error);
        dispatch({
            type: 'UPDATE_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};
