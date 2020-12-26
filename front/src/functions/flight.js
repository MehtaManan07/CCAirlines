import axios from 'axios';
import queryString from 'query-string';

const convert = (obj) => {
  let strr = '?';
  Object.values(obj).map((each) => {
    if (typeof each === 'object') {
      let key = Object.keys(obj).filter((k) => obj[k] === each)[0];
      strr = strr + `${key}[${each.opt}]=${each.value}&`;
      delete obj[key];
    }
  });
  console.log(strr);
  let newObj = obj;
  return { newObj, strr };
};

export const getAllFlights = (obj,string) => {
  let { newObj, strr } = convert(obj)
  let stringified = queryString.stringify(newObj);
  console.log({stringified, newObj, strr});
  return axios
    .get(`/api/v1/flights${strr}${stringified}&${string}`)
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const getOneFlight = (id) => {
  return axios
    .get(`/api/v1/flights/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const createFlight = (values) => {
  return axios
    .post(`/api/v1/flights/`, values)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};
