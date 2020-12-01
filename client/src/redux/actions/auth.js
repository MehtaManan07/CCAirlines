import axios from 'axios';
import * as types from '../types';
import {toast} from 'react-toastify'

export const signup = (values) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/users/signup`, values);

    dispatch({
      type: types.SIGNUP,
      payload: { user: res.data.data },
    });
  } catch (error) {
      
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/users/login`,
      data
    );
    console.log(res.data);

    dispatch({
      type: types.LOGIN,
      payload: { user: res.data.data },
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/users/logout');
    console.log(data);
    dispatch({
      type: types.LOGOUT,
      payload: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getStaff = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/users?role=staff');
    console.log(data);
    dispatch({
      type: types.GET_STAFF,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/users/me');
    console.log(data);
    dispatch({
      type: types.LOGIN,
      payload: { user: data.data },
    });
  } catch (error) {
    console.log(error);
  }
};
