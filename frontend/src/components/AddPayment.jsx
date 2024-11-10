import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addPaymentAction } from '../redux/actions/paymentActions';  // Define this action in your actions

const AddPayment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        date: '',
        type: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentAction(id, paymentDetails));
        navigate(`/student/${id}`);  // Redirect back to the student details page
    };

    return (
        <div>
            <h2>Add Payment for Student</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input type="number" name="amount" value={paymentDetails.amount} onChange={handleChange} required />
                </label>
                <label>
                    Date:
                    <input type="date" name="date" value={paymentDetails.date} onChange={handleChange} required />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={paymentDetails.type} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={paymentDetails.description} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Add Payment</button>
            </form>
        </div>
    );
};

export default AddPayment;
