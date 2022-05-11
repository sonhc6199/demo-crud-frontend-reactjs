import {
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCHING_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
    loading: false,
    data: [],
    paginationProduct: {}
};

const product = (state = initialState, action) => {

    switch (action.type) {

        case FETCHING_PRODUCT: {
            return {
                ...state,
                loading: true
            };
        }

        case FETCH_PRODUCT_SUCCESS: {
            const { page, totalItems, perPage } = action.data;
            const pagination = { ...state.paginationProduct, current: page, pageSize: perPage, total: totalItems };
            
            return {
                ...state,
                data: action.data.productList || [],
                loading: false,
                paginationProduct: pagination

            };
        }

        case FETCH_PRODUCT_FAILURE: {
            return state;
        }

        case ADD_PRODUCT_SUCCESS: {

            const dataAdd = action.data.newProduct;

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

        case ADD_PRODUCT_FAILURE: {
            return {
                ...state
            };
        }

        case EDIT_PRODUCT_SUCCESS: {

            const dataChange = action.data.newProduct;

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

        case EDIT_PRODUCT_FAILURE: {
            return {
                ...state
            };
        }

        case DELETE_PRODUCT_SUCCESS: {

            const data = [...state.data];
            let newData = data.filter(item => item._id !== action.data);

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

export default product;
