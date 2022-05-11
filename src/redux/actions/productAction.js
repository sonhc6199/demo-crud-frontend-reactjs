import axios from 'axios';
import api from '../../routes/api';
import {
    FETCHING_PRODUCT,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE

} from '../constants/actionTypes';
import { notification } from 'antd';

export {
    getDataProduct,
    addProduct,
    editProduct,
    deleteProduct,
};

// getDataProduct
function getDataProduct(params = { page: 1, limit: 10 }) {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get(api.getDataProduct, {
            params: { ...params }
        })
            .then(resp => {

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
                console.log('err-action-product: ', err);
                dispatch(getDataFailure());
            });
    };

    function fetchingData() {
        return {
            type: FETCHING_PRODUCT
        };
    }

    function getDataSuccess(data, pageCurrent) {

        return {
            type: FETCH_PRODUCT_SUCCESS,
            data,
            pageCurrent
        };
    }

    function getDataFailure() {
        return {
            type: FETCH_PRODUCT_FAILURE
        };
    }
}

// addProduct
function addProduct(params = {}) {

    const formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key]);
    }

    return (dispatch) => {

        axios.post(api.addProduct, params)
            .then(resp => {

                notification.success({
                    message: 'Success',
                    description:
                        'Thêm sản phẩm thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(addProductSuccess(resp.data));
            })
            .catch((err) => {
                 
                notification.error({
                    message: 'Failed to add product',
                    description:
                        'Thêm danh sản phẩm thất bại !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                
                dispatch(addProductFailure());
            });
    };

    function addProductSuccess(data) {
        return {
            type: ADD_PRODUCT_SUCCESS,
            data
        };
    }

    function addProductFailure() {
        return {
            type: ADD_PRODUCT_FAILURE
        };
    }
}

// editProduct
function editProduct(id = {}, params = {}) {
    const formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key]);
    }
    return (dispatch) => {
        axios.put(api.editProduct + `/${id}`, formData)
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Sửa mục thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(editProductSuccess(resp.data));
            })
            .catch((err) => {
                console.log({ err }); 
                dispatch(editProductFailure());
            });
    };
    function editProductSuccess(data) {
        return {
            type: EDIT_PRODUCT_SUCCESS,
            data
        };
    }

    function editProductFailure() {
        return {
            type: EDIT_PRODUCT_FAILURE
        };
    }
}

// deleteProduct
function deleteProduct(id = {}) {
    return (dispatch) => {
        axios.delete(api.deleteProduct + `/${id}`, {})
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Xóa khách hàng thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(deleteProductSuccess(id));
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
                dispatch(deleteProductFailure());
            });
    };
    function deleteProductSuccess(data) {
        return {
            type: DELETE_PRODUCT_SUCCESS,
            data
        };
    }

    function deleteProductFailure() {
        return {
            type: DELETE_PRODUCT_FAILURE
        };
    }
}
