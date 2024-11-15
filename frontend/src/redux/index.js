// src/redux/store.js
import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// Import your reducers
import studentReducer from './reducers/studentReducer';
import pgReducer  from './reducers/pgReducer';
import authReducer from './reducers/authReducers.js';
import paymentReducer from './reducers/paymentReducer.js';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    students: studentReducer,
    payments:paymentReducer,
    pg: pgReducer,
});

// export default combineReducers({
//     posts,
//     auth,
//   });

export default rootReducer;
