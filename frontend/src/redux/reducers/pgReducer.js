
// export default pgReducer;

import {
  REGISTER_PG_REQUEST,
  REGISTER_PG_SUCCESS,
  REGISTER_PG_FAILURE,
} from "../constants/pgConstants";

const initialState = {
  pgs: [],
  loading: false,
  error: null,
};
const pgReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PG_DATA_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PG_DATA_SUCCESS":
      return { ...state, loading: false, pgs: action.payload };
    case "FETCH_PG_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case REGISTER_PG_REQUEST:
      return { ...state, loading: true };
    case REGISTER_PG_SUCCESS:
      return { ...state, loading: false, pgs: [...state.pgs, action.payload] };
    case REGISTER_PG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default pgReducer;