import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "../../services";
import { addUser, updateUser, getUserById } from "../../Api/userManagement-api";
import String from "../../components/String";

const fields = [
  {
    id: "1",
    name: "userName",
    title: {
      en: "UserName",
      fa: "نام کاربری",
    },
    description: {
      en: "Username is required",
      fa: "نام کاربری الزامی می باشد",
    },
    type: "string",
    isRequired: true,
  },
  {
    id: "2",
    name: "password",
    title: {
      en: "Password",
      fa: "رمز عبور",
    },
    description: {
      en: "Password is required",
      fa: "رمز عبور الزامی می باشد",
    },
    type: "string",
    appearance: "password",
  },
];

const UpsertFile = props => {
  const [{}, dispatch] = useGlobalState();
  // variables
  const [updateMode, toggleUpdateMode] = useState();
  const [tab, changeTab] = useState(); // tab1 ; form , tab2 : errors
  const [error, setError] = useState();
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [isFormValid, toggleIsValidForm] = useState();

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      if (props.match.params.id.length > 0) {
        getUserInfoById(props.match.params.id);
        toggleUpdateMode(true);
      } else {
        const obj = {
          type: "wrongUrl",
          message: languageManager.translate("Url is wrong to open edit page"),
        };
        // url is wrong
        changeTab(2);
        setError(obj);
      }
    } else {
      // creation mode
      toggleUpdateMode(false);
      changeTab(1);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (Object.keys(form).length > 0 && checkFormValidation()) {
      toggleIsValidForm(true);
    } else toggleIsValidForm(false);
  }, [formValidation]);

  function checkFormValidation() {
    for (const key in formValidation) {
      if (formValidation[key] === false) return false;
    }
    return true;
  }

  // methods
  function getUserInfoById(id) {
    getUserById()
      .onOk(result => {
        changeTab(1);
        setFormData(result);
        setForm(result);
      })
      .onServerError(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          message: languageManager.translate(
            "UPSERT_ASSET_GET_BY_ID_ON_SERVER_ERROR"
          ),
        };
        changeTab(2);
        setError(obj);
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ASSET_GET_BY_ID_ON_BAD_REQUEST"
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
              "UPSERT_ASSET_GET_BY_ID_UN_AUTHORIZED"
            ),
          },
        });
      })
      .notFound(result => {
        const obj = {
          type: "NOT_FOUND",
          message: languageManager.translate(
            "Selected user has not found , it maybe has remvoed please try with valid user"
          ),
        };
        changeTab(2);
        setError(obj);
      })
      .call(id);
  }
  function setNameToFormValidation(name, value) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        [name]: value,
        ...prevFormValidation,
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    // check validation
    const { name: key } = field;

    // add value to form
    setForm(prevState => ({
      ...prevState,
      [field.name]: value,
    }));

    setFormValidation(prevFormValidation => ({
      ...prevFormValidation,
      [key]: isValid,
    }));
  }

  function backToUsers() {
    props.history.push("/panel/users");
  }

  function upsertItem(closePage) {
    if (updateMode) {
      updateUser()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ASSET_UPDATE_ON_OK"),
            },
          });
          if (closePage) {
            backToUsers();
          } else {
            setFormData({});
            setFormValidation();
          }
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ASSET_UPDATE_ON_SERVER_ERROR"
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
                "UPSERT_ASSET_UPDATE_ON_BAD_REQUEST"
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
                "UPSERT_ASSET_UPDATE_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ASSET_UPDATE_NOT_FOUND"
              ),
            },
          });
        })
        .call(form);
    } else {
      const obj = {
        id: Math.random(),
        userName: form["userName"],
        password: form["password"],
        status: false,
      };

      addUser()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ASSET_ADD_ON_OK"),
            },
          });
          if (closePage) {
            backToUsers();
          } else {
            setFormData({});
            setForm({});
            const newObj = { ...formValidation };
            setFormValidation(newObj);
          }
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ASSET_ADD_ON_SERVER_ERROR"
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
                "UPSERT_ASSET_ADD_ON_BAD_REQUEST"
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
                "UPSERT_ASSET_ADD_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("UPSERT_ASSET_ADD_NOT_FOUND"),
            },
          });
        })
        .call(obj);
    }
  }
  function refreshCurrentPage() {
    window.location.reload();
  }
  return (
    <div className="up-file-wrapper">
      <div className="up-file-header">
        <button className="btn btn-light" onClick={backToUsers}>
          <i className="icon-arrow-left2" />
          {languageManager.translate("BACK")}
        </button>
        <div className="tabItems">
          <div className="item active">
            {updateMode
              ? `1.${languageManager.translate("Update User")}`
              : `1.${languageManager.translate("Add New User")}`}
          </div>
        </div>
      </div>
      <div className="up-file-content">
        <main>
          {tab === 1 && (
            <>
              <div className="up-file-content-title">
                {updateMode
                  ? languageManager.translate("Update User")
                  : languageManager.translate("Add New User")}
              </div>
              <div className="up-file-formInputs animated fadeIn">
                <String
                  field={fields[0]}
                  formData={formData}
                  init={setNameToFormValidation}
                  onChangeValue={handleOnChangeValue}
                />
                <String
                  field={fields[1]}
                  formData={formData}
                  init={setNameToFormValidation}
                  onChangeValue={handleOnChangeValue}
                />
                <div className="upf-actions">
                  {!updateMode && (
                    <button
                      className="btn btn-primary"
                      onClick={() => upsertItem(false)}
                      disabled={!isFormValid}
                    >
                      Save & New
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => upsertItem(true)}
                    disabled={!isFormValid}
                  >
                    {updateMode ? "Update & Close" : "Save & Close"}
                  </button>
                </div>
              </div>
            </>
          )}
          {tab === 2 && (
            <div className="up-file-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error.message}</div>
              <div className="actions">
                <button className="btn btn-light" onClick={refreshCurrentPage}>
                  {languageManager.translate(
                    "UPSERT_ASSET_ERROR_BOX_REFRESH_BTN"
                  )}
                </button>
                <button
                  className="btn btn-light"
                  onClick={backToUsers}
                  style={{ marginLeft: 10 }}
                >
                  {languageManager.translate("Users")}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UpsertFile;
