import * as types from '../types';

export default (state = null, { type, payload }) => {
  switch (type) {
    case types.SIGNUP:
      console.log(payload);
      localStorage.setItem('clientCC','12091u0298ry4948ty48hr23r')
      return payload;
    case types.LOGIN:
        localStorage.setItem('clientCC','12091u0298ry4948ty48hr23r')
      console.log(payload);
      return payload;
    case types.LOGOUT:
      localStorage.removeItem('clientCC')
    default:
      return state;
  }
};
