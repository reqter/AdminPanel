import React from "react";
import "./styles.scss";
import LinkItem from "./linkItem";
import { useLocale } from "./../../../../../../hooks";

const NavLinks = props => {
  const { appLocale, t, currentLang } = useLocale();
  function translate(key) {
    return t(key);
  }
  const links = [
    {
      name: translate("HOME_SIDE_NAV_HOME"),
      icon: "home",
      path: "/panel",
      desc: translate("HOME_SIDE_NAV_HOME_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_FORM_TEMPLATES"),
      icon: "item-type",
      path: "/panel/templates",
      desc: translate("HOME_SIDE_NAV_FORM_TEMPLATES_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_FORMS"),
      icon: "request",
      path: "/panel/forms",
      desc: translate("HOME_SIDE_NAV_FORMS_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_REQUESTS"),
      icon: "product",
      path: "/panel/requests",
      desc: translate("HOME_SIDE_NAV_REQUESTS_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_QUOTES"),
      icon: "product",
      path: "/panel/quotes",
      desc: translate("HOME_SIDE_NAV_QUOTES_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
      icon: "users",
      path: "/panel/users",
      desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC"),
    },
  ];

  return (
    <>
      <div className="sideLinksTitle">
        {t("HOME_NAVS_TITLE")}
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
