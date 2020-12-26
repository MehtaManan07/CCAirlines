import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {} from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('ccAirlinesAuth') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
export default PrivateRoute;
