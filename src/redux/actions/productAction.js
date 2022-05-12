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
    DELETE_PRODUCT_FAILURE,
    FETCHING_CATEGORY,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE
} from '../constants/actionTypes';
import { notification } from 'antd';

export {
    getDataProduct,
    addProduct,
    editProduct,
    deleteProduct,
    getDataCategory
};

// getDataCategory
function getDataCategory(params = { page: 1, limit: 10 }) {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get(api.getDataCategory, {
            params: { ...params }
        })
            .then(resp => {
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

    function getDataSuccess(data, pageCurrent) {

        return {
            type: FETCH_CATEGORY_SUCCESS,
            data,
            pageCurrent
        };
    }

    function getDataFailure() {
        return {
            type: FETCH_CATEGORY_FAILURE
        };
    }
}
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
        if (key == "file") {
            if (params[key]) formData.append(key, params[key].file.originFileObj);
        }
        else {
            formData.append(key, params[key]);
        }

    }

    return (dispatch) => {

        axios.post(api.addProduct, formData)
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
                const message = err.response.data;
                notification.error({
                    message: 'Failed to add product',
                    description:
                        message,
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
        if (key == "file") {
            if (params[key]) formData.append(key, params[key].file.originFileObj);
        }
        else {
            formData.append(key, params[key]);
        }
    }
    return (dispatch) => {
        axios.put(api.editProduct + `/${id}`, formData)
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Sửa sản phẩm thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(editProductSuccess(resp.data));
            })
            .catch((err) => {
                const message = err.response.data;
                notification.error({
                    message: 'Failed to edit product',
                    description:
                        message,
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
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
function deleteProduct(id = {}, params = { page: 1, limit: 10 }) {
    console.log({ params });
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

                if (params.total > 1 && (params.total - 1) % params.pageSize == 0) {
                    dispatch(fetchDataProduct({ page: params.current - 1, limit: 10 }));
                }
                dispatch(deleteProductSuccess(id));
            })
            .catch((err) => {
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


// getDataCategory
function fetchDataProduct(params = { page: 1, limit: 10 }) {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get(api.getDataCategory, {
            params: { ...params }
        })
            .then(resp => {

                dispatch(getDataSuccess(resp.data, params.pageCurrent || 1));
            })
            .catch((err) => {
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
