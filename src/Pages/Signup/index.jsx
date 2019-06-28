import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState, useLocale } from "./../../hooks";
import { signup } from "./../../Api/account-api";
import { CircleSpinner } from "./../../components";
import "./styles.scss";

const Signup = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [{}, dispatch] = useGlobalState();
  const [tab, changeTab] = useState(1);

  const [spinner, toggleSpinner] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPass, setRepeatPassword] = useState();
  const [secTabContent, setSecTabContent] = useState({
    type: "creatingSpace",
    title: t("SIGNUP_CREATING_TITLE"),
    message: t("SIGNUP_CREATING_MESSAGE"),
  });

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
  function signupUser(e) {
    e.preventDefault();
    changeTab(2);
    if (!spinner) {
      toggleSpinner(true);
      signup()
        .onOk(result => {
          setTimeout(() => {
            setSecTabContent({
              type: "success",
              title: t("SIGNUP_SUCCESS_TITLE"),
              message: t("SIGNUP_SUCCESS_MESSAGE"),
            });
          }, 100);
        })
        .onServerError(result => {
          toggleSpinner(false);
          setSecTabContent({
            type: "error",
            title: t("SIGNUP_ERROR_TITLE"),
            message: t("SIGNUP_ON_SERVER_ERROR"),
          });
        })
        .onBadRequest(result => {
          toggleSpinner(false);
          setSecTabContent({
            type: "error",
            title: t("SIGNUP_ERROR_TITLE"),
            message: t("SIGNUP_BAD_REQUEST"),
          });
        })
        .unAuthorized(result => {
          toggleSpinner(false);
          setSecTabContent({
            type: "error",
            title: t("SIGNUP_ERROR_TITLE"),
            message: t("SIGNUP_UN_AUTHORIZED"),
          });
        })
        .notFound(result => {
          toggleSpinner(false);
          setSecTabContent({
            type: "error",
            title: t("SIGNUP_ERROR_TITLE"),
            message: t("SIGNUP_NOT_FOUND"),
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
  function backToSignup(e) {
    e.preventDefault();
    changeTab(1);
    setSecTabContent({
      type: "creatingSpace",
      title: t("SIGNUP_CREATING_TITLE"),
      message: t("SIGNUP_CREATING_MESSAGE"),
    });
  }
  //#endregion second tab
  return (
    <div className="wrapper">
      <div className="center signUp-center">
        <div className="header">
          <span className="header-title">
            {tab === 1 && t("SIGNUP_TITLE")}
            {/* {tab === 2 && secTabContent.title} */}
            {tab === 2 && "Signup Success"}
          </span>
        </div>
        <div className="formBody">
          {tab === 1 && (
            <form onSubmit={signupUser}>
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
              <div className="form-group">
                <label>{t("LOGIN_PASSWORD_INPUT")}</label>
                <input
                  type="password"
                  className="form-control"
                  id="passInput"
                  placeholder={t("LOGIN_PASSWORD_INPUT_PLACEHOLDER")}
                  onChange={handlePasswordChanged}
                />
                <small id="emailHelp" className="form-text text-muted">
                  {t("LOGIN_PASSWORD_INPUT_DESCRIPTION")}
                </small>
              </div>
              <div className="form-group">
                <label>{t("SIGNUP_CONFIRM_PASSWORD_INPUT")}</label>
                <input
                  type="password"
                  className="form-control"
                  id="reapPassInput"
                  placeholder={t("SIGNUP_CONFIRM_PASSWORD_INPUT_PLACEHOLDER")}
                  onChange={handleRepPasswordChanged}
                />
                <small id="emailHelp" className="form-text text-muted">
                  {t("SIGNUP_CONFIRM_PASSWORD_INPUT_DESCRIPTION")}
                </small>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-submit"
                disabled={
                  repeatPass === undefined ||
                  password === undefined ||
                  repeatPass !== password
                    ? true
                    : false
                }
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner ? t("SIGNUP_SUBMIT_BTN") : null}
              </button>
            </form>
          )}
          {tab === 2 && (
            <div className="signupSuccess animated fadeIn">
              {secTabContent.type === "success" && (
                <>
                  <span className="welcomeMessage">
                    {/* {secTabContent.message} */}
                  </span>
                  <div className="succssIcon animated fadeIn">
                    <i className="icon-empty-box-open " />
                    {secTabContent.message}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-submit"
                    onClick={navToLogin}
                  >
                    {t("SIGNUP_SUCCESS_BTN")}
                  </button>
                </>
              )}
              {secTabContent.type === "error" && (
                <>
                  <div className="succssIcon">
                    <i
                      className="icon-empty-box-open "
                      style={{ color: "red" }}
                    />
                    {secTabContent.message}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={backToSignup}
                  >
                    Return to sign up
                  </button>
                </>
              )}
              {secTabContent.type === "creatingSpace" && (
                <div className="creatingSpace">
                  <CircleSpinner show={true} size="large" />
                  <span className="welcomeMessage">
                    {secTabContent.message}
                  </span>
                </div>
              )}
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
export default Signup;
