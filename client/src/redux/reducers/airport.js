import * as types from '../types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.GET_AIRPORTS:
      console.log(payload);
      return payload;
    case types.GET_FLIGHTS:
      console.log(payload);
      return payload;
    case types.GET_FLIGHT:
      console.log(payload);
      return payload;
    default:
      return state;
  }
};
