import { createStore, applyMiddleware, combineReducers } from 'redux';
import user from './userReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  user,
});
const middlewares = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
