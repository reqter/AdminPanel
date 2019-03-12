import React from "react";
import "./styles.scss";
import LinkItem from "./linkItem";
import { languageManager } from "./../../../../../../services";
const NavLinks = props => {
  return (
    <>
      <div className="sideLinksTitle">
        {languageManager.translate("HOME_NAVS_TITLE")}
      </div>
      <div className="sideLinks">
        {props.links.map(link => (
          <LinkItem link={link} key={link.path} />
        ))}
      </div>
    </>
  );
};

export default NavLinks;
