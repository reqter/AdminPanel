import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import {
  getUsers,
  getRoles,
  filterUsers,
  activateUser,
  deactiveUser,
  assignRoles,
  deleteUser,
} from "./../../Api/userManagement-api";
import { AssignRole, Alert } from "./../../components";

const Users = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ users, spaceInfo }, dispatch] = useGlobalState();

  const { name: pageTitle, desc: pageDescription } = props.component;
  const [selectedRole, setRole] = useState({});
  const [selectedStatus, setStatus] = useState();
  const [assignRoleModal, toggleAssignRoleModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [alertData, setAlertData] = useState();

  useEffect(() => {
    if (spaceInfo) {
      const { roles } = spaceInfo;
      if (roles) setRoles(roles);
    }
  }, [spaceInfo]);
  useEffect(() => {
    // getRoles()
    //   .onOk(result => {
    //     setRoles(result);
    //   })
    //   .onServerError(result => {
    //     dispatch({
    //       type: "ADD_NOTIFY",
    //       value: {
    //         type: "error",
    //         message: languageManager.translate("USERS_ROLES_ON_SERVER_ERROR"),
    //       },
    //     });
    //   })
    //   .onBadRequest(result => {
    //     dispatch({
    //       type: "ADD_NOTIFY",
    //       value: {
    //         type: "error",
    //         message: languageManager.translate("USERS_ROLES_ON_BAD_REQUEST"),
    //       },
    //     });
    //   })
    //   .unAuthorized(result => {
    //     dispatch({
    //       type: "ADD_NOTIFY",
    //       value: {
    //         type: "warning",
    //         message: languageManager.translate("USERS_ROLES_UN_AUTHORIZED"),
    //       },
    //     });
    //   })
    //   .notFound(result => {})
    //   .call();

    getUsers()
      .onOk(result => {
        dispatch({
          type: "SET_USERS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call();
  }, []);

  function translate(key) {
    return languageManager.translate(key);
  }
  function doFilter(role, status) {
    filterUsers()
      .onOk(result => {
        dispatch({
          type: "SET_USERS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call(role, status);
  }
  function handleRoleSelected(selected) {
    setRole(selected);
    doFilter(selected.name, selectedStatus);
  }
  function handleStatusSelected(status) {
    setStatus(status);
    doFilter(selectedRole.name, status);
  }

  function activate(item) {
    activateUser()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("USERS_ACTIVE_ON_OK"),
          },
        });
        dispatch({
          type: "SET_USERS",
          value: result,
        });
        doFilter(selectedRole.name, selectedStatus);
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ACTIVE_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_ACTIVE_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_ACTIVE_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_ACTIVE_NOT_FOUND"),
          },
        });
      })
      .call(item);
  }
  function deactivate(item) {
    deactiveUser()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("USERS_DEACTIVE_ON_OK"),
          },
        });
        dispatch({
          type: "SET_USERS",
          value: result,
        });
        doFilter(selectedRole.name, selectedStatus);
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "USERS_DEACTIVE_ON_SERVER_ERROR"
            ),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("USERS_DEACTIVE_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DEACTIVE_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("USERS_DEACTIVE_NOT_FOUND"),
          },
        });
      })
      .call(item);
  }

  function resetFilters() {
    setStatus();
    setRole({});
    doFilter(undefined, undefined);
  }
  function addNewUser() {
    props.history.push("/users/new");
  }
  function updateUser(user) {
    props.history.push("/users/edit/" + user.id);
  }
  function removeUser(user) {
    setAlertData({
      type: "error",
      title: "Remove User",
      message: "Are you sure to remove?",
      isAjaxCall: true,
      okTitle: "Remove",
      cancelTitle: "Don't remove",
      onOk: () =>
        deleteUser()
          .onOk(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate("User deleted successfullu"),
              },
            });
            dispatch({
              type: "DELETE_USER",
              value: user,
            });
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "USERS_ASSIGN_ROLE_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "USERS_ASSIGN_ROLE_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "USERS_ASSIGN_ROLE_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "USERS_ASSIGN_ROLE_NOT_FOUND"
                ),
              },
            });
          })
          .call(user),
      onCancel: () => {
        setAlertData();
      },
    });
  }
  function openAssignRoleModal(user) {
    setSelectedUser(user);
    toggleAssignRoleModal(true);
  }
  function closeAssignRoleModal(result) {
    toggleAssignRoleModal(false);
    if (result) {
      assignRoles()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("USERS_ASSIGN_ROLE_ON_OK"),
            },
          });
          dispatch({
            type: "SET_USERS",
            value: result,
          });
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "USERS_ASSIGN_ROLE_ON_SERVER_ERROR"
              ),
            },
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "USERS_ASSIGN_ROLE_ON_BAD_REQUEST"
              ),
            },
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "USERS_ASSIGN_ROLE_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("USERS_ASSIGN_ROLE_NOT_FOUND"),
            },
          });
        })
        .call(selectedUser.id, result);
    }
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
              <button className="btn btn-primary" onClick={addNewUser}>
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
                      selectedRole.name === undefined
                        ? "rgb(56,132,255)"
                        : "black",
                  }}
                >
                  <i className="icon icon-file-text-o" />
                  <span className="name">
                    {languageManager.translate("USERS_FILTER_BY_ROLE_ALL")}
                  </span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display:
                        selectedRole.name === undefined ? "block" : "none",
                    }}
                  />
                </div>
                {roles.map(f => (
                  <div
                    className="filter"
                    key={f.name}
                    onClick={() => handleRoleSelected(f)}
                    style={{
                      color:
                        f.name === selectedRole.name
                          ? "rgb(56,132,255)"
                          : "black",
                    }}
                  >
                    <i className="icon icon-file-text-o" />
                    <span className="name">{f.title[currentLang]}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display:
                          f.name === selectedRole.name ? "block" : "none",
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
                      selectedStatus === undefined
                        ? "rgb(56,132,255)"
                        : "black",
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">
                    {translate("USERS_FILTER_BY_STATUS_ALL")}
                  </span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === undefined ? "block" : "none",
                    }}
                  />
                </div>
                <div
                  className="filter"
                  onClick={() => handleStatusSelected(true)}
                  style={{
                    color:
                      selectedStatus === true ? "rgb(56,132,255)" : "black",
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">{translate("active")}</span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === true ? "block" : "none",
                    }}
                  />
                </div>
                <div
                  className="filter"
                  onClick={() => handleStatusSelected(false)}
                  style={{
                    color:
                      selectedStatus === false ? "rgb(56,132,255)" : "black",
                  }}
                >
                  <i className="icon icon-shield" />
                  <span className="name">{translate("inactive")}</span>
                  <span
                    className="icon-circle-o iconSelected"
                    style={{
                      display: selectedStatus === false ? "block" : "none",
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
                    <th>{translate("USERS_TABLE_HEAD_USERNAME")}</th>
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
                          {user.profile && user.profile.avatar ? (
                            <img src={user.profile.avatar} alt="" />
                          ) : (
                            <div className="as-table-image-empty">No Image</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="as-table-name">
                          <span className="name">{user.userName}</span>
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="users-table-roles">
                          {user.roles &&
                            user.roles.map(role => (
                              <span className="badge badge-light">
                                {role.title[currentLang]}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td>
                        <div className="as-table-status">
                          <span className="adge badge-primary">
                            {user.status === true
                              ? languageManager.translate("active")
                              : languageManager.translate("inactive")}
                          </span>
                        </div>
                      </td>

                      <td>
                        {user.status && user.status === true ? (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => deactivate(user)}
                          >
                            {translate("USERS_TABLE_DEACTIVATE_BTN")}
                          </button>
                        ) : (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => activate(user)}
                          >
                            {translate("USERS_TABLE_ACTIVATE_BTN")}
                          </button>
                        )}
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => openAssignRoleModal(user)}
                        >
                          {translate("USERS_TABLE_ASSIGN_ROLE_BTN")}
                        </button>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => updateUser(user)}
                        >
                          {translate("Edit")}
                        </button>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => removeUser(user)}
                        >
                          <i className="icon-bin" />
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
      {assignRoleModal && (
        <AssignRole
          isOpen={assignRoleModal}
          onClose={closeAssignRoleModal}
          headerTitle={languageManager.translate("USERS_ROLES_MODAL_TITLE")}
          roles={selectedUser ? selectedUser.roles : []}
        />
      )}
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Users;
