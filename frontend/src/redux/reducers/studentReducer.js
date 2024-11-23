const initialState = {
  profile: null,
  payments: [],
  students: [],
  student: null,
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT_REQUEST":
      return { ...state, loading: true };
    case "ADD_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        students: [...state.students, action.payload],
      };
    case "ADD_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_STUDENTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_STUDENTS_SUCCESS":
      return { ...state, loading: false, students: action.payload };
    // const newState = { ...state, loading: false, students: action.payload };
    // console.log('New state after FETCH_STUDENTS_SUCCESS:', newState);
    // return newState;
    case "FETCH_STUDENTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_STUDENT_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_STUDENT_BY_ID_SUCCESS":
      return { ...state, loading: false, student: action.payload };
    // const newState = { ...state, loading: false, student: action.payload };
    // console.log('New state after FETCH_STUDENTS_SUCCESS:', newState);
    // return newState;
    case "FETCH_STUDENT_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_STUDENT_REQUEST":
      return { ...state, loading: true };
    case "DELETE_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    case "DELETE_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_STUDENT_REQUEST":
      return { ...state, loading: true, error: null };
    case "UPDATE_STUDENT_SUCCESS":
      return { ...state, loading: false, student: action.payload, error: null };
    case "UPDATE_STUDENT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_PAYMENTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PAYMENTS_SUCCESS":
      return { ...state, loading: false, payments: action.payload };
    case "FETCH_PAYMENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_PROFILE_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PROFILE_SUCCESS":
      return { ...state, loading: false, profile: action.payload, error: null };
    case "FETCH_PROFILE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentReducer;

// const initialState = {
//     students: [],
//     loading: false,
//     error: null
// };

// const studentReducer = (students=[], action) => {
//     console.log(students)
//     console.log('Action:', action);
//     console.log('Current student State:', students);
//     switch (action.type) {
//         case 'ADD_STUDENT_REQUEST':
//             return { ...students, loading: true };
//         case 'ADD_STUDENT_SUCCESS':
//             return { ...students, loading: false, students: [...students, action.payload] };
//         case 'ADD_STUDENT_FAILURE':
//             return { ...students, loading: false, error: action.payload };
//         case 'FETCH_STUDENTS_REQUEST':
//             return { ...students, loading: true ,error: null };
//         case 'FETCH_STUDENTS_SUCCESS':
//             return { ...students, loading: false, students: action.payload };
//         case 'FETCH_STUDENTS_FAIL':
//             return { ...students, loading: false, error: action.payload };

//         default:
//             return students;
//     }
// };

// export default studentReducer;
