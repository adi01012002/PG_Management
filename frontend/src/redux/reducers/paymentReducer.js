// reducers/paymentReducer.js
const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PAYMENT_REQUEST":
      return { ...state, loading: true };
    case "ADD_PAYMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        payments: [...state.payments, action.payload],
      };
    // const newState={ ...state, loading: false, payments: [...state.payments, action.payload] };
    // console.log(newState)
    // return newState
    case "ADD_PAYMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    // Handle fetching payment history
    case "FETCH_PAYMENT_HISTORY_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PAYMENT_HISTORY_SUCCESS":
      return { ...state, loading: false, payments: action.payload };
    case "FETCH_PAYMENT_HISTORY_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_STUDENT_PAYMENTS_REQUEST":
      return {
        ...state,
        loading: true, // Set loading to true when request starts
        error: null, // Clear any previous errors
      };
    case "FETCH_STUDENT_PAYMENTS_SUCCESS":
      return {
        ...state,
        loading: false, // Set loading to false once data is fetched
        payments: action.payload, // Store the fetched payments
      };
    case "FETCH_STUDENT_PAYMENTS_FAILURE":
      return {
        ...state,
        loading: false, // Set loading to false if an error occurs
        error: action.payload, // Store the error message
      };
    default:
      return state;
  }
};

export default paymentReducer;
