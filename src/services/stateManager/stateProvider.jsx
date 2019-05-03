import React from "react";
import { StateProvider } from "./index";
import storageManager from "./../storageManager";
const Provider = props => {
  const token = storageManager.getItem("token");
  const initialState = {
    isAuthenticated:
      token !== undefined && token !== null && token.length > 0 ? true : false,
    spaceInfo: undefined,
    userInfo: undefined,
    contentTypeTemlates: [],
    contentTypes: [],
    fields: [],
    categories: [],
    contents: [],
    users: [],
    assets: [],
    status: [
      {
        id: "0",
        name: "draft",
        icon: "icon-draft",
      },
      {
        id: "1",
        name: "archvied",
        icon: "icon-archive",
      },
      {
        id: "2",
        name: "changed",
        icon: "icon-refresh",
      },
      {
        id: "3",
        name: "published",
        icon: "icon-publish",
      },
    ],
    notifies: [],
    sysLocales: [
      {
        name: "en",
        title: "English (United State) (en-US)",
      },
      {
        name: "fa",
        title: "فارسی (ایران) (fa)",
      },
      {
        name: "de",
        title: "German (Germany) (de-DE)",
      },
      {
        name: "sv",
        title: "Swedish (Sweden) (sw-SV)",
      },
    ],
    apiKeys: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_AUTHENTICATED":
        const auth = {
          ...state,
          isAuthenticated: action.value,
        };
        return auth;
      case "SET_USERINFO":
        const u = {
          ...state,
          userInfo: action.value,
        };
        return u;
      case "SET_SPACEINFO":
        const s_info = {
          ...state,
          spaceInfo: action.value,
        };
        return s_info;
      case "SET_API_KEYS":
        const apiKeys = {
          ...state,
          apiKeys: action.value,
        };
        return apiKeys;
      case "ADD_API_KEY":
        let apiKeys_add = [...state.apiKeys];
        apiKeys_add.push(action.value);
        return {
          ...state,
          apiKeys: apiKeys_add,
        };
      case "DELETE_API_KEY":
        const apiKeys_delete = state.apiKeys.filter(
          item => item.id !== action.value.id
        );
        return {
          ...state,
          apiKeys: apiKeys_delete,
        };
      case "UPDATE_API_KEY":
        const apiKeys_up = state.apiKeys.map(item => {
          if (item.id === action.value.id) item = action.value;
          return item;
        });
        return {
          ...state,
          apiKeys: apiKeys_up,
        };
      case "SET_CONTENT_TYPES":
        const s = {
          ...state,
          contentTypes: action.value,
        };
        return s;
      case "SET_CONTENT_TEMPLATES":
        const c_t = {
          ...state,
          contentTypeTemlates: action.value,
        };
        return c_t;
      case "SET_FIELDS":
        const f = {
          ...state,
          fields: action.value,
        };
        return f;
      case "SET_CATEGORIES":
        return {
          ...state,
          categories: action.value,
        };
      case "SET_CONTENTS":
        return {
          ...state,
          contents: action.value,
        };
      case "SET_USERS":
        return {
          ...state,
          users: action.value,
        };
      case "DELETE_USER":
        const users_delete = state.users.filter(
          item => item.id !== action.value.id
        );
        return {
          ...state,
          users: users_delete,
        };
      case "SET_ASSETS":
        return {
          ...state,
          assets: action.value,
        };
      case "ADD_NOTIFY":
        let newItem = { ...action.value };
        newItem.id = Math.random();
        let items_n = [...state.notifies];
        items_n.unshift(newItem);
        return {
          ...state,
          notifies: items_n,
        };
      case "REMOVE_NOTIFY":
        const items = state.notifies.filter(
          item => item.id !== action.value.id
        );
        return {
          ...state,
          notifies: items,
        };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {props.children}
    </StateProvider>
  );
};
export default Provider;
