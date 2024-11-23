import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/actions/studentActions"; // Fetch student profile action
// import "../styles/StudentProfile.css";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { profile, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (user) {
      dispatch(fetchStudentProfile(user._id)); // Fetch profile when component mounts
    }
  }, [dispatch, user]);

  return (
    <div className="student-profile">
      <h1>My Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p><strong>Pg-Name:</strong> {profile?.pgId?.name}</p>
          <p><strong>Pg-Owner:</strong> {profile?.createdBy?.username}</p>
          <p><strong>Name:</strong> {profile?.username}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Address:</strong> {profile?.address}</p>
          <p><strong>Contact No:</strong> {profile?.phone}</p>
          <p><strong>Age:</strong> {profile?.age}</p>
          <p><strong>Year:</strong> {profile?.year}</p>

          {/* Add more profile fields as needed */}
        </>
      )}
    </div>
  );
};

export default StudentProfile;
