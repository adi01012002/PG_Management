

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPGDataAction } from '../redux/actions/pgActions';
import '../styles/pgData.css';
const PGStatus = () => {
  const dispatch = useDispatch();
  const { pgs, loading, error } = useSelector((state) => state.pg);

  useEffect(() => {
    dispatch(fetchPGDataAction());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>PG Status</h2>
      {pgs.length === 0 ? (
        <p className="no-pgs" >No PGs found</p>
      ) : (
        pgs.map((pg, index) => (
          <div key={index} className="pg-container">
            <h3>{pg.name}</h3>
            <p>Total Students: {pg.totalStudents}</p>
            <p>Available Rooms: {pg.availableRooms}</p>
            <p>Available Beds: {pg.availableBeds}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PGStatus;
