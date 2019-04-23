import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { languageManager, useGlobalState } from "./../../services";
import { signup } from "./../../Api/account-api";
import { CircleSpinner } from "./../../components";
import "./styles.scss";

const Signup = props => {
  const [{}, dispatch] = useGlobalState();
  const [tab, changeTab] = useState(1);

  const [spinner, toggleSpinner] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPass, setRepeatPassword] = useState();

  useEffect(() => {
    return () => {
      toggleSpinner(false);
    };
  }, []);

  //#region first tab
  function handleEmailChanged(e) {
    setUserName(e.target.value);
  }
  function handlePasswordChanged(e) {
    setPassword(e.target.value);
  }
  function handleRepPasswordChanged(e) {
    setRepeatPassword(e.target.value);
  }
  function signupUser() {
    if (!spinner) {
      toggleSpinner(true);
      setTimeout(() => {
        toggleSpinner(false);
        changeTab(2);
      }, 1000);
      return;
      signup()
        .onOk(result => {
          changeTab(2);
        })
        .onServerError(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("LOGIN_ON_SERVER_ERROR"),
            },
          });
        })
        .onBadRequest(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("LOGIN_ON_BAD_REQUEST"),
            },
          });
        })
        .unAuthorized(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("LOGIN_UN_AUTHORIZED"),
            },
          });
        })
        .notFound(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("LOGIN_NOT_FOUND"),
            },
          });
        })
        .call(userName, password);
    }
  }
  //#endregion first tab
  //#region second tab
  function navToLogin() {
    props.history.push("login");
  }
  //#endregion second tab
  return (
    <div className="wrapper">
      <div className="center">
        <div className="header">
          <span className="header-title">
            {tab === 1 && languageManager.translate("SIGNUP_TITLE")}
            {tab === 2 && languageManager.translate("SIGNUP_SUCCESS_TITLE")}
          </span>
        </div>
        <div className="formBody">
          {tab === 1 && (
            <form>
              <div className="form-group">
                <label>
                  {languageManager.translate("LOGIN_EMAIL_INPUT_TITLE")}
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder={languageManager.translate(
                    "LOGIN_EMAIL_INPUT_PLACEHOLDER"
                  )}
                  onChange={handleEmailChanged}
                  autoFocus
                />
                <small id="emailHelp" className="form-text text-muted">
                  {languageManager.translate("LOGIN_EMAIL_INPUT_DESCRIPTION")}
                </small>
              </div>
              <div className="form-group">
                <label>
                  {languageManager.translate("LOGIN_PASSWORD_INPUT")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passInput"
                  placeholder={languageManager.translate(
                    "LOGIN_PASSWORD_INPUT_PLACEHOLDER"
                  )}
                  onChange={handlePasswordChanged}
                />
                <small id="emailHelp" className="form-text text-muted">
                  {languageManager.translate(
                    "LOGIN_PASSWORD_INPUT_DESCRIPTION"
                  )}
                </small>
              </div>
              <div className="form-group">
                <label>
                  {languageManager.translate("SIGNUP_CONFIRM_PASSWORD_INPUT")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="reapPassInput"
                  placeholder={languageManager.translate(
                    "SIGNUP_CONFIRM_PASSWORD_INPUT_PLACEHOLDER"
                  )}
                  onChange={handleRepPasswordChanged}
                />
                <small id="emailHelp" className="form-text text-muted">
                  {languageManager.translate(
                    "SIGNUP_CONFIRM_PASSWORD_INPUT_DESCRIPTION"
                  )}
                </small>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block btn-submit"
                onClick={signupUser}
                disabled={
                  repeatPass === undefined ||
                  password === undefined ||
                  repeatPass !== password
                    ? true
                    : false
                }
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner
                  ? languageManager.translate("LOGIN_SUBMIT_BTN")
                  : null}
              </button>
            </form>
          )}
          {tab === 2 && (
            <div className="signupSuccess animated fadeIn">
              <span className="welcomeMessage">
                {languageManager.translate("SIGNUP_SUCCESS_MESSAGE")}
              </span>
              <button
                type="button"
                className="btn btn-primary btn-block btn-submit"
                onClick={navToLogin}
              >
                {languageManager.translate("SIGNUP_SUCCESS_BTN")}
              </button>
            </div>
          )}
        </div>
      </div>
      {tab === 1 && (
        <div className="signUpBox">
          <span>
            {languageManager.translate("SIGNUP_LOGIN_LINK_TITLE")}
            &nbsp;
          </span>
          <Link to="/login">
            {languageManager.translate("SIGNUP_LOGIN_LINK")}
          </Link>
        </div>
      )}
    </div>
  );
};
export default Signup;
