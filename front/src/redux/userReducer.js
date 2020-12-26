const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      console.log(payload);
      return { ...state, ...payload };
    case 'REMOVE_USER':
      return { ...state, ...payload };

    default:
      return state;
  }
};
