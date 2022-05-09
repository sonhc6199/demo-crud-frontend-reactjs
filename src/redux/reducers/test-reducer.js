import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCHING_DATA
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: [],
  paginationTest: {}
};

const test = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_DATA_SUCCESS: {
      const pagination = { ...state.paginationTest };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      pagination.current = action.currentPage;
      return {
        ...state,
        data: action.data.results,
        loading: false,
        paginationTest: pagination
      };
    }
    case FETCH_DATA_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default test;
