import React, { useState, useEffect, useRef } from "react";
import { useGlobalState } from "../../../../services";
import { updateSpace } from "./../../../../Api/space-api";
const Locale = props => {
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
    dispatch({
      type: "SET_SPACEINFO",
      value: s_copy,
    });
    updateSpace()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call();
  }
  function editLocale(locale) {
    props.onEditLocale(locale);
  }
  return (
    <div className="tabContents animated fadeIn faster">
      <div className="tabContent">
        <div className="tabContent-header">
          <span className="tabContent-header-title">Locales</span>
          <span className="tabContent-header-desc">
            Lorem ipsum has no many contribute
          </span>
        </div>
        <table className="table myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Locale</th>
              <th>Fallback</th>
              <th>Inc.in responce</th>
              <th>Editing</th>
              <th>Required Fields</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {spaceInfo &&
              spaceInfo.locales &&
              spaceInfo.locales.map((locale, index) => (
                <tr key={locale.name}>
                  <td>
                    <div className="myTable-number">{index + 1}</div>
                  </td>
                  <td>{getLocaleTitle(locale.locale, "name")}</td>
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
                        onClick={() => removeLocale(locale)}
                      >
                        <i className="icon-bin" />
                      </button>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => editLocale(locale)}
                      >
                        Edit
                      </button>
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
