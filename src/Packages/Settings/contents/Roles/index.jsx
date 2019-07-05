import React, { useState, useEffect, useRef } from "react";
import { useGlobalState } from "../../../../services";
import { updateSpace } from "./../../../../Api/space-api";
import { languageManager } from "../../../../services";
const currentLang = languageManager.getCurrentLanguage().name;
const Locale = props => {
  const [{ spaceInfo }, dispatch] = useGlobalState();

  function removeRole(role) {
    const s_copy = { ...spaceInfo };
    const r = s_copy.roles.filter(r => r.name !== role.name);
    s_copy["roles"] = r;
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
  function editRole(role) {
    props.onEditRole(role);
  }
  return (
    <div className="tabContents animated fadeIn faster">
      <div className="tabContent">
        <div className="tabContent-header">
          <span className="tabContent-header-title">Roles</span>
          <span className="tabContent-header-desc">
            Lorem ipsum has no many contribute
          </span>
        </div>
        <table className="table myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Title</th>
              <th>Permissions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {spaceInfo &&
              spaceInfo.roles &&
              spaceInfo.roles.map((role, index) => (
                <tr>
                  <td>
                    <div className="myTable-number">{index + 1}</div>
                  </td>
                  <td>{role.name}</td>
                  <td>{role.title[currentLang]}</td>
                  <td>
                    <span className="badge badge-primary">
                      {role.allowEdit === true && role.readOnly === true
                        ? "Read/Write"
                        : role.allowEdit === true
                        ? "Only Write"
                        : "Read Only"}
                    </span>
                  </td>
                  <td>
                    <div className="myTable-actions">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => removeRole(role)}
                      >
                        <i className="icon-bin" />
                      </button>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => editRole(role)}
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
