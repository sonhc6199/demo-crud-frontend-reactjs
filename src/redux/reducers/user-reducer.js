import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  FETCHING_ROLE,
  FETCHING_ROLE_SUCCESS,
  FETCH_ROLE_FAILURE,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER_SUCCESS,
  RESET_ERROR_USER
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: [],
  userList: [],
  errors: {},
  roles: [],
  isFetchingError: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ROLE:
      return {
        ...state,
        loading: true,
        roles: [],
        errors: {}
      };
    case FETCHING_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
        errors: {}
      };
    case FETCH_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        roles: [],
        errors: action.payload
      };
    case FETCHING_USER:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
        errors: {}
      };
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        loading: false,
        userList: [],
        errors: action.payload
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        errors: {}
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isFetchingError: true
      };
    case EDIT_USER:
      return {
        ...state,
        errors: {}
      };
    case EDIT_USER_SUCCESS:
      return Object.assign({}, state, {
        userList: state.userList.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        errors: {},
        isFetchingError: false
      });
    case EDIT_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload,
        isFetchingError: true
      });
    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, {
        userList: state.userList.filter(item => item._id !== action.payload)
      });
    case RESET_ERROR_USER:
      return Object.assign({}, state, { isFetchingError: false, errors: {} });

    default:
      return state;
  }
};

export default user;
