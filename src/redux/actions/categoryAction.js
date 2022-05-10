import axios from 'axios';
import api from '../../routes/api';
import {
    FETCHING_CATEGORY,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE

} from '../constants/actionTypes';
import { notification } from 'antd';

export {
    getDataCategory,
    addCategory,
    editCategory,
    deleteCategory,
};

// getDataCategory
function getDataCategory(params = { page: 1, limit: 10 }) {
    return (dispatch) => {
        dispatch(fetchingData());
        axios.get(api.getDataCategory, {
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

// addCategory
function addCategory(params = {}) {

    return (dispatch) => {
        axios.post(api.addCategory, params)
            .then(resp => {

                notification.success({
                    message: 'Success',
                    description:
                        'Thêm danh mục thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(addCategorySuccess(resp.data));
            })
            .catch((err) => {
                console.error('[ERROR] add category: ', err);
                dispatch(addCategoryFailure());
            });
    };
    function addCategorySuccess(data) {
        return {
            type: ADD_CATEGORY_SUCCESS,
            data
        };
    }

    function addCategoryFailure() {
        return {
            type: ADD_CATEGORY_FAILURE
        };
    }
}

// editCategory
function editCategory(id = {}, params = {}) {
    return (dispatch) => {
        axios.put(api.editCategory + `/${id}`, params)
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Sửa mục thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(editCategorySuccess(resp.data));
            })
            .catch((err) => {
                console.error('[ERROR] edit category: ', err);
                dispatch(editCategoryFailure());
            });
    };
    function editCategorySuccess(data) {
        return {
            type: EDIT_CATEGORY_SUCCESS,
            data
        };
    }

    function editCategoryFailure() {
        return {
            type: EDIT_CATEGORY_FAILURE
        };
    }
}

// deleteCategory
function deleteCategory(id = {}) {
    return (dispatch) => {
        axios.delete(api.deleteCategory + `/${id}`, {})
            .then(resp => {
                notification.success({
                    message: 'Success',
                    description:
                        'Xóa khách hàng thành công !',
                    duration: 2,
                    style: { width: 350, marginLeft: 35, marginTop: 45 }
                });
                dispatch(deleteCategorySuccess(id));
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
                dispatch(deleteCategoryFailure());
            });
    };
    function deleteCategorySuccess(data) {
        return {
            type: DELETE_CATEGORY_SUCCESS,
            data
        };
    }

    function deleteCategoryFailure() {
        return {
            type: DELETE_CATEGORY_FAILURE
        };
    }
}
