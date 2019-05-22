import React from "react";
import { Route, Redirect } from "react-router-dom";
import RouteHook from "react-route-hook";
import { languageManager, useGlobalState } from "./services";
import { getUserInfo } from "./Api/account-api";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isAuthenticated, userInfo }, dispatch] = useGlobalState();
  function getUserDetail() {
    getUserInfo()
      .onOk(result => {
        const spaceInfo = result.spaces[0];
        delete result.spaces;
        const userInfo = result;
        dispatch({
          type: "SET_USERINFO",
          value: userInfo,
        });
        dispatch({
          type: "SET_SPACEINFO",
          value: spaceInfo,
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call();
  }
  debugger
  return isAuthenticated ? (
    <Route
      {...rest}
    />
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
