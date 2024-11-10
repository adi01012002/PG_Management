import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudentAction } from '../redux/actions/studentActions';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        phoneNumber: '',
        year: ''
    });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.students);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStudentAction(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
            <button type="submit" disabled={loading}>Add Student</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default StudentForm;
