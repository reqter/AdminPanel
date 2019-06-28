import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalState, useLocale } from "./../../hooks";
import { signup } from "./../../Api/account-api";
import { CircleSpinner } from "./../../components";
import "./styles.scss";

const ForgotPassword = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [{}, dispatch] = useGlobalState();

  const [tab, changeTab] = useState(1);

  const [spinner, toggleSpinner] = useState(false);
  const [userName, setUserName] = useState();

  useEffect(() => {
    return () => {
      toggleSpinner(false);
    };
  }, []);

  //#region first tab
  function handleEmailChanged(e) {
    setUserName(e.target.value);
  }
  function signupUser(e) {
    e.preventDefault();
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
              message: t("LOGIN_ON_SERVER_ERROR"),
            },
          });
        })
        .onBadRequest(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("LOGIN_ON_BAD_REQUEST"),
            },
          });
        })
        .unAuthorized(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("LOGIN_UN_AUTHORIZED"),
            },
          });
        })
        .notFound(result => {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("LOGIN_NOT_FOUND"),
            },
          });
        })
        .call(userName);
    }
  }
  //#endregion first tab
  //#region second tab
  function navToLogin() {
    props.history.push(`/${currentLang}/login`);
  }
  //#endregion second tab
  return (
    <div className="wrapper">
      <div className="center">
        <div className="header">
          <span className="header-title">
            {tab === 1 && t("FORGOT_PASS_TITLE")}
            {tab === 2 && t("SIGNUP_SUCCESS_TITLE")}
          </span>
        </div>
        <div className="formBody">
          {tab === 1 && (
            <form onSubmit={signupUser}>
              <div className="message">{t("FORGOT_PASS_MESSAGE")}</div>
              <div className="form-group">
                <label>{t("LOGIN_EMAIL_INPUT_TITLE")}</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder={t("LOGIN_EMAIL_INPUT_PLACEHOLDER")}
                  onChange={handleEmailChanged}
                  autoFocus
                />
                <small id="emailHelp" className="form-text text-muted">
                  {t("LOGIN_EMAIL_INPUT_DESCRIPTION")}
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-submit"
                disabled={
                  userName === undefined || userName.length === undefined
                    ? true
                    : false
                }
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner ? t("FORGOT_PASS_SEND_EMAIL_BTN") : null}
              </button>
            </form>
          )}
          {tab === 2 && (
            <form>
              <div className="form-group">
                <label>{t("LOGIN_EMAIL_INPUT_TITLE")}</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder={t("LOGIN_EMAIL_INPUT_PLACEHOLDER")}
                  onChange={handleEmailChanged}
                />
                <small id="emailHelp" className="form-text text-muted">
                  {t("LOGIN_EMAIL_INPUT_DESCRIPTION")}
                </small>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block btn-submit"
                onClick={signupUser}
                disabled={
                  userName === undefined || userName.length === undefined
                    ? true
                    : false
                }
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner ? t("LOGIN_SUBMIT_BTN") : null}
              </button>
            </form>
          )}
          {tab === 3 && (
            <div className="signupSuccess animated fadeIn">
              <span className="welcomeMessage">
                {t("SIGNUP_SUCCESS_MESSAGE")}
              </span>
              <button
                type="button"
                className="btn btn-primary btn-block btn-submit"
                onClick={navToLogin}
              >
                {t("SIGNUP_SUCCESS_BTN")}
              </button>
            </div>
          )}
        </div>
      </div>
      {tab === 1 && (
        <div className="signUpBox">
          <span>
            {t("SIGNUP_LOGIN_LINK_TITLE")}
            &nbsp;
          </span>
          <Link to={"/" + currentLang + "/login"}>
            {t("SIGNUP_LOGIN_LINK")}
          </Link>
        </div>
      )}
    </div>
  );
};
export default ForgotPassword;
