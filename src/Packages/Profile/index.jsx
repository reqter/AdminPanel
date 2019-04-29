import React, { useState, useEffect, useRef } from "react";

import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import { CircleSpinner } from "../../components";
import { uploadAssetFile } from "./../../Api/asset-api";
import { updateProfile } from "./../../Api/account-api";

import UpdatePassword from "./modals/updatePassword";

const Categories = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;
  const currentLang = languageManager.getCurrentLanguage().name;

  const [{ userInfo }, dispatch] = useGlobalState();
  const [updatePasswordModal, toggleUpdatePassModal] = useState(false);

  const [currentBox, setCurrentBox] = useState(1);
  const [isUploading, toggleIsUploading] = useState(false);
  const [notification, toggleNotification] = useState(
    userInfo ? userInfo.notification : true
  );
  const [firstName, setFirstName] = useState(
    userInfo ? userInfo.first_name : ""
  );
  const [lastName, setLastName] = useState(userInfo ? userInfo.last_name : "");
  const [avatar, setAvatar] = useState(
    userInfo
      ? userInfo.avatar
      : "http://arunoommen.com/wp-content/uploads/2017/01/man-2_icon-icons.com_55041.png"
  );

  useEffect(() => {
    if (userInfo) {
      const { firstName, lastName, avatar } = userInfo;
      setFirstName(firstName);
      setLastName(lastName);
      setAvatar(
        avatar
          ? avatar
          : "http://arunoommen.com/wp-content/uploads/2017/01/man-2_icon-icons.com_55041.png"
      );
    }
  }, [userInfo]);

  function showBoxContent(num) {
    if (num !== currentBox) setCurrentBox(num);
  }
  function handleFirstName(e) {
    setFirstName(e.target.value);
    submitUserInfo("firstName", e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
    submitUserInfo("lastName", e.target.value);
  }
  function handleNotification(e) {
    toggleNotification(e.target.checked);
    submitUserInfo("notification", e.target.checked);
  }
  function submitUserInfo(key, value) {
    let u = { ...userInfo };
    u[key] = value;
    dispatch({
      type: "SET_USERINFO",
      value: u,
    });
  }
  function handleImageBrowsed(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      toggleIsUploading(true);
      uploadAssetFile()
        .onOk(result => {
          const { file } = result;
          toggleIsUploading(false);
          submitUserInfo(
            "avatar",
            process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL + file.url
          );
          updateProfileInfo();
        })
        .onServerError(result => {})
        .onBadRequest(result => {})
        .unAuthorized(result => {})
        .onProgress(result => {
          //setPercentage(result);
        })
        .call(file);
    }
  }
  function showUpdatePassModal() {
    toggleUpdatePassModal(true);
  }
  function handleCloseUpdatePass(result) {
    toggleUpdatePassModal(false);
  }
  function updateProfileInfo() {
    updateProfile()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .call();
  }

  return (
    <>
      <div className="pro-wrapper">
        <div className="pro-header">
          <div className="pro-header-left">
            <span className="pro-header-title">{pageTitle}</span>
            <span className="pro-header-description">{pageDescription}</span>
          </div>
          <div className="pro-header-right" />
        </div>
        <div className="pro-content">
          <div className="pro-box">
            <div
              className={
                "pro-box-header " + (currentBox !== 1 ? "hoverBox" : "")
              }
              onClick={() => showBoxContent(1)}
            >
              Personal Info
            </div>
            {currentBox === 1 && (
              <div className="pro-box-content animated fadeIn">
                <label>Avatar</label>
                <div className="pro-box-content-upload">
                  <div className="uploadAvatar">
                    {isUploading && (
                      <div className="uploadingSpinner">
                        <CircleSpinner show={true} size="medium" />
                      </div>
                    )}
                    <div className="avatarImage">
                      <img src={avatar} alt="" />
                    </div>
                  </div>
                  <div className="uploadDropZone">
                    <div className="dropText">
                      Drop your file here
                      <div className="dropLink">
                        <span> or Browse</span>
                        <input type="file" onChange={handleImageBrowsed} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uploadInfo">
                  <bold> Some tips</bold>: Use a photo or image rather than text
                  and upload an image that is 132px square or larger.
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                  <small className="form-text text-muted">
                    Enter your first name
                  </small>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="last name"
                    value={lastName}
                    onChange={handleLastName}
                  />
                  <small className="form-text text-muted">
                    Enter your last name
                  </small>
                </div>
              </div>
            )}
          </div>
          <div className="pro-box">
            <div
              className={
                "pro-box-header " + (currentBox !== 2 ? "hoverBox" : "")
              }
              onClick={() => showBoxContent(2)}
            >
              Login
            </div>
            {currentBox === 2 && (
              <>
                <div className="pro-box-content">
                  <div className="text-switch">
                    <div className="left-text">
                      <span className="left-text-title">Emails</span>
                      <span className="left-text-description">
                        Verify your email to better protect your account. It
                        will be used for account-related notifications and
                        sign-in.
                      </span>
                    </div>
                    <div className="right-switch">
                      <button type="button" className="btn btn-primary btn-sm">
                        Update your email
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pro-box-content">
                  <div className="text-switch">
                    <div className="left-text">
                      <span className="left-text-title">Password</span>
                      <span className="left-text-description">
                        Secure your GitBook account with a strong and unique
                        password.
                      </span>
                    </div>
                    <div className="right-switch">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={showUpdatePassModal}
                      >
                        Update password
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="pro-box">
            <div
              className={
                "pro-box-header " + (currentBox !== 3 ? "hoverBox" : "")
              }
              onClick={() => showBoxContent(3)}
            >
              Notifications
            </div>
            {currentBox === 3 && (
              <div className="pro-box-content">
                <label for="notify" className="text-switch">
                  <div className="left-text">
                    <span className="left-text-title">Emails</span>
                    <span className="left-text-description">
                      Receive email notifications for comments, activities.
                    </span>
                  </div>
                  <div className="right-switch">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="primary"
                        onChange={handleNotification}
                        checked={notification}
                        id="notify"
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      {updatePasswordModal && (
        <UpdatePassword
          isOpen={updatePasswordModal}
          onClose={handleCloseUpdatePass}
        />
      )}
    </>
  );
};

export default Categories;
