import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import {
  getUserById,
  addUser,
  updateUser
} from "./../../Api/userManagement-api";
import {
  String,
  Number,
  DateTime,
  Location,
  Media,
  Boolean,
  KeyValue,
  RichText,
  FileUploader
} from "./../../components";

const fields = [
  {
    id: "1",
    name: "firstName",
    title: {
      en: "First Name",
      fa: "نام"
    },
    description: {
      en: "Enter your first name",
      fa: "نام خود را وارد کنید"
    },
    type: "string",
    isRequired: true
  },
  {
    id: "2",
    name: "lastName",
    title: {
      en: "Last Name",
      fa: "نام خانوادگی"
    },
    description: {
      en: "Enter your last name",
      fa: "نام خانوادگی خود را وارد کنید"
    },
    type: "string",
    isRequired: true
  },
  {
    id: "3",
    name: "userName",
    title: {
      en: "UserName",
      fa: "نام کاربری"
    },
    description: {
      en: "Choose a valid username",
      fa: "نام کاربری خود را انتخاب کنید"
    },
    type: "string",
    isRequired: true
  },
  {
    id: "4",
    name: "image",
    title: {
      fa: "عکس",
      en: "Your image"
    },
    description: {
      fa: "",
      en: "Choose an image as profile "
    },
    type: "media",
    mediaType: "image",
    
  }
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
        getUserItemById(props.match.params.id);
        toggleUpdateMode(true);
      } else {
        const obj = {
          type: "wrongUrl",
          message: languageManager.translate("UPSERT_ASSET_WRONG_URL")
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
  }, [form]);

  // methods
  function checkFormValidation() {
    for (const key in formValidation) {
      if (formValidation[key] === false) return false;
    }
    return true;
  }
  function getUserItemById(id) {
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
            "UPSERT_USER_GET_BY_ID_ON_SERVER_ERROR"
          )
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
              "UPSERT_USER_GET_BY_ID_ON_BAD_REQUEST"
            )
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate(
              "UPSERT_USER_GET_BY_ID_UN_AUTHORIZED"
            )
          }
        });
      })
      .notFound(result => {
        const obj = {
          type: "NOT_FOUND",
          message: languageManager.translate("UPSERT_USER_GET_BY_ID_NOT_FOUND")
        };
        changeTab(2);
        setError(obj);
      })
      .call(id);
  }
  function setNameToFormValidation(name) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        [name]: false,
        ...prevFormValidation
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    const { name: key } = field;
    if (value !== undefined) {
      // add value to form
      setForm(prevState => ({
        ...prevState,
        [field.name]: value
      }));
    }
    // check validation

    if (isValid) {
      setFormValidation(prevFormValidation => ({
        ...prevFormValidation,
        [key]: true
      }));
    } else {
      setFormValidation(prevFormValidation => ({
        ...prevFormValidation,
        [key]: false
      }));
    }
  }

  function getFieldItem(field) {
    switch (field.type.toLowerCase()) {
      case "string":
        return (
          <String
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "number":
        return (
          <Number
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "datetime":
        return (
          <DateTime
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "location":
        return (
          <Location
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "media":
        return (
          <Media
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "fileuploader":
        return (
          <FileUploader
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "boolean":
        return (
          <Boolean
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "keyvalue":
        return (
          <KeyValue
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "richtext":
        return (
          <RichText
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      default:
        break;
    }
  }
  function backToAssets() {
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
              message: languageManager.translate("UPSERT_USER_UPDATE_ON_OK")
            }
          });
          backToAssets();
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_USER_UPDATE_ON_SERVER_ERROR"
              )
            }
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_USER_UPDATE_ON_BAD_REQUEST"
              )
            }
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_USER_UPDATE_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("UPSERT_USER_UPDATE_NOT_FOUND")
            }
          });
        })
        .call(form);
    } else {
      const obj = {
        id: Math.random().toString(),
        fisrtName: form.fisrtName,
        lastName: form.lastName,
        userName: form.userName,
        status: "active",
        image: form.image
      };
      addUser()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_USER_ADD_ON_OK")
            }
          });
          if (closePage) {
            backToAssets();
          } else {
            setFormData({});
            setForm({});
            let n_obj = {};
            for (const key in formValidation) {
              n_obj[key] = false;
            }
            setFormValidation(n_obj);
          }
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_USER_ADD_ON_SERVER_ERROR"
              )
            }
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_USER_ADD_ON_BAD_REQUEST"
              )
            }
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_USER_ADD_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("UPSERT_USER_ADD_NOT_FOUND")
            }
          });
        })
        .call(obj);
    }
  }
  function refreshCurrentPage() {
    window.location.reload();
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToAssets}>
          <i className="icon-arrow-left2" />
          {languageManager.translate("BACK")}
        </button>
        <div className="tabItems">
          <div className="item active">
            {languageManager.translate("UPSERT_ASSET_HEADER_TITLE")}
          </div>
        </div>
      </div>
      <div className="up-content">
        <main>
          {tab === 1 && (
            <>
              <div className="up-content-title">
                {updateMode
                  ? languageManager.translate("UPSERT_USER_HEADER_EDIT_TITLE")
                  : languageManager.translate("UPSERT_USER_HEADER_ADD_TITLE")}
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields.map(field => (
                  <div key={field.id} className="rowItem">
                    {getFieldItem(field)}
                  </div>
                ))}
                <div className="actions">
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
            <div className="up-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error.message}</div>
              <div className="actions">
                <button className="btn btn-light" onClick={refreshCurrentPage}>
                  {languageManager.translate(
                    "UPSERT_ASSET_ERROR_BOX_REFRESH_BTN"
                  )}
                </button>
                <button className="btn btn-light" onClick={backToAssets}>
                  {languageManager.translate(
                    "UPSERT_ASSET_ERROR_BOX_MEDIA_BTN"
                  )}
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
