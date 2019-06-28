import React from "react";
import "./styles.scss";
import LinkItem from "./linkItem";
import { useLocale } from "../../../../../../hooks";

const NavLinks = props => {
  const { appLocale, t, currentLang } = useLocale();
  function translate(key) {
    return t(key);
  }
  const links = [
    {
      name: translate("HOME_SIDE_NAV_HOME"),
      icon: "home",
      path: `/${currentLang}/home`,
      desc: translate("HOME_SIDE_NAV_HOME_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_QUESTION_TYPES"),
      icon: "item-type",
      path: `/${currentLang}/contentTypes`,
      desc: translate("HOME_SIDE_NAV_QUESTION_TYPES_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_FORMS"),
      icon: "request",
      path: `/${currentLang}/forms`,
      desc: translate("HOME_SIDE_NAV_FORMS_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_REQUESTS"),
      icon: "product",
      path: `/${currentLang}/requests`,
      desc: translate("HOME_SIDE_NAV_REQUESTS_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_QUOTES"),
      icon: "product",
      path: `/${currentLang}/quotes`,
      desc: translate("HOME_SIDE_NAV_QUOTES_DESC"),
    },
    {
      name: translate("HOME_SIDE_NAV_MANAGET_USERS"),
      icon: "users",
      path: `/${currentLang}/users`,
      desc: translate("HOME_SIDE_NAV_MANAGE_USERS_DESC"),
    },
  ];

  return (
    <>
      <div className="sideLinksTitle">{t("HOME_NAVS_TITLE")}</div>
      <div className="sideLinks">
        {links.map(link => (
          <LinkItem link={link} key={link.path} />
        ))}
      </div>
    </>
  );
};

export default NavLinks;
