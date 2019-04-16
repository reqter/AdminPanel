import { languageManager } from "./services";

import Login from "./Packages/Login";
import Signup from "./Packages/Signup";
import Home from "./Packages/Home";
import Categories from "./Packages/Categories";
import ContentType from "./Packages/ContentType";
import Users from "./Packages/Users";
import Products from "./Packages/Products";
import UpsertProduct from "./Packages/UpsertProduct";
import Assets from "./Packages/Assets";
import UploadFile from "./Packages/upsertFile";
import UpsertUser from "./Packages/UpsertUser";

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
        path: "/panel/contents",
        desc: translate("HOME_SIDE_NAV_PRODUCTS_DESC"),
        component: Products
      },
      {
        name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
        icon: "users",
        path: "/panel/users",
        desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC"),
        component: Users
      },
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
    path: "/contents/new",
    component: UpsertProduct
  },
  {
    path: "/contents/edit/:id",
    component: UpsertProduct
  },
  {
    path: "/contents/view/:id",
    component: UpsertProduct
  },
  {
    path: "/users/new",
    component: UpsertUser
  },
  {
    path: "/users/edit/:id",
    component: UpsertUser
  },
  {
    path: "/addAsset",
    component: UploadFile
  },
  {
    path: "/editAsset/:id",
    component: UploadFile
  }
];
export default routes;
