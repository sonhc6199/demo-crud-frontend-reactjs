import {
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    FETCHING_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS
} from '../constants/actionTypes';

const initialState = {
    loading: false,
    data: []
};

const category = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_CATEGORY: {
            return {
                ...state,
                loading: true
            };
        }

        case FETCH_CATEGORY_SUCCESS: {

            const dataCategory = action.payload;

            return {
                ...state,
                data: dataCategory.data,
                loading: false
            };
        }
        case FETCH_CATEGORY_FAILURE: {
            return state;
        }
        case ADD_CATEGORY_SUCCESS: {
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
        case ADD_CATEGORY_FAILURE: {
            return {
                ...state
            };
        }
        case DELETE_CATEGORY_SUCCESS: {
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

export default category;
