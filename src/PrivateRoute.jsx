import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookie } from "./hooks";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [token] = useCookie("token");
  return token ? (
    <Route {...rest} />
  ) : (
    <Route
      render={props => (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )}
    />
  );
};
export default PrivateRoute;
