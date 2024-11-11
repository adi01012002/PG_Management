// actions/paymentActions.js
import { addPaymentService } from '../../services/paymentService';

import { fetchPaymentHistory } from '../../services/paymentService';

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


// actions/paymentActions.js

export const fetchPaymentHistoryAction = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PAYMENT_HISTORY_REQUEST' });
  try {
    const payments = await fetchPaymentHistory();
    dispatch({ type: 'FETCH_PAYMENT_HISTORY_SUCCESS', payload: payments });
  } catch (error) {
    dispatch({ type: 'FETCH_PAYMENT_HISTORY_FAILURE', payload: error.message });
  }
};





