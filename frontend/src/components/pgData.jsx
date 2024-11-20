// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPGDataAction } from "../redux/actions/pgActions";
// import '../styles/pgData.css';
// const PgData = () => {
//   const dispatch = useDispatch();
//   const { pgData, loading, error } = useSelector((state) => state.pg);

//   useEffect(() => {
//     dispatch(fetchPGDataAction());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     pgData && (
//       <div className="pg-container">
//         <div className="card">
//           <h3>PG Name</h3>
//           <p>{pgData.name}</p>
//         </div>
//         <div className="card">
//           <h3>Total Students</h3>
//           <p>{pgData.totalStudents}</p>
//         </div>
//         <div className="card">
//           <h3>Available Rooms</h3>
//           <p>{pgData.availableRooms}</p>
//         </div>
//         <div className="card">
//           <h3>Available Beds</h3>
//           <p>{pgData.availableBeds}</p>
//         </div>
//       </div>
//     )
//   );
// };

// export default PgData;


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
