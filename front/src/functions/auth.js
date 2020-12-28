import axios from 'axios';
// const url =
//   process.env.REACT_APP_ENV === 'development'
//     ? 'http://localhost:5000/api/v1'
//     : '';
export const register = (user, dispatch) => {
  return axios
    .post(`/api/v1/users/signup`, user)
    .then((response) => {
      localStorage.setItem('ccAirlinesAuth', response.data.token);
      dispatch({ type: 'SET_USER', payload: response.data.data });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const login = (user, dispatch) => {
  return axios
    .post(`/api/v1/users/login`, user)
    .then((response) => {
      localStorage.setItem('ccAirlinesAuth', response.data.token);
      dispatch({ type: 'SET_USER', payload: response.data.data });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};

export const googleLogin = async () => {
  const user = await axios.get('/api/v1/users/google')
  return user;
};

export const getMe = (dispatch) => {
  return axios
    .get('/api/v1/users/me')
    .then((res) => {
      dispatch({
        type: 'SET_USER',
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getStaff = () => {
  return axios
    .get('/api/v1/users?role=staff')
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((b) => {
      console.log(b);
      return b.response;
    });
};

export const logout = (dispatch) => {
  return axios
    .get(`/api/v1/users/logout`)
    .then((response) => {
      localStorage.removeItem('ccAirlinesAuth');
      dispatch({ type: 'REMOVE_USER', payload: null });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};
