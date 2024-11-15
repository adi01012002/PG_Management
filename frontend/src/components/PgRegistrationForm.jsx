import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerPGAction } from '../redux/actions/pgActions';
import '../styles/PgRgistration.css'; // Import the CSS file
import { useNavigate, useParams } from 'react-router-dom';
  
  
const PgRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        totalRooms: 0,
        totalBeds: 0,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.pg);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerPGAction(formData));
        navigate(`/auth/dashboard`);
    };

    return (
        <form className="form-container"  onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="PG Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input type="number" name="totalRooms" placeholder="Total Rooms" value={formData.totalRooms} onChange={handleChange} required />
            <input type="number" name="totalBeds" placeholder="Total Beds" value={formData.totalBeds} onChange={handleChange} required />
            <button type="submit" disabled={loading}>Register PG</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default PgRegistrationForm;
