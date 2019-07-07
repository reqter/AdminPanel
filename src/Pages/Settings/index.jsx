import React, { useState, useEffect, useRef } from "react";
import Dropdown from "reactstrap/lib/Dropdown";
import DropdownItem from "reactstrap/lib/DropdownItem";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
//
import "./styles.scss";
import { useGlobalState, useLocale } from "./../../hooks";
import { Locales, Roles, ApiKeys, Webhooks } from "./contents";
import "./contentStyles.scss";
import UpsertLocale from "./modals/UpsertLocale";
import UpsertRole from "./modals/UpsertRole";
import UpsertApiKey from "./modals/UpsertApiKey";
import WebHookCreation from "./modals/WebHook";
import CustomWebhook from "./modals/CustomWebHook";

const Settings = props => {
  const { appLocale, t, currentLang } = useLocale();

  const { name: pageTitle, desc: pageDescription } = props.component;

  const [{ userInfo }, dispatch] = useGlobalState();

  const [tabContent, changeTab] = useState("locales");
  const [upsertLocalModal, toggleLocaleModal] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState();
  const [upsertRoleModal, toggleRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [webHookModal, setWebHookModal] = useState(false);
  const [customWebhookModal, setCustomWebHookModal] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState();
  const [selectedWebhook, setSelectedWebhook] = useState();

  const [upsertApiKeyModal, toggleApiKeyModal] = useState(false);
  const [newWebHookDropDown, toggleWebHookDropDown] = useState(false);

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
  function toggleCustomWebhookModal() {
    setCustomWebHookModal(prevState => !prevState);
  }
  function handleEditWebhook(webhook) {
    if (webhook.type === "custom") {
      toggleCustomWebhookModal();
    } else toggleWebHookModal();
    setSelectedWebhook(webhook);
  }
  return (
    <>
      <div className="se-wrapper">
        <div className="se-header">
          <div className="se-header-left">
            <span className="se-header-title">{t(pageTitle)}</span>
            <span className="se-header-description">{t(pageDescription)}</span>
          </div>
          <div className="se-header-right">
            {tabContent === "locales" && (
              <button
                className="btn btn-primary"
                onClick={toggleNewLocaleModal}
              >
                {t("SETTINGS_NEW_LOCALE_BTN")}
              </button>
            )}
            {tabContent === "roles" && (
              <button
                className="btn btn-primary"
                onClick={toggleUpsertRoleModal}
              >
                {t("SETTINGS_NEW_EMAIL_BTN")}
              </button>
            )}
            {tabContent === "apiKeys" && (
              <button
                className="btn btn-primary"
                onClick={toggleUpsertApiKeyModal}
              >
                Connect New App
              </button>
            )}
            {tabContent === "webHooks" && (
              <Dropdown
                isOpen={newWebHookDropDown}
                toggle={() => toggleWebHookDropDown(prevState => !prevState)}
              >
                <DropdownToggle
                  className="btn btn-primary"
                  caret
                  color="primary"
                >
                  New Webhook
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={toggleCustomWebhookModal}>
                    {t("Custom Webhook")}
                  </DropdownItem>
                  <DropdownItem onClick={toggleWebHookModal}>
                    {t("From Templates")}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              // <button className="btn btn-primary" onClick={toggleWebHookModal}>
              //   New WebHook
              // </button>
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
              {t("SETTINGS_TABS_LOCALES")}
            </div>
            <div
              className={"tabItem " + (tabContent === "roles" ? "active" : "")}
              onClick={() => toggleTab("roles")}
            >
              {t("SETTINGS_TABS_EMAILES")}
            </div>
            {/* <div
              className={
                "tabItem " + (tabContent === "apiKeys" ? "active" : "")
              }
              onClick={() => toggleTab("apiKeys")}
            >
              Connected Apps
            </div> */}
            {/* <div
              className={
                "tabItem " + (tabContent === "webHooks" ? "active" : "")
              }
              onClick={() => toggleTab("webHooks")}
            >
              Webhooks
            </div> */}
          </div>
          {tabContent === "locales" && (
            <Locales onEditLocale={handleEditLocale} />
          )}

          {tabContent === "roles" && <Roles onEditRole={handleEditRole} />}

          {tabContent === "apiKeys" && (
            <ApiKeys onEditApiKey={handleEditApiKey} />
          )}
          {tabContent === "webHooks" && (
            <Webhooks onEditWebhook={handleEditWebhook} />
          )}
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
        <WebHookCreation
          isOpen={webHookModal}
          onClose={toggleWebHookModal}
          selectedWebhook={selectedWebhook}
        />
      )}
      {customWebhookModal && (
        <CustomWebhook
          isOpen={customWebhookModal}
          onClose={toggleCustomWebhookModal}
          selectedWebhook={selectedWebhook}
        />
      )}
    </>
  );
};

export default Settings;
