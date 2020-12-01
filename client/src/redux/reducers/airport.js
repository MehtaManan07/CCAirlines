import * as types from '../types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.GET_AIRPORTS:
      console.log(payload);
      return {...state, airports: payload};
    case types.GET_FLIGHTS:
      console.log(payload);
      return {...state, flights: payload};
    case types.GET_FLIGHT:
      console.log(payload);
      return {...state, flight: payload};
    case types.GET_STAFF:
      return {...state, staff: payload};
    default:
      return state;
  }
};
