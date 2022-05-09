import axios from 'axios';
import { FETCHING_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../constants/actionTypes';
import { notification } from 'antd';

export {
  getDataTest
};

function getDataTest(params = {}) {
  return (dispatch) => {
    dispatch(fetchingData());
    axios.get('https://randomuser.me/api', {
      params: {
        results: 10,
        ...params
      }
    })
      .then(resp => {
        console.log('getdata ', resp);
        notification.success({
          message: 'Success',
          description:
            'Lấy dữ liệu thành công !',
          duration: 2,
          style: { width: 350, marginLeft: 35 }
        });
        dispatch(getDataSuccess(resp.data, params.page || 1));
      })
      .catch((error) => {
        console.log('[C-ERROR] err-action-test: ', error.response);
        dispatch(getDataFailure());
      });
  };

  function fetchingData() {
    return {
      type: FETCHING_DATA
    };
  }

  function getDataSuccess(data, currentPage) {
    return {
      type: FETCH_DATA_SUCCESS,
      data,
      currentPage
    };
  }

  function getDataFailure() {
    return {
      type: FETCH_DATA_FAILURE
    };
  }
}
