import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import { deleteAsset } from "./../../Api/asset-api";
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
  const [selectedRole, setRole] = useState({});
  const [selectedStatus, setStatus] = useState();
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
  function doFilter(roleId, status) {
    filterUsers()
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
      .call(roleId, status);
  }
  function handleRoleSelected(selected) {
    setRole(selected);
    doFilter(selected.id, selectedStatus);
  }
  function handleStatusSelected(status) {
    setStatus(status);
    doFilter(selectedRole.id, status);
  }
  function openUploader() {
    props.history.push("/users/new");
  }
  function editUser(user) {
    props.history.push(`/users/edit/${user.id}`);
  }
  function removeUser(item) {
    deleteUser()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("USERS_DELETE_ON_OK")
          }
        });
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
            message: languageManager.translate("USERS_DELETE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_DELETE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DELETE_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DELETE_NOT_FOUND")
          }
        });
      })
      .call(item);
  }
  function active(item) {
    activeUser()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("USERS_ACTIVE_ON_OK")
          }
        });
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
            message: languageManager.translate("USERS_ACTIVE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ACTIVE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_ACTIVE_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_ACTIVE_NOT_FOUND")
          }
        });
      })
      .call(item);
  }
  function deactive(item) {
    deactiveUser()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("USERS_DEACTIVE_ON_OK")
          }
        });
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
            message: languageManager.translate("USERS_DEACTIVE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_DEACTIVE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DEACTIVE_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DEACTIVE_NOT_FOUND")
          }
        });
      })
      .call(item);
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
                <div
                  className="filter"
                  onClick={() => handleRoleSelected({})}
                  style={{
                    color:
                      selectedRole.id === undefined
                        ? "rgb(56,132,255)"
                        : "black"
                  }}
                >
                  <i className="icon icon-file-text-o" />
                  <span className="name">
                    {languageManager.translate("USERS_FILTER_BY_ROLE_ALL")}
                  </span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedRole.id === undefined ? "block" : "none"
                    }}
                  />
                </div>
                {roles.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleRoleSelected(f)}
                    style={{
                      color:
                        f.id === selectedRole.id ? "rgb(56,132,255)" : "black"
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{f.name[currentLang]}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display: f.id === selectedRole.id ? "block" : "none"
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
                  onClick={() => handleStatusSelected()}
                  style={{
                    color:
                      selectedStatus === undefined ? "rgb(56,132,255)" : "black"
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">
                    {translate("USERS_FILTER_BY_STATUS_ALL")}
                  </span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === undefined ? "block" : "none"
                    }}
                  />
                </div>
                <div
                  className="filter"
                  onClick={() => handleStatusSelected("active")}
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
                  onClick={() => handleStatusSelected("deactive")}
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
                          {user.image && user.image.length > 0 ? (
                            <img src={user.image[0][currentLang]} alt="" />
                          ) : (
                            <div className="as-table-image-empty">No Image</div>
                          )}
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
                          <button
                            className="btn btn-light"
                            onClick={() => deactive(user)}
                          >
                            {translate("deactive")}
                          </button>
                        ) : (
                          <button
                            className="btn btn-light"
                            onClick={() => active(user)}
                          >
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
