
const initialState = {
    pg: null,
    loading: false,
    error: null,
    pgData: null,
};

const pgReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_PG_REQUEST':
        case 'FETCH_PG_DATA_REQUEST':
            return { ...state, loading: true, error: null };
        case 'REGISTER_PG_SUCCESS':
            return { ...state, loading: false, pg: action.payload.pg, error: null };
        case 'FETCH_PG_DATA_SUCCESS':
            return { ...state, loading: false, pgData: action.payload, error: null };
        case 'REGISTER_PG_FAILURE':
        case 'FETCH_PG_DATA_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default pgReducer;