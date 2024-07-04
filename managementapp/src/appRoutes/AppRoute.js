/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// Components/AppRoute.js

import React from "react";
import { Redirect, Route, Navigate } from "react-router-dom";
import { useAuthState } from "../context/Auth/index";
import PropTypes from "prop-types";

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Navigate to={{ pathname: "/authentication/sign-in" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};
AppRoute.propTypes = {
  Component: PropTypes.any,
  path: PropTypes.string,
  isPrivate: PropTypes.bool,
};
export default AppRoute;
