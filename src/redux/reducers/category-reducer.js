
import {
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    FETCHING_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS
} from '../constants/actionTypes';
const initialState = {
    loading: false,
    data: [],
    paginationCategory: {}
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
            const { page, totalItems, perPage } = action.data;
            const pagination = { ...state.paginationCategory, current: page, pageSize: perPage, total: totalItems };
            return {
                ...state,
                data: action.data.categoryList || [],
                loading: false,
                paginationCategory: pagination
            };
        }

        case FETCH_CATEGORY_FAILURE: {
            return state;
        }

        case ADD_CATEGORY_SUCCESS: {

            const dataAdd = action.data.newCategory;

            let newData = [...state.data];

            const { paginationCategory } = state;
            const pagination = { ...state.paginationCategory, total: paginationCategory.total + 1 };

            newData.unshift(dataAdd);

            if (newData.length > 10) {
                newData.pop();
            }
            return {
                ...state,
                data: newData,
                paginationCategory: pagination
            };
        }

        case ADD_CATEGORY_FAILURE: {
            return {
                ...state
            };
        }

        case EDIT_CATEGORY_SUCCESS: {

            const dataChange = action.data.newCategory;

            let newData = [...state.data];
            const indexDataChange = newData.findIndex((item) => item._id == dataChange._id);

            if (indexDataChange !== -1) {
                newData[indexDataChange] = dataChange;
            }

            return {
                ...state,
                data: newData
            };
        }

        case EDIT_CATEGORY_FAILURE: {
            return {
                ...state
            };
        }

        case DELETE_CATEGORY_SUCCESS: {


            const data = [...state.data];

            let newData = data.filter(item => item._id !== action.payload.id);
            const { paginationCategory } = state;
            const pagination = { ...state.paginationCategory, total: paginationCategory.total - 1 };
            return {
                ...state,
                data: newData,
                paginationCategory: pagination
            };
        }

        default: {
            return state;
        }
    }

};

export default category;
