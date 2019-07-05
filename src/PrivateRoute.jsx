import React from "react";
import { Route, Redirect } from "react-router-dom";
import RouteHook from "react-route-hook";
import { storageManager, useGlobalState } from "./services";
import { getUserInfo } from "./Api/account-api";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isAuthenticated, userInfo }, dispatch] = useGlobalState();

  return storageManager.getItem("token") ? (
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
