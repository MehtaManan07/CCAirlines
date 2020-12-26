import axios from 'axios';

export const getAllAirports = () => {
  return axios.get('/api/v1/airports').then((res) => {
    console.log(res.data);
    return res.data.data
  }).catch(err => {
      console.log(err.response)
      return err.response
  });
};
