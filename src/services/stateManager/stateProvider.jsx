import React from "react";
import { StateProvider } from "./index";
const Provider = props => {
  const initialState = {
    projectInfo: { name: "REQTER" },
    contentTypes: [
      {
        id: "1",
        name: "generic",
        title: {
          en: "Generic Item",
          fa: "آیتم عمومی"
        },
        description: {
          en: "Lorem ipsum dolor sit amet, consectetur",
          fa: "Lorem ipsum dolor sit amet, consectetur"
        },
        type: "contentType",
        template: "generic",
        allowCustomFields: true,
        fields: [
          {
            id: "1",
            name: "name",
            title: {
              en: "Name",
              fa: "Name"
            },
            description: {
              fa: "name of each product",
              en: "name of each product"
            },
            type: "string",
            isBase: true,
            isTranslate: true,
            isRequired: true
          },
          {
            id: "2",
            name: "shortDesc",
            title: {
              fa: "Short Description",
              en: "Short Description"
            },
            description: {
              fa: "",
              en: ""
            },
            type: "string",
            isBase: true,
            isTranslate: true
          },
          {
            id: "3",
            name: "thumbnail",
            title: {
              fa: "Thumbnail",
              en: "Thumbnail"
            },
            description: {
              fa: "",
              en: ""
            },
            type: "media",
            isBase: true,
            isTranslate: true,
            isRequired: true
          }
        ]
      }
    ],
    categories: [
      {
        id: "1",
        name: { fa: "اخبار", en: "News" },
        description: {
          fa: "",
          en: ""
        },
        type: "category"
      }
    ],
    contents: [
      {
        sys: {
          id: "1",
          issuer: {
            id: "1",
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        contentType: {
          id: "1",
          name: "fruits",
          title: {
            en: "Fruits",
            fa: "میوه"
          }
        },
        category: {
          id: "1",
          name: {
            en: "Products",
            fa: "محصولات"
          }
        },
        fields: {
          thumbnail: {
            en:
              "https://myresources1195.blob.core.windows.net/images/banana.jpg",
            fa:
              "https://myresources1195.blob.core.windows.net/images/banana.jpg"
          },
          name: {
            en: "Banana",
            fa: "موز ممتاز"
          },
          shortDesc: {
            en: "Imported product from africa",
            fa: "محصولات وارداتی از افریقا"
          },
          price: "2500",
          brand: {
            en: "Chicita",
            fa: "چیکیتا"
          }
        }
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
      case "ADD_ITEM_TO_CONTENTS":
        return {
          ...state,
          contents: [...state.contents, action.value]
        };
      case "UPDATE_ITEM":
        const updatedItems = state.contents.map(item => {
          if (item.sys.id === action.value.sys.id) {
            return { ...item, ...action.value };
          }
          return item;
        });
        return {
          ...state,
          contents: updatedItems
        };
      case "DELETE_ITEM":
        const Items = state.contents.filter(
          item => item.sys.id !== action.value.sys.id
        );
        return {
          ...state,
          contents: Items
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
