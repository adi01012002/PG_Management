// src/redux/actions/pgActions.js
import { registerPGService, fetchPGDataService } from '../../services/pgServices';

// Register PG action
export const registerPGAction = (pgData) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_PG_REQUEST' });
        const data = await registerPGService(pgData);
        dispatch({ type: 'REGISTER_PG_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'REGISTER_PG_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Fetch PG data action
export const fetchPGDataAction = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_PG_DATA_REQUEST' });
        const data = await fetchPGDataService();
        dispatch({ type: 'FETCH_PG_DATA_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'FETCH_PG_DATA_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};
