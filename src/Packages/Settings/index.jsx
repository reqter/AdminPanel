import React, { useState, useEffect, useRef } from "react";

import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import { CircleSpinner } from "../../components";
import { Locales, Roles } from "./contents";
import "./contentStyles.scss";
import UpsertLocale from "./modals/UpsertLocale";
import UpsertRole from "./modals/UpsertRole";

const Settings = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;

  const [{ userInfo }, dispatch] = useGlobalState();
  const [tabContent, changeTab] = useState("locales");
  const [upsertLocalModal, toggleLocaleModal] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState();
  const [upsertRoleModal, toggleRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  function toggleTab(tabName) {
    changeTab(tabName);
  }
  function toggleNewLocaleModal(result) {
    toggleLocaleModal(prevState => !prevState);
    if (selectedLocale) setSelectedLocale();

    if (result) {
      setSelectedLocale();
    }
  }
  function handleEditLocale(locale) {
    toggleNewLocaleModal();
    setSelectedLocale(locale);
  }

  function toggleUpsertRoleModal(result) {
    toggleRoleModal(prevState => !prevState);
    if (selectedRole) setSelectedRole();
    if (result) {
    }
  }
  function handleEditRole(role) {
    toggleUpsertRoleModal();
    setSelectedRole(role);
  }
  return (
    <>
      <div className="se-wrapper">
        <div className="se-header">
          <div className="se-header-left">
            <span className="se-header-title">{pageTitle}</span>
            <span className="se-header-description">{pageDescription}</span>
          </div>
          <div className="se-header-right">
            {tabContent === "locales" && (
              <button
                className="btn btn-primary"
                onClick={toggleNewLocaleModal}
              >
                New Locale
              </button>
            )}
            {tabContent === "roles" && (
              <button
                className="btn btn-primary"
                onClick={toggleUpsertRoleModal}
              >
                New Role
              </button>
            )}
            {/* {tabContent === "apiKeys" && <div className="tabContent" />}
            {tabContent === "webHooks" && <div className="tabContent" />} */}
          </div>
        </div>
        <div className="se-content">
          <div className="tabs">
            <div
              className={
                "tabItem " + (tabContent === "locales" ? "active" : "")
              }
              onClick={() => toggleTab("locales")}
            >
              Locales
            </div>
            <div
              className={"tabItem " + (tabContent === "roles" ? "active" : "")}
              onClick={() => toggleTab("roles")}
            >
              Roles
            </div>
            <div
              className={
                "tabItem " + (tabContent === "apiKeys" ? "active" : "")
              }
              onClick={() => toggleTab("apiKeys")}
            >
              Api Keys
            </div>
            <div
              className={
                "tabItem " + (tabContent === "webHooks" ? "active" : "")
              }
              onClick={() => toggleTab("webHooks")}
            >
              Web Hooks
            </div>
          </div>
          {tabContent === "locales" && (
            <Locales onEditLocale={handleEditLocale} />
          )}
          {tabContent === "roles" && <Roles onEditRole={handleEditRole} />}
          {tabContent === "apiKeys" && <div className="tabContent" />}
          {tabContent === "webHooks" && <div className="tabContent" />}
        </div>
      </div>
      {upsertLocalModal && (
        <UpsertLocale
          selectedLocale={selectedLocale}
          isOpen={upsertLocalModal}
          onClose={toggleNewLocaleModal}
        />
      )}
      {upsertRoleModal && (
        <UpsertRole isOpen={upsertRoleModal} onClose={toggleUpsertRoleModal} />
      )}
    </>
  );
};

export default Settings;
