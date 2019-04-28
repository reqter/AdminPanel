import React, { useState } from "react";
import { withRouter } from "react-router";
import "./styles.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { languageManager } from "../../../../../../services";
const ProfileWidget = props => {
  const { match, location, history } = props;
  const [dropDownVisibility, toggleVisibility] = useState(false);
  function toggle() {
    toggleVisibility(prevState => !prevState);
  }
  function logout() {
    localStorage.removeItem("token");
    history.replace("/login");
  }
  return (
    <div className="profile-widget">
      <div className="left">
        <i className="icon-user" />
      </div>
      <div className="centerbox">
        <span className="title">Saeed Padyab</span>
        <span className="role">payabsaeed@gmail.com</span>
      </div>
      <div className="right">
        <Dropdown isOpen={dropDownVisibility} toggle={toggle}>
          <DropdownToggle className="btn btn-light btn-small">
            <i className="icon-more-h" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              {languageManager.translate("HOME_SIDEBAR_PROFILE_PROFILE")}
            </DropdownItem>
            <DropdownItem>
              {languageManager.translate("HOME_SIDEBAR_PROFILE_SETTINGS")}
            </DropdownItem>
            <DropdownItem onClick={logout}>
              {languageManager.translate("HOME_SIDEBAR_PROFILE_LOGOUT")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
export default withRouter(ProfileWidget);
