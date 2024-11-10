const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    console.log(action)
    console.log(initialState.user)
    switch (action.type) {
        case 'REGISTER_REQUEST':
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.payload };
        case 'REGISTER_FAILURE':
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...initialState };
        default:
            return state;
    }
};

export default authReducer;
