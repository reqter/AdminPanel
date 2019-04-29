import React, { useState } from "react";
import { withRouter } from "react-router";
import "./styles.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  languageManager,
  useGlobalState,
  storageManager,
} from "../../../../../../services";
const ProfileWidget = props => {
  const { match, location, history } = props;
  const [{ userInfo }, dispatch] = useGlobalState();

  const [dropDownVisibility, toggleVisibility] = useState(false);
  function toggle() {
    toggleVisibility(prevState => !prevState);
  }
  function logout() {
    storageManager.removeItem("token");
    dispatch({
      type: "SET_AUTHENTICATED",
      value: false,
    });
    history.replace("/login");
  }
  return (
    <div className="profile-widget">
      <div className="left">
        <i className="icon-user" />
      </div>

      <div className="centerbox">
        {userInfo && (
          <>
            <span className="title">
              {userInfo.firstName + " " + userInfo.lastName}
            </span>
            <span className="role">{userInfo.email}</span>
          </>
        )}
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
