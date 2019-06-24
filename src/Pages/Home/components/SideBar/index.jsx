import React from "react";
import "./styles.scss";
import ProfileWidget from "./components/profileWidget";
import SideLinks from "./components/SideLinks";

const SideBar = props => {
  return (
    <div className="sideBar">
      <div className="top">
        <i className="icon-logo icon" />
        <span className="title">REQTER</span>
      </div>
      <ProfileWidget />
      <SideLinks links={props.links} />
    </div>
  );
};
export default SideBar;
