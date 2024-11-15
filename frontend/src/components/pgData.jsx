import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPGDataAction } from "../redux/actions/pgActions";
import '../styles/pgData.css';
const PgData = () => {
  const dispatch = useDispatch();
  const { pgData, loading, error } = useSelector((state) => state.pg);

  useEffect(() => {
    dispatch(fetchPGDataAction());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    pgData && (
      <div className="pg-container">
        <div className="card">
          <h3>PG Name</h3>
          <p>{pgData.name}</p>
        </div>
        <div className="card">
          <h3>Total Students</h3>
          <p>{pgData.totalStudents}</p>
        </div>
        <div className="card">
          <h3>Available Rooms</h3>
          <p>{pgData.availableRooms}</p>
        </div>
        <div className="card">
          <h3>Available Beds</h3>
          <p>{pgData.availableBeds}</p>
        </div>
      </div>
    )
  );
};

export default PgData;
