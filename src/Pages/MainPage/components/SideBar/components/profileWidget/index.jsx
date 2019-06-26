import React, { useState } from "react";
import { withRouter } from "react-router";
import "./styles.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useGlobalState, useLocale } from "../../../../../../hooks";
const ProfileWidget = props => {
  const { match, location, history } = props;
  const { appLocale, t, currentLang } = useLocale();
  const [{ userInfo, isAuthenticated }, dispatch] = useGlobalState();

  const [dropDownVisibility, toggleVisibility] = useState(false);
  function toggle() {
    toggleVisibility(prevState => !prevState);
  }
  function logout() {
    dispatch({
      type: "LOGOUT",
      value: false,
    });
    history.replace("/login");
    postMessage(false);
  }
  function showProfile() {
    history.push("/panel/profile");
  }
  function showSettings() {
    history.push("/panel/settings");
  }
  function showCategories() {
    history.push("/panel/categories");
  }
  function showAssets() {
    history.push("/panel/assets");
  }
  return (
    <div className="profile-widget">
      {userInfo && userInfo.profile && userInfo.profile.avatar ? (
        <div className="userImage">
          <img src={userInfo.profile.avatar} alt="" />
        </div>
      ) : (
        <div className="left">
          <i className="icon-user" />
        </div>
      )}

      <div className="centerbox">
        {userInfo && (
          <>
            <span className="title">
              {(!userInfo.profile.first_name ||
                userInfo.profile.first_name.length === 0) &&
              (!userInfo.profile.last_name || userInfo.profile.last_name.length)
                ? "Your Name"
                : userInfo.profile.first_name +
                  " " +
                  userInfo.profile.last_name}
            </span>
            <span className="role">{userInfo.username}</span>
          </>
        )}
      </div>
      <div className="right">
        <Dropdown isOpen={dropDownVisibility} toggle={toggle}>
          <DropdownToggle className="btn btn-light btn-small">
            <i className="icon-more-h" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={showProfile}>
              {t("HOME_SIDEBAR_PROFILE_PROFILE")}
            </DropdownItem>

            <DropdownItem onClick={showAssets}>
              {t("HOME_SIDEBAR_PROFILE_LIBRARY")}
            </DropdownItem>
            <DropdownItem onClick={showCategories}>
              {t("HOME_SIDEBAR_PROFILE_CATEGORIES")}
            </DropdownItem>
            <DropdownItem onClick={showSettings}>
              {t("HOME_SIDEBAR_PROFILE_SETTINGS")}
            </DropdownItem>
            <DropdownItem onClick={logout}>
              {t("HOME_SIDEBAR_PROFILE_LOGOUT")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
export default withRouter(ProfileWidget);
