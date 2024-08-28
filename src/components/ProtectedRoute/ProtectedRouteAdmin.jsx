import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.user;

  return (
    <Route
      {...rest}
      render={
        (props) => {
          if (user?.email === process.env.REACT_APP_ADMIN_EMAIL) {
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

export default ProtectedRouteAdmin;
