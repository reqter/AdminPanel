import React, { useState } from "react";
import { languageManager, useGlobalState } from "../services";
import { getUserInfo } from "../Api/account-api";
const SyncComponent = props => {
  const { cmp: Component } = props;
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
        dispatch({
          type: "SET_USERINFO",
          value: {
            profile: {},
          },
        });
        dispatch({
          type: "SET_SPACEINFO",
          value: {},
        });
        toggleLoading(false);
      })
      .onBadRequest(result => {
        dispatch({
          type: "SET_USERINFO",
          value: {},
        });
        dispatch({
          type: "SET_SPACEINFO",
          value: {},
        });
        toggleLoading(false);
      })
      .unAuthorized(result => {
        dispatch({
          type: "SET_USERINFO",
          value: {},
        });
        dispatch({
          type: "SET_SPACEINFO",
          value: {},
        });
        toggleLoading(false);
      })
      .notFound(result => {
        dispatch({
          type: "SET_USERINFO",
          value: {
            profile: {},
          },
        });
        dispatch({
          type: "SET_SPACEINFO",
          value: {},
        });
        toggleLoading(false);
      })
      .call();
  }
  return !loading ? <Component {...props} /> : <div />;
};

export default SyncComponent;
