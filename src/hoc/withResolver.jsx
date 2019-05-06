import React, { useState } from "react";
import { languageManager, useGlobalState } from "../services";
import { getUserInfo } from "../Api/account-api";
const widthResolver = WrappedComponent => {
  // const { cmp: Component } = props;

  return props => {
    const [{ userInfo }, dispatch] = useGlobalState();
    const [loading, toggleLoading] = useState(userInfo ? false : true);
    if (!userInfo) {
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
          toggleLoading(false);
        })
        .onServerError(result => {
          toggleLoading(false);
        })
        .onBadRequest(result => {
          toggleLoading(false);
        })
        .unAuthorized(result => {
          toggleLoading(false);
        })
        .notFound(result => {
          toggleLoading(false);
        })
        .call();
    }
    return !loading ? <WrappedComponent {...props} /> : <div />;
  };
};

export default widthResolver;
