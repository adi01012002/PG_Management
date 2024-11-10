// actions/paymentActions.js
import { addPaymentService } from '../../services/paymentService';


export const addPaymentAction = (studentId, paymentData) => async (dispatch) => {
    dispatch({ type: 'ADD_PAYMENT_REQUEST' });
    try {
        const payment = await addPaymentService(studentId, paymentData);
        console.log(payment)
        dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: payment });
    } catch (error) {
        dispatch({ type: 'ADD_PAYMENT_FAILURE', payload: error.message });
    }
};
