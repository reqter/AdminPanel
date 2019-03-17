import React from "react";
import { StateProvider } from "./index";
const Provider = props => {
  const initialState = {
    projectInfo: { name: "REQTER" },
    contentTypes: [
      {
        id: "1",
        name: "generic",
        title: "Generic Item",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "contentType",
        template: "generic",
        allowCustomFields: true,
        fields: [
          {
            id: "1",
            name: "name",
            title: "Name",
            description: "name of each product",
            type: "string",
            isBase: true
          },
          {
            id: "2",
            name: "shortDesc",
            title: "Short Description",
            description: "",
            type: "string",
            isBase: true
          },
          {
            id: "3",
            name: "thumbnail",
            title: "Thumbnail",
            description: "",
            type: "media",
            isBase: true
          }
        ]
      }
    ],
    categories: [],
    contents: []
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
