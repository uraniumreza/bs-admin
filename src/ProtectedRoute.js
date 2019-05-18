import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './Common/auth';
import Navbar from './Navbar';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.loggedIn() === true ? (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default ProtectedRoute;
