import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { languageManager } from "./../../services";
import "./styles.scss";

const Signup = (...props) => {
  // const [visibility, setVisibility] = useState(0);
  // function signIn() {
  //   setVisibility({ visibility: true });
  // }
  return (
    <div className="wrapper">
      <div className="center">
        <div className="header">
          <span className="header-title">
            {languageManager.translate("SIGNUP_TITLE")}
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
                id="exampleInputPassword1"
                placeholder={languageManager.translate(
                  "LOGIN_PASSWORD_INPUT_PLACEHOLDER"
                )}
              />
              <small id="emailHelp" className="form-text text-muted">
                {languageManager.translate("LOGIN_PASSWORD_INPUT_DESCRIPTION")}
              </small>
            </div>
            <div className="form-group">
              <label>
                {languageManager.translate("SIGNUP_CONFIRM_PASSWORD_INPUT")}
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder={languageManager.translate(
                  "SIGNUP_CONFIRM_PASSWORD_INPUT_PLACEHOLDER"
                )}
              />
              <small id="emailHelp" className="form-text text-muted">
                {languageManager.translate("SIGNUP_CONFIRM_PASSWORD_INPUT_DESCRIPTION")}
              </small>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-submit">
              {languageManager.translate("LOGIN_SUBMIT_BTN")}
            </button>
          </form>
          {/*<div className="divider">
            <Divider>{languageManager.translate("LOGIN_SOCIAL_TEXT")}</Divider>
          </div>
           <div className="social">
            <button type="button" className="btn btn-light">
              <i className="icon-google icon"></i>
              {languageManager.translate("LOGIN_SOCIAL_BTN_GOOGLE")}
            </button>
            <button type="button" className="btn btn-light">
              <i className="icon-github icon"></i>
              {languageManager.translate("LOGIN_SOCIAL_BTN_GITHUB")}
            </button>
          </div> */}
        </div>
      </div>

      <div className="signUpBox">
        <span>
          {languageManager.translate("SIGNUP_LOGIN_LINK_TITLE")}&nbsp;
        </span>
        <Link to="/login"> {languageManager.translate("SIGNUP_LOGIN_LINK")}</Link>
      </div>
    </div>
  );
};
export default memo(Signup);
