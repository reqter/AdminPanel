import { languageManager } from "./services";

import Login from "./Packages/Login";
import Signup from "./Packages/Signup";
import Home from "./Packages/Home";
import Categories from "./Packages/Categories";
import ContentType from "./Packages/ContentType";
import ManageUsers from "./Packages/ManageUsers";
import Products from "./Packages/Products";
// import Requests from "./Packages/Requests";
// import Quotes from "./Packages/Quotes";
import UpsertProduct from "./Packages/UpsertProduct";
import Assets from "./Packages/Assets";
import UploadFile from "./Packages/upsertFile";

function translate(key) {
  return languageManager.translate(key);
}

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: Signup
  },
  {
    path: "/panel",
    component: Home,
    routes: [
      {
        name: translate("HOME_SIDE_NAV_CONTENT_TYPE"),
        icon: "item-type",
        path: "/panel/contentType",
        desc: translate("HOME_SIDE_NAV_CONTENT_TYPE_DEC"),
        component: ContentType
      },
      {
        name: translate("HOME_SIDE_NAV_CATEGRIES"),
        icon: "category",
        path: "/panel/categories",
        desc: translate("HOME_SIDE_NAV_CATEGORIES_DEC"),
        component: Categories
      },
      {
        name: translate("HOME_SIDE_NAV_PRODUCTS"),
        icon: "product",
        path: "/panel/items",
        desc: translate("HOME_SIDE_NAV_PRODUCTS_DESC"),
        component: Products
      },

      // {
      //   name: translate("HOME_SIDE_NAV_REQUESTS"),
      //   icon: "request",
      //   path: "/home/requests",
      //   desc: translate("HOME_SIDE_NAV_REQUESTS_DESC"),
      //   component: Requests
      // },
      // {
      //   name: translate("HOME_SIDE_NAV_QUOTES"),
      //   icon: "quote",
      //   path: "/home/quotes",
      //   desc: translate("HOME_SIDE_NAV_QUOTES_DESC"),
      //   component: Quotes
      // },
      // {
      //   name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
      //   icon: "users",
      //   path: "/home/manageUsers",
      //   desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC"),
      //   component: ManageUsers
      // },
      {
        name: translate("HOME_SIDE_NAV_ASSETS_MANAGER"),
        icon: "images",
        path: "/panel/assets",
        desc: translate("HOME_SIDE_NAV_ASSETS_MANAGER_DESC"),
        component: Assets
      }
    ]
  },
  {
    path: "/items/new",
    component: UpsertProduct
  },
  {
    path: "/items/edit/:id",
    component: UpsertProduct
  },
  {
    name: translate("HOME_SIDE_NAV_ASSETS_MANAGER_UPLOAD"),
    icon: "folder",
    path: "/addAsset",
    desc: translate("HOME_SIDE_NAV_ASSETS_MANAGER_DESC_UPLOAD"),
    component: UploadFile
  },
  {
    path: "/editAsset/:id",
    component: UploadFile
  }
];
export default routes;
