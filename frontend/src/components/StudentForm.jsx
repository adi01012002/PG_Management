import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStudentAction,
  updateStudentAction,
  fetchStudentByIdAction,
} from "../redux/actions/studentActions";
// import { fetchOwnerPGsAction } from "../redux/actions/pgActions"; // Import the action to fetch PGs
import { fetchPGDataAction } from '../redux/actions/pgActions';
import "../styles/StudentForm.css"; // Import the CSS file
const StudentForm = () => {
  const { id } = useParams(); // Fetch student ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, loading,error } = useSelector((state) => state.students);

  const { pgs } = useSelector((state) => state.pg || {});
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    address: "",
    phone: "",
    year: "",
    password: "", // Only required for adding a student
    pgId: "", // PG ID for the selected PG
  });
//  console.log(userId)
//  console.log(id)
//   Fetch PGs for the logged-in owner on component load
    // useEffect(() => {
    //   if (userId) {
    //     dispatch(fetchOwnerPGsAction(userId)); // Fetch PGs owned by the current user
    //   }
    // }, [dispatch, userId]);
    useEffect(() => {
        dispatch(fetchPGDataAction());
      }, [dispatch]);
// console.log(pgs)
  
  // Fetch student details if editing (update mode)
  useEffect(() => {
    if (id) {
      dispatch(fetchStudentByIdAction(id));
    }
  }, [dispatch, id]);

  // Populate form with existing student data in edit mode
  useEffect(() => {
    if (student && id) {
      setFormData({
        username: student.username || "",
        age: student.age || "",
        email: student.email || "",
        address: student.address || "",
        phone: student.phone || "",
        year: student.year || "",
        password: "", // Do not populate password when editing
        pgId: student.pgId || "", // Populate PG ID for edit mode
      });
    }
  }, [student, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Assign the value directly
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Dispatch update action for edit mode
      dispatch(updateStudentAction(id, formData));
    //   console.log(formData)
      navigate(`/student/${id}`);
    } else {
      // Dispatch add action for creating new student
      console.log(formData)
      dispatch(addStudentAction(formData));
      navigate(`/auth/dashboard`);
    }
  };


  return (
    <div className="student-form-container">
      <h2>{id ? "Update Student" : "Add Student"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {!id && ( // Show password field only in add mode
          <>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}
        <label>Year</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>PG</label>
        <select
  name="pgId"
  value={formData.pgId}
  onChange={handleChange}
  required
  disabled={loading}
>
  <option value="">Select PG</option>
  {Array.isArray(pgs) && pgs.length > 0 ? (
    pgs.map((pg) => (
      <option key={pg._id} value={pg._id}>
        {pg.name} {/* Use `pg.name` for display */}
      </option>
    ))
  ) : (
    <option disabled>Loading PGs...</option>
  )}
</select>

        <button type="submit" disabled={loading}>
          {loading
            ? id
              ? "Updating..."
              : "Adding..."
            : id
            ? "Update Student"
            : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
