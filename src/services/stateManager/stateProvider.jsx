import React from "react";
import { StateProvider } from "./index";
const Provider = props => {
  const initialState = {
    projectInfo: { name: "REQTER" },
    contentTypes: [],
    categories: [],
    contents: [],
    assets: [],
    status: [
      {
        id: "0",
        name: "draft",
        title: "Draft",
        icon: "icon-draft"
      },
      {
        id: "1",
        name: "archvied",
        title: "Archived",
        icon: "icon-archive"
      },
      {
        id: "2",
        name: "changed",
        title: "Changed",
        icon: "icon-refresh"
      },
      {
        id: "3",
        name: "published",
        title: "Published",
        icon: "icon-publish"
      }
    ]
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CONTENT_TYPES":
        const s = {
          ...state,
          contentTypes: action.value
        };
        return s;
      case "SET_CATEGORIES":
        return {
          ...state,
          categories: action.value
        };
      case "SET_CONTENTS":
        return {
          ...state,
          contents: action.value
        };
      case "SET_ASSETS":
        return {
          ...state,
          assets: action.value
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
