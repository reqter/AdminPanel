import React, { useState } from "react";
import { Link } from "react-router-dom";
import { languageManager, useGlobalState } from "./../../services";
import { login } from "./../../Api/account-api";
import "./styles.scss";

const Login = (...props) => {
  const [{}, dispatch] = useGlobalState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  function handleEmailChanged(e) {
    setUserName(e.target.value);
  }
  function handlePasswordChanged(e) {
    setPassword(e.target.value);
  }
  function loginUser() {
    login()
      .onOk(result => {
        console.log(result)
        props[0].history.replace("panel");
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("LOGIN_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("LOGIN_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("LOGIN_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
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
  return (
    <div className="wrapper">
      <div className="center">
        <div className="header">
          <span className="header-title">
            {languageManager.translate("LOGIN_TITLE")}
          </span>
        </div>
        <div className="body">
          <form>
            <div className="form-group">
              <label>
                {languageManager.translate("LOGIN_EMAIL_INPUT_TITLE")}
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={languageManager.translate(
                  "LOGIN_EMAIL_INPUT_PLACEHOLDER"
                )}
                onChange={handleEmailChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                {languageManager.translate("LOGIN_EMAIL_INPUT_DESCRIPTION")}
              </small>
            </div>
            <div className="form-group">
              <label>{languageManager.translate("LOGIN_PASSWORD_INPUT")}</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder={languageManager.translate(
                  "LOGIN_PASSWORD_INPUT_PLACEHOLDER"
                )}
                onChange={handlePasswordChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                {languageManager.translate("LOGIN_PASSWORD_INPUT_DESCRIPTION")}
              </small>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-submit"
              onClick={loginUser}
            >
              {languageManager.translate("LOGIN_SUBMIT_BTN")}
            </button>
          </form>
          {/* <div className="divider">
            <Divider>{languageManager.translate("LOGIN_SOCIAL_TEXT")}</Divider>
          </div>
          <div className="social">
            <button type="button" className="btn btn-light">
              <i className="icon-google icon" />
              {languageManager.translate("LOGIN_SOCIAL_BTN_GOOGLE")}
            </button>
            <button type="button" className="btn btn-light">
              <i className="icon-github icon" />
              {languageManager.translate("LOGIN_SOCIAL_BTN_GITHUB")}
            </button>
          </div> */}
        </div>
      </div>

      <div className="signUpBox">
        <span>
          {languageManager.translate("LOGIN_SIGNUP_LINK_TITLE")}&nbsp;
        </span>
        <Link to="/signup">
          {languageManager.translate("LOGIN_SIGNUP_LINK")}
        </Link>
      </div>
    </div>
  );
};
export default Login;
