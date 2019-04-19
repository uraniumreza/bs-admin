import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './Common/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default ProtectedRoute;
