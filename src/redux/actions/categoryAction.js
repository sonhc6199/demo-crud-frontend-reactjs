import axios from 'axios';
import api from '../../routes/api';
import {
    FETCHING_CATEGORY,
    FETCH_CUSTOMER_FAILURE,
    ADD_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
    FETCH_CATEGORY_SUCCESS
} from '../constants/actionTypes';
import { notification } from 'antd';

export {
    getDataCategory,
    addCustomer,
    deleteCustomer
};

// getDataCategory
function getDataCategory(params = { pageSize: 10, pageCurrent: 1 }) {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get(api.getDataCategory, {
            params: { ...params }
        })
            .then(resp => {
                
                // message.success(resp.data.message);

                notification.success({
                    message: 'Success',
                    description:
                        'Lấy dữ liệu thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });

                dispatch(getDataSuccess(resp.data, params.pageCurrent || 1));
            })
            .catch((err) => {
                console.log('err-action-category: ', err);
                dispatch(getDataFailure());
            });
    };

    function fetchingData() {
        return {
            type: FETCHING_CATEGORY
        };
    }

    function getDataSuccess(payload, pageCurrent) {
        return {
            type: FETCH_CATEGORY_SUCCESS,
            payload,
            pageCurrent
        };
    }

    function getDataFailure() {
        return {
            type: FETCH_CUSTOMER_FAILURE
        };
    }
}

// addCustomer
function addCustomer(params = {}) {
    return (dispatch) => {
        axios.post(api.addCustomer, params)
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Thêm khách hàng thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(addCustomerSuccess(resp.data));
            })
            .catch((err) => {
                console.error('[ERROR] add customer: ', err);
                dispatch(addCustomerFailure());
            });
    };
    function addCustomerSuccess(payload) {
        return {
            type: ADD_CUSTOMER_SUCCESS,
            payload
        };
    }

    function addCustomerFailure() {
        return {
            type: ADD_CUSTOMER_FAILURE
        };
    }
}

function deleteCustomer(id = {}) {
    console.log('id delete: ', id);
    return (dispatch) => {
        axios.delete(api.deleteCustomer, { data: { id: id } })
            .then(resp => {
                // console.log('addCus', resp);
                notification.success({
                    message: 'Success',
                    description:
                        'Xóa khách hàng thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(deleteCustomerSuccess(id));
            })
            .catch((err) => {
                console.error(err);
                notification.success({
                    message: 'Success',
                    description:
                        'Xóa hàng thất bại !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(deleteCustomerFailure());
            });
    };
    function deleteCustomerSuccess(payload) {
        return {
            type: DELETE_CUSTOMER_SUCCESS,
            payload
        };
    }

    function deleteCustomerFailure() {
        return {
            type: DELETE_CUSTOMER_FAILURE
        };
    }
}
