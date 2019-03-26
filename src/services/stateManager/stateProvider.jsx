import React from "react";
import { StateProvider } from "./index";
import languageManager from "../languageManager";
const Provider = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
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
            mediaType: "image",
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
    ],
    assets: [
      {
        id: "1",
        name: {
          en: "Image1",
          fa: "Image1"
        },
        url: {
          en:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          fa:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },

        dimention: "312 * 215 px",
        type: "Image jpeg",
        updated: "2 days ago",
        by: "Me"
      }
      //   {
      //     id: "2",
      //     name: "Image2",
      //     url:
      //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLb5mOUtzV0ObqBVuAURSvPAsC27148aFdKGc6e6Z_Z78vmMWf",
      //     dimention: "312 * 215 px",
      //     type: "Image jpeg",
      //     updated: "yesterday",
      //     by: "Me",
      //     mediaType: "image"
      //   },
      //   {
      //     id: "3",
      //     name: "Video1",
      //     url:
      //       "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      //     dimention: "312 * 215 px",
      //     type: "Video mp4",
      //     updated: "2 hours ago",
      //     by: "Me",
      //     mediaType: "video"
      //   },
      //   {
      //     id: "4",
      //     name: "Image 4",
      //     url:
      //       "https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-1920x1200-12.jpg.asset.1519121502869.jpg",
      //     dimention: "312 * 215 px",
      //     type: "Image gif",
      //     updated: "4 hours ago",
      //     by: "Me",
      //     mediaType: "image"
      //   },
      //   {
      //     id: "5",
      //     name: "Pdf 3",
      //     url:
      //       "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      //     dimention: "312 * 215 px",
      //     type: "File pdf",
      //     updated: "1 hours ago",
      //     by: "Me",
      //     mediaType: "pdf"
      //   },
      //   {
      //     id: "6",
      //     name: "Image 6",
      //     url:
      //       "https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg",
      //     dimention: "312 * 215 px",
      //     type: "Image jpg",
      //     updated: "10 hours ago",
      //     by: "Me",
      //     mediaType: "image"
      //   },
      //   {
      //     id: "7",
      //     name: "Audio 1",
      //     url:
      //       "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      //     dimention: "312 * 215 px",
      //     type: "Audio mp3",
      //     updated: "22 hours ago",
      //     by: "Me",
      //     mediaType: "audio"
      //   },
      //   {
      //     id: "8",
      //     name: "Spreadsheet 2",
      //     url:
      //       "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      //     dimention: "312 * 215 px",
      //     type: "File spreadsheet",
      //     updated: "2 hours ago",
      //     by: "Me",
      //     mediaType: "spreadsheet"
      //   },
      //   {
      //     id: "9",
      //     name: "My Image",
      //     url: "https://i.ytimg.com/vi/gD4uACwPChA/maxresdefault.jpg",
      //     dimention: "312 * 215 px",
      //     type: "image jpg",
      //     updated: "2 hours ago",
      //     by: "Me",
      //     mediaType: "image"
      //   }
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
      case "ADD_ITEM_TO_ASSETS":
        debugger;
        return {
          ...state,
          assets: [...state.assets, action.value]
        };
      case "DELETE_ASSET":
        const ass = state.assets.filter(item => item.id !== action.value.id);
        return {
          ...state,
          assets: ass
        };
      default:
        return state;
    }
  };
  function getContentByFilter(dataFilters) {
    const contents = initialState.contents;
    if (dataFilters.length > 0) {
      return contents.filter(item => {
        for (let i = 0; i < dataFilters.length; i++) {
          const filter = dataFilters[i];
          if (filter.type === "text") {
            if (
              !item.fields.name[currentLang]
                .toLowerCase()
                .includes(filter.title)
            )
              return false;
          }
          if (filter.type === "contentType") {
            if (item.contentType.id !== filter.id) return false;
          }
          if (filter.type === "category") {
            if (item.category.id !== filter.id) return false;
          }
        }

        return true;
      });
    } else {
      return contents;
    }
  }
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {props.children}
    </StateProvider>
  );
};
export default Provider;
