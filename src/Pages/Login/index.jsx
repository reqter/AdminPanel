import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
//
import { login } from "./../../Api/account-api";
//
import { CircleSpinner } from "./../../components";
import "./styles.scss";
import { useGlobalState,useCookie, useLocale } from "./../../hooks";

const Login = props => {
  const [{},dispatch]=useGlobalState()
  const { appLocale, t, currentLang } = useLocale();
  const [token, setToken] = useCookie("reqter_token");
  const [spinner, toggleSpinner] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  function handleEmailChanged(e) {
    setUserName(e.target.value);
  }
  function handlePasswordChanged(e) {
    setPassword(e.target.value);
  }

  function handleLoginUser(e) {
    e.preventDefault();
    if (!spinner) {
      toggleSpinner(true);
      login()
        .onOk(result => {
          toggleSpinner(false);
          try {
            setToken(result.access_token);
            dispatch({
              type: "SET_AUTHENTICATED",
              value: true,
            });
            setRedirectToReferrer(true);
          } catch (error) {
            console.log(error);
          }
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
              message: result.error ? result.error : t("LOGIN_NOT_FOUND"),
            },
          });
        })
        .call(userName, password);
    }
  }
  useEffect(() => {
    if (redirectToReferrer) {
      props.history.replace(
        !props.location.state
          ? "/" + currentLang
          : props.location.state.from.pathname
      );
    }
    return () => {
      toggleSpinner(false);
    };
  }, [redirectToReferrer]);

  return (
    <div className="wrapper">
      <div className="center">
        <div className="header">
          <span className="header-title">{t("LOGIN_TITLE")}</span>
        </div>
        <div className="formBody">
          <form id="loginForm" onSubmit={handleLoginUser}>
            <div className="form-group">
              <label>{t("LOGIN_EMAIL_INPUT_TITLE")}</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder={t("LOGIN_EMAIL_INPUT_PLACEHOLDER")}
                onChange={handleEmailChanged}
                autoFocus
              />
              <small className="form-text text-muted">
                {t("LOGIN_EMAIL_INPUT_DESCRIPTION")}
              </small>
            </div>
            <div className="form-group">
              <label>{t("LOGIN_PASSWORD_INPUT")}</label>
              <input
                type="password"
                className="form-control"
                placeholder={t("LOGIN_PASSWORD_INPUT_PLACEHOLDER")}
                onChange={handlePasswordChanged}
              />
              <small className="form-text text-muted">
                {t("LOGIN_PASSWORD_INPUT_DESCRIPTION")}
              </small>
            </div>
            <Link to={"/" + currentLang + "/forgotPassword"}>
              {t("LOGIN_FORGOT_PASS")}
            </Link>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-submit"
              form="loginForm"
              disabled={
                userName === undefined ||
                password === undefined ||
                userName.length === 0 ||
                password.length === 0
                  ? true
                  : false
              }
            >
              <CircleSpinner show={spinner} size="small" />
              {!spinner ? t("LOGIN_SUBMIT_BTN") : null}
            </button>
          </form>
        </div>
      </div>

      <div className="signUpBox">
        <span>{t("LOGIN_SIGNUP_LINK_TITLE")}&nbsp;</span>
        <Link to={"/" + currentLang + "/signup"}>{t("LOGIN_SIGNUP_LINK")}</Link>
      </div>
    </div>
  );
};
export default Login
