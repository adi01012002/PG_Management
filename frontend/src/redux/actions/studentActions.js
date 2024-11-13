import { addStudent ,fetchStudents,deleteStudent,updateStudent} from '../../services/studentService';
// import { useNavigate } from 'react-router-dom';
export const addStudentAction = (studentData) => async (dispatch) => {
    dispatch({ type: 'ADD_STUDENT_REQUEST' });
    
    try {
        // const navigate = useNavigate();  // useNavigate hook
        const data = await addStudent(studentData);
        dispatch({ type: 'ADD_STUDENT_SUCCESS', payload: data.student });
    } catch (error) {
        dispatch({ type: 'ADD_STUDENT_FAILURE', payload: error.message });
    }
};


// export const fetchStudentsAction = () => async (dispatch) => {
//     dispatch({ type: 'FETCH_STUDENTS_REQUEST'});
//     try {
//       const data = await fetchStudents();
//       dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: data });
//     } catch (error) {
//       dispatch({ type: 'FETCH_STUDENTS_FAIL', payload: error.message });
//     }
//   };

  // redux/actions/studentActions.js
export const fetchStudentsAction = () => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST'});
    try {
        const response = await fetchStudents(); // Call the service function
        console.log(response)
        console.log(response.data)

        // dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: data.data });
        dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: response });

    } catch (error) {
        dispatch({ type: 'FETCH_STUDENTS_FAIL', payload: error.message });
    }
};

import { fetchStudentByIdService } from '../../services/studentService';

// Action to fetch a student by ID
export const fetchStudentByIdAction = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENT_BY_ID_REQUEST' });

    try {
        const student = await fetchStudentByIdService(id);
        console.log(student)
        dispatch({ type: 'FETCH_STUDENT_BY_ID_SUCCESS', payload: student });
    } catch (error) {
        dispatch({ type: 'FETCH_STUDENT_BY_ID_FAILURE', payload: error.message });
    }
};

// redux/actions/studentActions.js


export const deleteStudentAction = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_STUDENT_REQUEST' });
  try {
    // const token = localStorage.getItem('token');
    // const config = { headers: { Authorization: `Bearer ${token}` } };
    // await axios.delete(`http://localhost:8090/students/${studentId}`, config);
    await deleteStudent(id);
    
    dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_STUDENT_FAILURE', payload: error.message });
  }
};


// Action to update an existing student
export const updateStudentAction = (id, updatedData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_STUDENT_REQUEST" });
        const data = await updateStudent(id, updatedData);
        dispatch({ type: "UPDATE_STUDENT_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "UPDATE_STUDENT_FAILURE",
            payload: error.response?.data?.message || error.message,
        });
    }
};