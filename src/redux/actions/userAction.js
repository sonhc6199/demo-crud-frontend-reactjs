import axios from "axios";
import { notification } from "antd";

import api from "../../routes/api";
import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  FETCHING_ROLE,
  FETCHING_ROLE_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  RESET_ERROR_USER
} from "../constants/actionTypes";

const notifySuccess = msg => {
  return {
    message: "Success",
    description: msg,
    duration: 2.5,
    style: {
      width: 350,
      marginLeft: 35,
      marginTop: 45,
      backgroundColor: " #f6ffed",
      color: " color: rgba(0,0,0,0.65)",
      border: `1px solid #b7eb8f`
    }
  };
};
function addUser(params = {}, cb) {
  return dispatch => {
    axios
      .post(api.users, params)
      .then(resp => {
        notification.success(notifySuccess("Add user successfully!"));
        dispatch(addUserSuccess(resp.data));
        cb();
        dispatch(getUserList({}));
      })
      .catch(err => {
        dispatch(addUserFailure(err.response.data));
      });
  };
  function addUserSuccess(payload) {
    return {
      type: ADD_USER_SUCCESS,
      payload
    };
  }
  function addUserFailure(payload) {
    return {
      type: ADD_USER_FAILURE,
      payload
    };
  }
}
function editUser(params = {}, cb) {
  return dispatch => {
    dispatch(fetchingEditUser());
    axios
      .put(api.users, params)
      .then(({ data }) => {
        // console.log("TCL: editUser -> res", res);
        dispatch(editUserSuccess(data));
        notification.success(notifySuccess("Edit user successfully!"));
        cb();
      })
      .catch(errors => {
        console.log("TCL: editUser -> errors", errors);
        dispatch(editUserFailure(errors.response.data));
      });
  };
  function fetchingEditUser() {
    return {
      type: EDIT_USER
    };
  }
  function editUserSuccess(payload) {
    return {
      type: EDIT_USER_SUCCESS,
      payload
    };
  }
  function editUserFailure(payload) {
    return {
      type: EDIT_USER_FAILURE,
      payload
    };
  }
}
function deleteUser({ id, params = {} }) {
  return dispatch => {
    axios
      .delete(`${api.users}/${id}`)
      .then(({ data }) => {
        dispatch(getUserList(params));
        notification.success(notifySuccess("Delete user successfully!"));
      })
      .catch(errors => {
        dispatch(deleteUserFailure(errors.response.data));
      });
  };
  function deleteUserSuccess(payload) {
    return {
      type: DELETE_USER_SUCCESS,
      payload
    };
  }
  function deleteUserFailure(payload) {
    return {
      type: DELETE_USER_FAILURE,
      payload
    };
  }
}
function getUserList({ pageCurrent, limit, order, field }) {
  return dispatch => {
    dispatch(fetchingUser());
    axios
      .get(api.users, {
        params: {
          pageCurrent: pageCurrent || 1,
          order: order,
          field: field
        }
      })
      .then(res => {
        dispatch(getUserSuccess(res.data));
      })
      .catch(errors => {
        dispatch(getUserFailure(errors));
      });
  };
  function fetchingUser() {
    return {
      type: FETCHING_USER
    };
  }
  function getUserSuccess(payload) {
    return {
      type: FETCHING_USER_SUCCESS,
      payload
    };
  }
  function getUserFailure(payload) {
    return {
      type: FETCHING_USER_FAILURE,
      payload
    };
  }
}

function getRoleList() {
  return dispatch => {
    dispatch(fetchingRole());
    axios
      .get(api.roles)
      .then(res => {
        dispatch(getRoleSuccess(res.data));
      })
      .catch(errors => {
        console.log("TCL: getRoles -> errors", errors);
        dispatch(getRoleFailure(errors));
      });
  };

  function fetchingRole() {
    return {
      type: FETCHING_ROLE
    };
  }

  function getRoleSuccess(payload) {
    return {
      type: FETCHING_ROLE_SUCCESS,
      payload
    };
  }

  function getRoleFailure(payload) {
    return {
      type: FETCH_CUSTOMER_FAILURE,
      payload
    };
  }
}

function resetError(payload) {
  return {
    type: RESET_ERROR_USER,
    payload
  };
}

export { addUser, getRoleList, getUserList, editUser, deleteUser, resetError };
