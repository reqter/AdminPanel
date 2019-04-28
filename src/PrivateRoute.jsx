import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalState } from "./services";
import { getUserInfo } from "./Api/account-api";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isAuthenticated, userInfo }, dispatch] = useGlobalState();

  function getUserDetail() {
    getUserInfo()
      .onOk(result => {
        return <Route {...rest} />;
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call();
  }

  return isAuthenticated ? (
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
