import { register, login } from '../../services/authServices.js';

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' });

    try {
        const data = await register(userData);
        console.log("Register Success:", data);
        dispatch({ type: 'REGISTER_SUCCESS', payload: data });
        console.log(data.token);
        console.log("data");
        localStorage.setItem('token', data.token);

    } catch (error) {
        dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
    }
};

// export const loginUser = (userData) => async (dispatch) => {
//     dispatch({ type: 'LOGIN_REQUEST' });

//     try {
//         const data = await login(userData);
//         console.log("Register Success:", data);
//         dispatch({ type: 'LOGIN_SUCCESS', payload: data });
//         localStorage.setItem('token', data.token);
//         console.log("data");
//         console.log(data.token);
//     } catch (error) {
//         dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
//     }
// };


// export const loginUser = (userData) => async (dispatch) => {
//     try {
//         const response = await axios.post('http://localhost:8090/auth/login', userData);
//         const data = response.data;
        
//         // Store token in local storage
//         localStorage.setItem('token', data.token);

//         // Dispatch login success action
//         dispatch({ type: LOGIN_SUCCESS, payload: data.user });

//     } catch (error) {
//         console.error("Login failed:", error.message);
//         throw error;
//     }
// };

export const loginUser = (userData) => async (dispatch) => {
    console.log("Dispatching login request");
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
        const data = await login(userData);
        console.log("Login response:", data);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        localStorage.setItem('token', data.token);
        console.log("Token saved to localStorage:", data.token);
    } catch (error) {
        console.error("Login error:", error.message);
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};


// Logout user action
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token'); // Remove token
    dispatch({ type: 'LOGOUT' });
};