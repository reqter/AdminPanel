import React from "react";
import "./styles.scss";
import ProfileWidget from "./components/profileWidget";
import SideLinks from "./components/SideLinks";
import { languageManager, useGlobalState } from "./../../../../services";
const SideBar = props => {
  const [{ projectInfo }, dispatch] = useGlobalState();
  return (
    <div className="sideBar">
      <div className="top">
        <i className="icon-logo icon" />
        <span className="title">{projectInfo.name}</span>
      </div>
      <ProfileWidget />
      <SideLinks links={props.links} />
      <div className="sideBar-info">
        <div className="sideBar-info-left">
          <a href="#about">{languageManager.translate("HOME_SIDEAR_ABOUT")}</a>
          <a href="#about">{languageManager.translate("HOME_SIDEBAR_BLOG")}</a>
        </div>
        <div className="sideBar-info-right">
          <a href="#about">
            {languageManager.translate("HOME_SIDEBAR_DOCUMENT")}
          </a>
        </div>
      </div>
      {/* <span className="copyRight">
        {languageManager.translate("HOME_COPY_RIGHT")}
      </span> */}
    </div>
  );
};
export default SideBar;
