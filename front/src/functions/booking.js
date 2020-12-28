import axios from 'axios';
import { getMe } from './auth';

export const newBooking = (passengers, id, dispatch) => {
  return axios
    .post(`/api/v1/bookings/${id}`, { passengers })
    .then((res) => {
     getMe(dispatch)
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const getBooking = (pnr) => {
  return axios
    .get(`/api/v1/bookings/${pnr}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const allBookings = () => {
  return axios
    .get(`/api/v1/bookings`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const cancelBooking = (id) => {
  return axios
    .post(`/api/v1/bookings/cancel/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};
