import React, { useState, useEffect, useRef } from "react";

import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import { CircleSpinner } from "../../components";
import { Locales, Roles, ApiKeys } from "./contents";
import "./contentStyles.scss";
import UpsertLocale from "./modals/UpsertLocale";
import UpsertRole from "./modals/UpsertRole";
import UpsertApiKey from "./modals/UpsertApiKey";
import WebHookCreation from "./modals/WebHook";

const Settings = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;

  const [{ userInfo }, dispatch] = useGlobalState();
  const [tabContent, changeTab] = useState("locales");
  const [upsertLocalModal, toggleLocaleModal] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState();
  const [upsertRoleModal, toggleRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [webHookModal, setWebHookModal] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState();
  const [upsertApiKeyModal, toggleApiKeyModal] = useState(false);

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

  function handleEditApiKey(apiKey) {
    toggleUpsertApiKeyModal();
    setSelectedApiKey(apiKey);
  }
  function toggleUpsertApiKeyModal(result) {
    toggleApiKeyModal(prevState => !prevState);
    if (selectedApiKey) setSelectedApiKey();
    if (result) {
    }
  }
  // webhook
  function toggleWebHookModal() {
    setWebHookModal(prevState => !prevState);
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
            {tabContent === "apiKeys" && (
              <button
                className="btn btn-primary"
                onClick={toggleUpsertApiKeyModal}
              >
                New Api Key
              </button>
            )}
            {tabContent === "webHooks" && (
              <button className="btn btn-primary" onClick={toggleWebHookModal}>
                New WebHook
              </button>
            )}
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
          {tabContent === "apiKeys" && (
            <ApiKeys onEditApiKey={handleEditApiKey} />
          )}
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
        <UpsertRole
          selectedRole={selectedRole}
          isOpen={upsertRoleModal}
          onClose={toggleUpsertRoleModal}
        />
      )}
      {upsertApiKeyModal && (
        <UpsertApiKey
          selectedApiKey={selectedApiKey}
          isOpen={upsertApiKeyModal}
          onClose={toggleUpsertApiKeyModal}
        />
      )}
      {webHookModal && (
        <WebHookCreation isOpen={webHookModal} onClose={toggleWebHookModal} />
      )}
    </>
  );
};

export default Settings;
