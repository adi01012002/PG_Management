// reducers/paymentReducer.js
const initialState = {
    payments: [],
    loading: false,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PAYMENT_REQUEST':
            return { ...state, loading: true };
        case 'ADD_PAYMENT_SUCCESS':
            return { ...state, loading: false, payments: [...state.payments, action.payload] };
            // const newState={ ...state, loading: false, payments: [...state.payments, action.payload] };
            // console.log(newState)
            // return newState
        case 'ADD_PAYMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
         // Handle fetching payment history
        case 'FETCH_PAYMENT_HISTORY_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PAYMENT_HISTORY_SUCCESS':
            return { ...state, loading: false, payments: action.payload };
        case 'FETCH_PAYMENT_HISTORY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default paymentReducer;











