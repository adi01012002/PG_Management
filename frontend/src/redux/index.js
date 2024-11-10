// src/redux/store.js
import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import studentReducer from './reducers/studentReducer';

// Import your reducers
import authReducer from './reducers/authReducers.js';
import paymentReducer from './reducers/paymentReducer.js';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    students: studentReducer,
    payments:paymentReducer
});

// export default combineReducers({
//     posts,
//     auth,
//   });

export default rootReducer;
