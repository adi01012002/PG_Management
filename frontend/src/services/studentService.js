// import axios from 'axios';
// const BASE_URL = "http://localhost:8090";
// export const addStudent = async (studentData) => {
//     const token = localStorage.getItem('token');
//     const config = { headers: { Authorization: token } };

//     // console.log(token,config)
//     try {
//         const response = await axios.post(`${BASE_URL}/students/add`, studentData, config)
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : new Error('Network error');
//     }
// };

// const [openSnackbar, setOpenSnackbar] = useState(false);
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
const BASE_URL = "http://localhost:8090";
// const navigate = useNavigate();  // useNavigate hook
export const addStudent = async (studentData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const config = { headers: { Authorization: `Bearer ${token}` } };
  // const history = useHistory();  // useHistory hook
  // const navigate = useNavigate();  // useNavigate hook

  try {
    const response = await axios.post(
      `${BASE_URL}/students/add`,
      studentData,
      config
    );
    alert("Student successfully added!");
    // history.push('/auth/dashboard');
    // navigate('auth/dashboard'); // Use navigate instead of history.push
    // setOpenSnackbar(true); // Show success message
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};
// return (
//     <>
//         <Snackbar
//             open={openSnackbar}
//             autoHideDuration={6000}
//             onClose={() => setOpenSnackbar(false)}
//             message="Student successfully added!"
//         />
//     </>
// );



// export const fetchStudents = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) throw new Error('No token found');

//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const response = await axios.get(`${BASE_URL}/students/list`, config);
//     console.log('Fetched students from API:', response.data);
//     return response.data; // This should return only the students created by this user
// };


export const fetchStudents = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
      const response = await axios.get(`${BASE_URL}/students/list`, config);
      console.log(response)
      console.log(response.data)
      // console.log(response.data.students)
      // Log the full response to see its structure
      // console.log('Fetched students from API:', response);

      // Check if response.data exists and contains students
      if (response && response.data) {
          return response.data; // Assuming the API returns { students: [...] }
      } else {
          throw new Error("API response does not contain 'students'");
      }
  } catch (error) {
      console.error("Error fetching students:", error);
      throw error; // Propagate error to action
  }
};

// export const fetchStudentByIdService = async (id) => {
//   const response = await axios.get(`${BASE_URL}/students/${id}`);  // Adjust base URL as needed
//   return response.data;
// };



export const fetchStudentByIdService = async (id) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found'); // Handle case where token is missing

    // Set up request headers with authorization token
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // Make the API request to fetch the specific student by ID
    const response = await axios.get(`${BASE_URL}/students/${id}`, config);
    console.log(response)
    console.log('Fetched student from API:', response.data);
    
    return response.data; // Return the student's data
};
