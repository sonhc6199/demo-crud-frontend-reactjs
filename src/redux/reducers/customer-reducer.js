import {
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCHING_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: [],
  paginationCustomer: {}
};

const customer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CUSTOMER: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_CUSTOMER_SUCCESS: {
      const pagination = { ...state.paginationCustomer };
      const dataCustomer = action.payload;
      // Read total count from server
      pagination.total = dataCustomer.total;
      pagination.current = action.pageCurrent;
      return {
        ...state,
        data: dataCustomer.data,
        loading: false,
        paginationCustomer: pagination
      };
    }
    case FETCH_CUSTOMER_FAILURE: {
      return state;
    }
    case ADD_CUSTOMER_SUCCESS: {
      const dataAdd = action.payload.dataSave;
      let newData = [...state.data];
      newData.unshift(dataAdd);
      if (newData.length > 10) {
        newData.pop();
      }
      return {
        ...state,
        data: newData
      };
    }
    case ADD_CUSTOMER_FAILURE: {
      return {
        ...state
      };
    }
    case DELETE_CUSTOMER_SUCCESS: {
      const data = [...state.data];
      let newData = data.filter(item => item._id !== action.payload);
      console.log('ascs', newData, action.payload);
      return {
        ...state,
        data: newData
      };
    }
    default: {
      return state;
    }
  }
};

export default customer;
