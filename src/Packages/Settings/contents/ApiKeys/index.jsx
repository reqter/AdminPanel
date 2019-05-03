import React, { useState, useEffect, useRef } from "react";
import { useGlobalState, languageManager } from "../../../../services";
import { getApiKeys, deleteApiKey } from "../../../../Api/apiKey-api";

const currentLang = languageManager.getCurrentLanguage().name;
const ApiKeys = props => {
  const [{ apiKeys }, dispatch] = useGlobalState();

  useEffect(() => {
    getApiKeys()
      .onOk(result => {
        if (result && result.length > 0)
          dispatch({
            type: "SET_API_KEYS",
            value: result,
          });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call();
  }, []);
  function remove(apiKey) {
    deleteApiKey()
      .onOk(result => {
        dispatch({
          type: "DELETE_API_KEY",
          value: apiKey,
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(apiKey.id);
  }

  function edit(apiKey) {
    props.onEditApiKey(apiKey);
  }
  return (
    <div className="tabContents animated fadeIn faster">
      <div className="tabContent">
        <div className="tabContent-header">
          <span className="tabContent-header-title">Keys</span>
          <span className="tabContent-header-desc">
            Lorem ipsum has no many contribute
          </span>
        </div>
        <table className="table myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Client ID</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((apiKey, index) => {
              return (
                <tr key={"apiKey" + index}>
                  <td>
                    <div className="tdContent">
                      <div className="myTable-number">{index + 1}</div>
                    </div>
                  </td>
                  <td>
                    {apiKey.icon ? (
                      <div className="myTable-image">
                        <img src={apiKey.icon[currentLang]} alt="" />
                      </div>
                    ) : (
                      <div className="myTable-image-empty">empty</div>
                    )}
                  </td>
                  <td>
                    <div className="tdContent bold">{apiKey.name}</div>
                  </td>
                  <td>
                    <div className="tdContent">{apiKey.description}</div>
                  </td>
                  <td>
                    <div className="tdContent">{apiKey.category}</div>
                  </td>
                  <td>
                    <div className="tdContent">{apiKey.clientId}</div>
                  </td>
                  <td>
                    <div className="myTable-actions tdContent">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => remove(apiKey)}
                      >
                        <i className="icon-bin" />
                      </button>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => edit(apiKey)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ApiKeys;
