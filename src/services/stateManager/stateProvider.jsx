import React from "react";
import { StateProvider } from "./index";
const Provider = props => {
  const initialState = {
    isAuthenticated: false,
    projectInfo: { name: "REQTER" },
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
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_AUTHENTICATED":
        const auth = {
          ...state,
          isAuthenticated: action.value,
        };
        return auth;
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
