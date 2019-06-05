import React, { useEffect } from "react";
import {
  NotificationBar,
  setNotif,
  useNotification,
} from "./../../components/Commons/NotficationBar";
import { StateProvider } from "./index";
import storageManager from "./../storageManager";
const Provider = props => {
  // const [notifiIfo] = useNotification();
  // useEffect(() => {
  //   setTimeout(() => {
  //     setNotif("test message");
  //   }, 2000);
  // }, false);

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
    requests: [],
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
        name: "archived",
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
    webhooks: [],
    t: {},
    spinner: true,
    mp_categories: [
      {
        _id: "1",
        sys: {},
        name: { en: "News", fa: "اخبار" },
        count: 23,
        items: [
          {
            _id: "11",
            parentId: "1",
            sys: {},
            name: { en: "Sport", fa: "ورزش" },
            count: 23,
            items: [
              {
                _id: "111",
                parentId: "11",
                sys: {},
                name: { en: "ّFootball", fa: "فوتبال" },
                count: 55,
                items: [
                  {
                    _id: "1111",
                    parentId: "111",
                    sys: {},
                    name: { en: "ّFootball Beach", fa: " فوتبال ساحلی" },
                    count: 9
                  },
                ],
              },
            ],
          },
          {
            _id: "12",
            parentId: "1",
            sys: {},
            name: { en: "Basketball", fa: "بسکتبال" },
            count: 76,
          },
        ],
      },
      { _id: "2", sys: {}, name: { en: "Economy", fa: "اقتصاد" }, count: 56 },
      { _id: "3", sys: {}, name: { en: "Social", fa: "جامعه" }, count: 14 },
      { _id: "4", sys: {}, name: { en: "Business", fa: "بازار" }, count: 7 },
      { _id: "5", sys: {}, name: { en: "War", fa: "حوادث" }, count: 49 },
    ],
    mp_contentTypes: [
      { _id: "1", name: "travel", title: { en: "Travel", fa: "مسافرت" } },
      { _id: "2", name: "book", title: { en: "Book", fa: "کتاب" } },
      { _id: "3", name: "game", title: { en: "Game", fa: "بازی" } },
    ],
    mp_requests: [
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img:
          "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
      },
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img: "http://www.zakcars.com/images/zakcars1.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
      },
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img:
          "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
      },
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img: "http://www.zakcars.com/images/zakcars1.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
      },
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img:
          "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rwhg5Ck5yd78IL3usb8TNeIBk8ehcLqhAsVFSI_9E1ZQfqwt",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://www.mytravelomart.com/wp-content/uploads/2018/09/car-rental-services-udaipur.png",
      },
      {
        _id: 1,
        sys: {
          link: "xsxs",
        },
        img: "http://www.zakcars.com/images/zakcars1.jpg",
      },
      {
        _id: 2,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVC_kZkWOsWqgB2rVlMs1ADk4maXJTjvJdIQyDW07DO5I1G68",
      },
      {
        _id: 3,
        sys: {
          link: "xsxs",
        },
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgFgj75UT57JSznEAHtNT1UU6B8PooI3xbMadON7aREexTsyS2Q",
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGOUT":
        storageManager.removeItem("token");
        const logout = {
          ...state,
          isAuthenticated: false,
          spaceInfo: undefined,
          userInfo: undefined,
          contentTypes: [],
          fields: [],
          categories: [],
          contents: [],
          users: [],
          assets: [],
          apiKeys: [],
          webhooks: [],
        };
        return logout;
      case "TOGGLE_SPINNER":
        const spinner = {
          ...state,
          spinner: action.value,
        };
        return spinner;
      case "SET_LOCALE":
        const locale = {
          ...state,
          t: action.value,
        };
        return locale;
      case "SET_AUTHENTICATED":
        const auth = {
          ...state,
          isAuthenticated: action.value,
        };
        return auth;
      case "SET_USERINFO":
        // if (action.value.profile && action.value.profile.avatar) {
        //   if (action.value.profile.avatar)
        //     action.value.profile.avatar =
        //       process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL +
        //       action.value.profile.avatar;
        // }
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
      case "SET_LOCALES":
        debugger;
        let s_l_info = { ...state.spaceInfo };
        s_l_info["locales"] = action.value;
        const s_locales = {
          ...state,
          spaceInfo: s_l_info,
        };
        return s_locales;
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
          item => item._id !== action.value._id
        );
        return {
          ...state,
          apiKeys: apiKeys_delete,
        };
      case "UPDATE_API_KEY":
        const apiKeys_up = state.apiKeys.map(item => {
          if (item._id === action.value._id) item = action.value;
          return item;
        });
        return {
          ...state,
          apiKeys: apiKeys_up,
        };
      case "SET_REQUESTS":
        const requests = {
          ...state,
          requests: action.value,
        };
        return requests;
      case "SET_WEBHOOKS":
        const webhooks = {
          ...state,
          webhooks: action.value,
        };
        return webhooks;
      case "SET_CONTENT_TYPES":
        const s = {
          ...state,
          contentTypes: action.value,
        };
        return s;
      case "ADD_CONTENT_TYPE":
        let c_add = [...state.contentTypes];
        c_add.push(action.value);
        return {
          ...state,
          contentTypes: c_add,
        };
      case "UPDATE_CONTENT_TYPE":
        const s_up = state.contentTypes.map(item => {
          if (item._id === action.value._id) item = action.value;
          return item;
        });
        return {
          ...state,
          contentTypes: s_up,
        };
      case "DELETE_CONTENT_TYPE":
        const s_delete = state.contentTypes.filter(
          item => item._id !== action.value._id
        );
        return {
          ...state,
          contentTypes: s_delete,
        };
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
      case "ADD_CATEGORY":
        let cat_add = [...state.categories];
        cat_add.push(action.value);
        return {
          ...state,
          categories: cat_add,
        };
      case "SET_CONTENTS":
        return {
          ...state,
          contents: action.value,
        };
      case "DELETE_CONTENT":
        const content_delete = state.contents.filter(
          item => item._id !== action.value._id
        );
        return {
          ...state,
          contents: content_delete,
        };
      case "CHANGE_CONTENT_STATUS":
        const content_status = state.contents.map(item => {
          if (item._id === action.value._id) item.status = action.value.status;
          return item;
        });

        return {
          ...state,
          contents: content_status,
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
      case "DELETE_ASSET":
        const assets_delete = state.assets.filter(
          item => item._id !== action.value._id
        );
        return {
          ...state,
          assets: assets_delete,
        };
      case "ARCHIVE_ASSET":
        const assets_archive = state.assets.map(item => {
          if (item._id === action.value._id) item.status = action.value.status;
          return item;
        });

        return {
          ...state,
          assets: assets_archive,
        };
      case "UN_ARCHIVE_ASSET":
        const assets_unarchive = state.assets.map(item => {
          if (item._id === action.value._id) item.status = action.value.status;
          return item;
        });

        return {
          ...state,
          assets: assets_unarchive,
        };
      case "PUBLISH_ASSET":
        const assets_publish = state.assets.map(item => {
          if (item._id === action.value._id) item.status = action.value.status;
          return item;
        });

        return {
          ...state,
          assets: assets_publish,
        };
      case "UN_PUBLISH_ASSET":
        const assets_unpublish = state.assets.map(item => {
          if (item._id === action.value._id) item.status = action.value.status;
          return item;
        });

        return {
          ...state,
          assets: assets_unpublish,
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
      {/* <NotificationBar {...notifiIfo} /> */}
    </StateProvider>
  );
};
export default Provider;
