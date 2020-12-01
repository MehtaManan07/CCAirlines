import axios from 'axios';
import * as types from '../types';
import { toast } from 'react-toastify';

export const getAllAirports = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/airports`);

    dispatch({
      type: types.GET_AIRPORTS,
      payload: { airports: res.data.data },
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
      payload: { flights: res.data.data },
    });
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response);
  }
};
