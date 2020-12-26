import axios from 'axios';

export const mySeatsCalc = (n, array) => {
  const result = [[], [], []]; //we create it, then we'll fill it

  const wordsPerLine = Math.ceil(array.length / 3);

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = array[i + line * wordsPerLine];
      if (!value) continue; //avoid adding "undefined" values
      result[line].push(value);
    }
  }
  return result;
};

export const webCheck = (email, pnr) => {
  return axios
    .post(`/api/v1/web_check/${pnr}`, { email })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const confirmSeat = (passengerId, reqSeatId, pnr) => {
  return axios
    .post(`/api/v1/web_check/change`, { passengerId, reqSeatId, pnr })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const baggageCheck = (id, weight) => {
  return axios
    .put(`/api/v1/web_check/baggage/${id}`, { weight })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const webPass = (id) => {
  return axios
    .get(`/api/v1/web_check/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};
