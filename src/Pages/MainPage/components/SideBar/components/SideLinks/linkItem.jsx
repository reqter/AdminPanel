import React from "react";
import { NavLink  } from "react-router-dom";
import { useLocale } from "../../../../../../hooks";

const LinkItem = ({ link }) => {
  const { appLocale, t, currentLang } = useLocale();
  const icon = `linkIcon icon-${link.icon}`;
  return (
      <NavLink  to={link.path} className="linkItem" activeClassName="linkItemSelected">
      <div className="navIcon">
        <i className={icon} />
      </div>
      <div className="linkBody">
        <span className="linkText">{t(link.name)}</span>
        <span className="linkTextDesc">{t(link.desc)}</span>
      </div>
      </NavLink>
  );
};

export default LinkItem;
