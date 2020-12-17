import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
