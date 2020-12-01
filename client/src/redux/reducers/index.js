import { combineReducers } from 'redux';
import auth from './auth';
import airport from './airport';

const rootReducer = combineReducers({
  auth,
  airport
});

export default rootReducer;
