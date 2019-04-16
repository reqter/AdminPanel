import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import { AssetFile } from "./../../components";
import { deleteAsset, filterAssets } from "./../../Api/asset-api";
import {
  getUsers,
  getRoles,
  filterUsers,
  deleteUser,
  activeUser,
  deactiveUser
} from "./../../Api/userManagement-api";

const Users = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ users }, dispatch] = useGlobalState();

  const { name: pageTitle, desc: pageDescription } = props.component;
  const [selectedFileType, setFileType] = useState({});
  const [selectedStatus, setStatus] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles()
      .onOk(result => {
        setRoles(result);
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ROLES_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ROLES_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_ROLES_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {})
      .call();

    getUsers()
      .onOk(result => {
        dispatch({
          type: "SET_USERS",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {})
      .call();
  }, []);

  function translate(key) {
    return languageManager.translate(key);
  }
  function getTypeFilters(item) {
    return {
      all: item.name === "all" ? true : false,
      image: item.name === "image" ? true : false,
      video: item.name === "video" ? true : false,
      audio: item.name === "audio" ? true : false,
      pdf: item.name === "pdf" ? true : false,
      spreadsheet: item.name === "spreadsheet" ? true : false
    };
  }
  function handleFileTypeClick(selected) {
    setFileType(selected);
    const typeFilters = getTypeFilters(selected);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_GET_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {})
      .call(
        typeFilters.all,
        typeFilters.image,
        typeFilters.video,
        typeFilters.audio,
        typeFilters.pdf,
        typeFilters.spreadsheet,
        selectedStatus.name
      );
  }
  function handleStatusClick(selected) {
    setStatus(selected);
    const typeFilters = getTypeFilters(selectedFileType);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_GET_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {})
      .call(
        typeFilters.all,
        typeFilters.image,
        typeFilters.video,
        typeFilters.audio,
        typeFilters.pdf,
        typeFilters.spreadsheet,
        selected.name
      );
  }
  function openUploader() {
    props.history.push("/addAsset");
  }
  function editUser(file) {
    props.history.push(`/editAsset/${file.sys.id}`);
  }
  function removeUser(item) {
    deleteAsset()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("ASSET_DELETE_ON_OK")
          }
        });
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_DELETE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_DELETE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_DELETE_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_DELETE_NOT_FOUND")
          }
        });
      })
      .call(item);
  }
  function active(file) {
    activeUser()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }
  function deactive(file) {
    deactiveUser()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }

  return (
    <>
      <div className="as-wrapper">
        <div className="as-header">
          <div className="as-header-left">
            <span className="as-header-title">{pageTitle}</span>
            <span className="as-header-description">{pageDescription}</span>
          </div>
          <div className="as-header-right" />
        </div>
        <div className="as-content">
          <div className="as-content-left">
            <div className="left-text">{translate("USERS_FILTER_TITLE")}</div>
            <div className="left-btnContent">
              <button className="btn btn-primary" onClick={openUploader}>
                {translate("USERS_FILTER_BTN_TEXT")}
              </button>
            </div>
            <div className="filterContent">
              <div className="left-filters">
                <div className="title">{translate("USERS_FILTER_BY_ROLE")}</div>
                {roles.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleFileTypeClick(f)}
                    style={{
                      color:
                        f.id === selectedFileType.id
                          ? "rgb(56,132,255)"
                          : "black"
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{f.name[currentLang]}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display: f.id === selectedFileType.id ? "block" : "none"
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="left-filters">
                <div className="title">
                  {translate("USERS_FILTER_BY_STATUS_TITLE")}
                </div>
                <div
                  className="filter"
                  onClick={() => handleStatusClick("active")}
                  style={{
                    color:
                      selectedStatus === "active" ? "rgb(56,132,255)" : "black"
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">{translate("active")}</span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === "active" ? "block" : "none"
                    }}
                  />
                </div>
                <div
                  className="filter"
                  onClick={() => handleStatusClick("deactive")}
                  style={{
                    color:
                      selectedStatus === "deactive"
                        ? "rgb(56,132,255)"
                        : "black"
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">{translate("deactive")}</span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === "deactive" ? "block" : "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="as-content-right">
            <div className="header">
              {translate("USERS_TABLE_HEADER_TITLE")}
            </div>
            <div className="rightTable">
              <table className="table">
                <thead className="table__head">
                  <tr>
                    <th>#</th>
                    <th>{translate("USERS_TABLE_HEAD_IMAGE")}</th>
                    <th>{translate("USERS_TABLE_HEAD_FULLNAME")}</th>
                    <th>{translate("USERS_TABLE_HEAD_ROLES")}</th>
                    <th>{translate("USERS_TABLE_HEAD_STATUS")}</th>
                    <th>{translate("USERS_TABLE_HEAD_ACTIONS")}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <div className="as-table-number">
                          <div className="as-table-number-value">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-image">
                          <img src={user.image} alt="" />
                        </div>
                      </td>
                      <td>
                        <div className="as-table-name">
                          <span className="name">
                            {user.firstName + " " + user.lastName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="users-table-roles">
                          {user.roles &&
                            user.roles.map(role => (
                              <span className="badge badge-light">
                                {role.name[currentLang]}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td>
                        <div className="as-table-status">
                          <span className="adge badge-primary">
                            {languageManager.translate(user.status)}
                          </span>
                        </div>
                      </td>

                      <td>
                        {user.status === "active" ? (
                          <button className="btn btn-light">
                            {translate("deactive")}
                          </button>
                        ) : (
                          <button className="btn btn-light">
                            {translate("active")}
                          </button>
                        )}
                        <button
                          className="btn btn-light"
                          onClick={() => removeUser(user)}
                        >
                          <i className="icon-bin" />
                        </button>
                        <button
                          className="btn btn-light"
                          onClick={() => editUser(user)}
                        >
                          <i className="icon-pencil" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
