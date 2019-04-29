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
        dispatch({
          type: "SET_USERINFO",
          value: result,
        });
      })
      .onServerError(result => {

      })
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call();
  }
  debugger
  return isAuthenticated ? (
    <RouteHook onEnter={userInfo === undefined ? getUserDetail() : undefined} {...rest} />
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
