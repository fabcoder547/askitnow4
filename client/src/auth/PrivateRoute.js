import React from "react";
import { isAuthenticated } from "./helper/authHelper";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    ></Route>
  );
};
export default PrivateRoute;
