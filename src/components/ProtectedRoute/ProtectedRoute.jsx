import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.jwt;

  return (
    <Route
      {...rest}
      render={
        (props) => {
          if (user) {
            return <Component {...rest} {...props} />;
          }
          return (
            <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location,
                },
              }
            }
            />
          );
        }
      }
    />
  );
};

export default ProtectedRoute;
