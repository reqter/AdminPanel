import React from "react";
import SideBar from "./components/SideBar";
import { Route } from "react-router-dom";
import { languageManager } from "./../../services";
import "./styles.scss";

import Categories from "./../Categories";
import ContentType from "./../ContentType";
import ManageUsers from "./../ManageUsers";
import Products from "./../Products";
import Requests from "./../Requests";
import Quotes from "./../Quotes";

const Home = props => {
  function translate(key) {
    return languageManager.translate(key);
  }
  const links = [
    {
      name: translate("HOME_SIDE_NAV_CONTENT_TYPE"),
      icon: "item-type",
      path: "/home/contentType",
      desc: translate("HOME_SIDE_NAV_CONTENT_TYPE_DEC"),
      component: ContentType
    },
    {
      name: translate("HOME_SIDE_NAV_CATEGRIES"),
      icon: "category",
      path: "/home/categories",
      desc: translate("HOME_SIDE_NAV_CATEGORIES_DEC"),
      component: Categories
    },
    {
      name: translate("HOME_SIDE_NAV_PRODUCTS"),
      icon: "product",
      path: "/home/products",
      desc: translate("HOME_SIDE_NAV_PRODUCTS_DESC"),
      component: Products
    },
    {
      name: translate("HOME_SIDE_NAV_REQUESTS"),
      icon: "request",
      path: "/home/requests",
      desc: translate("HOME_SIDE_NAV_REQUESTS_DESC"),
      component: Requests
    },
    {
      name: translate("HOME_SIDE_NAV_QUOTES"),
      icon: "quote",
      path: "/home/quotes",
      desc: translate("HOME_SIDE_NAV_QUOTES_DESC"),
      component: Quotes
    },
    {
      name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
      icon: "users",
      path: "/home/manageUsers",
      desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC"),
      component: ManageUsers
    }
  ];
  return (
    <div className="page-wrapper">
      <SideBar links={links} />
      <main className="main">
        {links.map(link => (
          <Route
            key={link.path}
            path={link.path}
            render={props => {
              const Component = link.component;
              const p = { ...props, component: link };
              return <Component {...p} />;
            }}
          />
        ))}
      </main>
    </div>
  );
};
export default Home;
