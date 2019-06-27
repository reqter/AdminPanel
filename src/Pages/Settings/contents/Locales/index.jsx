import React, { useState, useEffect, useRef } from "react";
import { setLocales } from "./../../../../Api/space-api";
import { useLocale, useGlobalState } from "./../../../../hooks";
const Locale = props => {
  const { appLocale, currentLang, t } = useLocale();
  const [{ sysLocales, spaceInfo }, dispatch] = useGlobalState();

  function getLocaleTitle(localeName, type) {
    const locale = sysLocales.find(l => l.name === localeName);
    if (locale !== undefined) return locale.title;
    return type === "name" ? "" : "none";
  }
  function removeLocale(locale) {
    const s_copy = { ...spaceInfo };
    const r = s_copy.locales.filter(l => l.locale !== locale.locale);
    s_copy["locales"] = r;

    setLocales()
      .onOk(result => {
        dispatch({
          type: "SET_LOCALES",
          value: s_copy["locales"],
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(spaceInfo.id, r);
  }
  function editLocale(locale) {
    props.onEditLocale(locale);
  }
  return (
    <div className="tabContents animated fadeIn faster">
      <div className="tabContent">
        <div className="tabContent-header">
          <span className="tabContent-header-title">
            {t("SETTINGS_LOCALES_CONTENT_TITLE")}
          </span>
          <span className="tabContent-header-desc">
            {t("SETTINGS_LOCALES_CONTENT_DESC")}
          </span>
        </div>
        <table className="table myTable">
          <thead className="myTable-header">
            <tr>
              <th>#</th>
              <th>{t("SETTINGS_LOCALES_CONTENT_TABLE_ICON")}</th>
              <th>{t("SETTINGS_LOCALES_CONTENT_TABLE_NAME")}</th>
              <th>{t("SETTINGS_LOCALES_CONTENT_TABLE_TITLE")}</th>
              <th>{t("SETTINGS_LOCALES_CONTENT_TABLE_FALLBACK")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {spaceInfo &&
              spaceInfo.locales &&
              spaceInfo.locales.map((locale, index) => (
                <tr key={locale.locale}>
                  <td>
                    <div className="myTable-number">{index + 1}</div>
                  </td>
                  <td>
                    {getLocaleTitle(locale.locale, "name")}
                    {locale.default === true && (
                      <span className="defaultLang">Default</span>
                    )}
                  </td>
                  <td>{getLocaleTitle(locale.fallback, "fallback")}</td>
                  <td>{locale.inResponce === true ? "Enabled" : "Disabled"}</td>
                  <td>{locale.editable === true ? "Enabled" : "Disabled"}</td>
                  <td>
                    {locale.requiredFields === true
                      ? "Content is required"
                      : "Not required"}
                  </td>
                  <td>
                    <div className="myTable-actions">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => editLocale(locale)}
                      >
                        Edit
                      </button>
                      {(locale.default === undefined ||
                        locale.default === false) && (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => removeLocale(locale)}
                        >
                          <i className="icon-bin" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Locale;
