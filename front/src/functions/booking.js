import axios from 'axios';

export const newBooking = (passengers, id, dispatch) => {
  return axios
    .post(`/api/v1/bookings/${id}`, { passengers })
    .then((res) => {
      axios
        .get('/api/v1/users/me')
        .then((ress) => {
          dispatch({ type: 'SET_USER', payload: ress.data.data });
        })
        .catch((err) => console.log(err));
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
