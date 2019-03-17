import React from "react";
import "./styles.scss";
import LinkItem from "./linkItem";
import { languageManager } from "./../../../../../../services";
const NavLinks = props => {
  function translate(key) {
    return languageManager.translate(key);
  }
  const links = [
    {
      name: translate("HOME_SIDE_NAV_CONTENT_TYPE"),
      icon: "item-type",
      path: "/home/contentType",
      desc: translate("HOME_SIDE_NAV_CONTENT_TYPE_DEC")
    },
    {
      name: translate("HOME_SIDE_NAV_CATEGRIES"),
      icon: "category",
      path: "/home/categories",
      desc: translate("HOME_SIDE_NAV_CATEGORIES_DEC")
    },
    {
      name: translate("HOME_SIDE_NAV_PRODUCTS"),
      icon: "product",
      path: "/home/products",
      desc: translate("HOME_SIDE_NAV_PRODUCTS_DESC")
    },

    {
      name: translate("HOME_SIDE_NAV_REQUESTS"),
      icon: "request",
      path: "/home/requests",
      desc: translate("HOME_SIDE_NAV_REQUESTS_DESC")
    },
    {
      name: translate("HOME_SIDE_NAV_QUOTES"),
      icon: "quote",
      path: "/home/quotes",
      desc: translate("HOME_SIDE_NAV_QUOTES_DESC")
    },
    {
      name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
      icon: "users",
      path: "/home/manageUsers",
      desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC")
    }
  ];

  return (
    <>
      <div className="sideLinksTitle">
        {languageManager.translate("HOME_NAVS_TITLE")}
      </div>
      <div className="sideLinks">
        {links.map(link => (
          <LinkItem link={link} key={link.path} />
        ))}
      </div>
    </>
  );
};

export default NavLinks;
