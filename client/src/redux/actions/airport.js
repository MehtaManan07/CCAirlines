import axios from 'axios';
import * as types from '../types';
import { toast } from 'react-toastify';

export const getAllAirports = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/airports`);
    dispatch({
      type: types.GET_AIRPORTS,
      payload: res.data.data,
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const getAllFlights = (to, from, date) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/v1/flights?to=${to}&from=${from}&departureString=${date}`
    );
    console.log(res);
    dispatch({
      type: types.GET_FLIGHTS,
      payload: res.data.data,
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const getSingleFlight = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/v1/flights/${id}`
    );
    console.log(res);
    dispatch({
      type: types.GET_FLIGHT,
      payload: res.data.data,
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};
export const getFlights = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/v1/flights/`
    );
    console.log(res);
    dispatch({
      type: types.GET_FLIGHTS,
      payload: res.data.data,
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const webCheck = (values,history) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/web_check/${values.pnr}`,{email: values.email}
    );
    console.log(res);
    dispatch({
      type: types.NEW_BOOKING,
      payload: { booking: res.data.data },
    });
    if(res.data.success) history.push('/seats')
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const newFlight= (values,history) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/flights/`,values
    );
    console.log(res);
    dispatch({
      type: types.NEW_FLIGHT,
      payload: res.data.data ,
    });
    if(res.data.success) history.push('/seats')
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};

export const newBooking = (passengers,id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/bookings/${id}`,{passengers}
    );
    console.log(res);
    dispatch({
      type: types.NEW_BOOKING,
      payload: { booking: res.data.data },
    });
    if(res.data.success) toast.success('Woohoo!! Booking successful, invoive is mailed to you')
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};
