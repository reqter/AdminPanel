import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  languageManager,
  useGlobalState,
  storageManager,
  utility,
} from "../../services";
import { useLocale } from "./../../hooks";
import {
  getRequestDetail,
  submitRequest,
} from "./../../Api/content-delivery-api";
import { getUserInfo } from "./../../Api/account-api";
import {
  NotFound,
  Wrong,
  Success,
} from "../../components/Commons/ErrorsComponent";
import {
  String,
  Number,
  DateTime,
  Location,
  Boolean,
  KeyValue,
  RichText,
  Reference,
  CircleSpinner,
  JsonObject,
  AdvanceUploader,
  DateFormater,
} from "./../../components";

const userDetailFields = [
  {
    id: "1",
    name: "___email",
    title: {
      en: "Email",
      fa: "ایمیل",
    },
    description: {
      en: "Email is required",
    },
    type: "string",
    appearance: "email",
    isRequired: true,
  },
  {
    id: "2",
    name: "___fullName",
    title: {
      en: "Full Name",
      fa: "نام و نام خانوادگی",
    },
    description: {
      en: "Full name is optional",
    },
    type: "string",
    isRequired: true,
  },
  {
    id: "3",
    name: "___phoneNumber",
    title: {
      en: "Phone Number",
    },
    description: {
      en: "Phone Number is required",
    },
    type: "number",
  },
  {
    id: "4",
    name: "___city",
    title: {
      en: "City",
    },
    description: {
      en: "Choose your city",
    },
    type: "keyValue",
    options: [
      { value: "Tehran", selected: true },
      { value: "Esfahan", selected: true },
    ],
  },
];

const MarketPlace_upsertRequest = props => {
  const { appLocale, currentLang } = useLocale();

  const viewMode = false;
  const updateMode = false;

  const [{ spaceInfo }, dispatch] = useGlobalState();

  const [tab, changeTab] = useState(1);
  const [currentBox, setCurrentBox] = useState("form");

  const [item, setItem] = useState();
  const [userInfo, setUserInfo] = useState();
  const [spinner, toggleSpinner] = useState(true);

  const [categoryModal, toggleCategoryModal] = useState(false);
  const [category, setCategory] = useState();
  const [contentType, setContentType] = useState();
  const [fields, setFields] = useState();

  // it will get value editing time
  const [selectedContent, setSelectedContent] = useState();

  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [error, setError] = useState(false);
  const [isValidForm, toggleIsValidForm] = useState(false);

  const [newContentTypeBox, toggleNewContentTypeBox] = useState(false);
  const [submitSpinner, toggleSubmitSpinner] = useState(false);
  const [urgent, toggleUrgent] = useState(false);

  useEffect(() => {
    const { params } = props.match;
    if (!params.id) {
      const obj = {
        type: "WRONG_URL",
        title: "Wrong Url!",
        message: "Url is wrong.It has not request id",
      };
      setError(obj);
      toggleSpinner(false);
    } else {
      // const token = storageManager.getItem("token");
      // if (token) fetchUserInfo();
      getItemById(params.id);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (Object.keys(form).length > 0 && checkFormValidation()) {
      toggleIsValidForm(true);
    } else toggleIsValidForm(false);
  }, [formValidation, category]);

  // methods
  function checkFormValidation() {
    for (const key in formValidation) {
      if (formValidation[key] === false) return false;
    }
    return true;
  }

  function fetchUserInfo() {
    getUserInfo()
      .onOk(result => {
        // if (result.profile && result.profile.avatar) {
        //   result.profile.avatar =
        //     process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL +
        //     result.profile.avatar;
        // }
        setUserInfo(result);
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .onRequestError(result => {})
      .unKnownError(result => {})
      .call();
  }
  useEffect(() => {
    if (item) {
      let f = [];
      if (
        !item.settings ||
        !item.settings.userFields ||
        item.settings.userFields.length === 0
      ) {
        if (item.contentType) {
          f = item.contentType.fields;
        }
      } else {
        for (let i = 0; i < item.contentType.fields.length; i++) {
          const field = item.contentType.fields[i];
          for (let j = 0; j < item.settings.userFields.length; j++) {
            const userField = item.settings.userFields[j];
            if (field.name === userField) {
              f.push(field);
              break;
            }
          }
        }
      }
      setFields(f.sort((a, b) => a.index - b.index));
    }
  }, [item]);
  function getItemById(link) {
    getRequestDetail()
      .onOk(res => {
        const result = res.data
          ? res.data.request
            ? res.data.request
            : undefined
          : undefined;
        if (result) {
          if (!result.contentType) {
            const obj = {
              type: "CONTENT_TYPE",
              title: "Not Found!",
              message: "There is not content type for this content.",
            };
            setError(obj);
          } else {
            dispatch({
              type: "SET_SPACEINFO",
              value: { id: result.sys.spaceId },
            });
            setItem(result);
            //setContentType(result.contentType);

            // if (result.contentType.categorization === true)
            //   setCategory(result.category);
            setError();
          }
        } else {
          const obj = {
            type: "CONTENT_TYPE",
            title: "Not Found!",
            message: "Request not found.",
          };
          setError(obj);
        }
        toggleSpinner(false);
      })
      .onServerError(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          title: "Server Error!",
          message: "Internal server error.",
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onBadRequest(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          title: "Bad Request",
          message: languageManager.translate("Bad Request"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unAuthorized(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(""),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .notFound(() => {
        const obj = {
          type: "NOT_FOUND",
          title: "Not Found!",
          message: languageManager.translate("Request not found."),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onRequestError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          title: "Request error",
          message: languageManager.translate(
            "There is an error like connection error."
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unKnownError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          title: "Error has occured",
          message: languageManager.translate(
            "There is an error in your request"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .call(currentLang, link, false);
  }
  function getFieldItem(field) {
    switch (field.type.toLowerCase()) {
      case "string":
        return (
          <String
            viewMode={viewMode}
            updateMode={updateMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "number":
        return (
          <Number
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "datetime":
        return (
          <DateTime
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "location":
        return (
          <Location
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "media":
        return (
          <AdvanceUploader
            viewMode={viewMode}
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "boolean":
        return (
          <Boolean
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "keyvalue":
        return (
          <KeyValue
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "richtext":
        return (
          <RichText
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "reference":
        return (
          <Reference
            viewMode={viewMode}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "jsonobject":
        return (
          <JsonObject
            viewMode={viewMode}
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
  function setNameToFormValidation(name, value) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        ...prevFormValidation,
        [name]: value,
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    const { name: key } = field;
    // add value to form
    const f = { ...form, [key]: value };
    setForm(f);
    setFormValidation(prevFormValidation => ({
      ...prevFormValidation,
      [key]: isValid,
    }));
  }

  function showProfile() {
    props.history.push("/panel/profile");
  }
  function backToContent() {
    changeTab(1);
  }
  function handleSubmitMore() {
    props.history.push("/market");
  }
  function handleReuqestType(e) {
    toggleUrgent(e.target.value === "true" ? true : false);
  }
  function upsertContent(closePage) {
    if (!submitSpinner) {
      if (tab === 1 && item.settings && item.settings.userDetail === true) {
        changeTab(2);
      } else {
        submit(closePage);
      }
    }
  }
  function submit() {
    toggleSubmitSpinner(true);
    let obj = {
      fields: form,
      request: props.match.params.id,
    };
    if (item.settings && item.settings.userDetail === true) {
      delete obj["fields"]["___email"];
      delete obj["fields"]["___fullname"];
      delete obj["fields"]["___phonenumber"];
      delete obj["fields"]["___city"];
      obj["userinfo"] = {
        email: form["___email"],
        fullname: form["___fullName"],
        phonenumber: form["___phoneNumber"],
        city: form["___city"],
        urgent: urgent,
      };
    }
    submitRequest()
      .onOk(result => {
        setCurrentBox("successBox");
        setFormData({});
        setForm({});
        setFormValidation({});
      })
      .onServerError(result => {
        toggleSubmitSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ITEM_ADD_ON_SERVER_ERROR"
            ),
          },
        });
      })
      .onBadRequest(result => {
        toggleSubmitSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ITEM_ADD_ON_BAD_REQUEST"
            ),
          },
        });
      })
      .unAuthorized(result => {
        toggleSubmitSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("UPSERT_ITEM_ADD_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        toggleSubmitSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("UPSERT_ITEM_ADD_NOT_FOUND"),
          },
        });
      })
      .call(obj);
  }

  return spinner ? (
    <div className="loaderBox">
      <div className="loader" />
      Loading ...
    </div>
  ) : (
    <div className="up_r">
      <div className="up_r--body">
        {error ? (
          <div className="up_r--error">
            <div>
              {error.type === "CONTENT_TYPE" || error.type === "NOT_FOUND" ? (
                <NotFound />
              ) : (
                <Wrong />
              )}
            </div>
            <div>{error.type === "WRONG_URL" && <Wrong />}</div>
            <span className="up_r--error-title">{error.title}</span>
            <span className="up_r--error-msg">{error.message}</span>
          </div>
        ) : (
          <div className="up_r-form">
            <div className="formContent">
              {currentBox === "successBox" && (
                <div className="successRequest animated fadeIn">
                  <Success />
                  <span className="title">
                    {appLocale["REQUEST_SUBMIT_SUCCESS_TITLE"]}
                  </span>
                  <span className="successMsg">
                    {appLocale["REQUEST_SUBMIT_SUCCESS_MESSAGE"]}
                  </span>
                  <div className="successBox-actions">
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitMore}
                    >
                      {appLocale["REQUEST_SUBMIT_SUCCESS_BTN"]}
                    </button>
                  </div>
                </div>
              )}
              {currentBox === "form" && (
                <>
                  <div className="content-userInfo">
                    <div className="userImage">
                      {item && item.thumbnail && item.thumbnail.length > 0 && (
                        <img src={item.thumbnail[0][currentLang]} alt="" />
                      )}
                    </div>
                    <div className="info">
                      <span>
                        {item && item.title && item.title[currentLang] && (
                          <strong>{item.title[currentLang]} </strong>
                        )}
                      </span>
                      {item &&
                        item.description &&
                        item.description[currentLang] && (
                          <span>{item.description[currentLang]} </span>
                        )}
                    </div>
                    <div className="requestDate" />
                  </div>
                  <div className="content-inputs" style={{ marginTop: 20 }}>
                    <div style={{ display: tab === 1 ? "block" : "none" }}>
                      {fields &&
                        fields.map(field => (
                          <div key={field.id} className="rowItem">
                            {getFieldItem(field)}
                          </div>
                        ))}
                    </div>
                    <div style={{ display: tab === 2 ? "block" : "none" }}>
                      <div className="content__userinfo">
                        <div className="content__userinfo__icon">
                          <i className="icon-request" />
                        </div>
                        <span>{appLocale["REQUEST_USERINFO_TITLE"]}</span>
                      </div>
                      <div className="row animated fadeIn">
                        <div className="col">
                          <String
                            viewMode={viewMode}
                            updateMode={updateMode}
                            field={userDetailFields[1]}
                            formData={formData}
                            init={setNameToFormValidation}
                            onChangeValue={handleOnChangeValue}
                          />
                        </div>
                        <div className="col">
                          <String
                            viewMode={viewMode}
                            updateMode={updateMode}
                            field={userDetailFields[0]}
                            formData={formData}
                            init={setNameToFormValidation}
                            onChangeValue={handleOnChangeValue}
                          />
                        </div>
                      </div>
                      <div className="row animated fadeIn">
                        <div className="col">
                          <Number
                            viewMode={viewMode}
                            updateMode={updateMode}
                            field={userDetailFields[2]}
                            formData={formData}
                            init={setNameToFormValidation}
                            onChangeValue={handleOnChangeValue}
                          />
                        </div>
                        <div className="col">
                          <KeyValue
                            viewMode={viewMode}
                            updateMode={updateMode}
                            field={userDetailFields[3]}
                            formData={formData}
                            init={setNameToFormValidation}
                            onChangeValue={handleOnChangeValue}
                          />
                        </div>
                      </div>
                      <div className="custom_checkbox ">
                        <div className="left">
                          <label className="radio">
                            <input
                              type="radio"
                              value="false"
                              checked={urgent === false}
                              name="requestType"
                              onChange={handleReuqestType}
                              id="requestTypeNormal"
                            />
                            <span className="checkround" />
                          </label>
                        </div>
                        <div className="right">
                          <label htmlFor="requestTypeNormal">
                            {appLocale["REQUEST_USERINFO_REQUEST_NORMAL"]}
                          </label>
                          <label htmlFor="requestTypeNormal">
                            {appLocale["REQUEST_USERINFO_REQUEST_NORMAL_INFO"]}
                          </label>
                        </div>
                      </div>
                      <div className="custom_checkbox">
                        <div className="left">
                          <label className="radio">
                            <input
                              type="radio"
                              value="true"
                              checked={urgent === true}
                              name="requestType"
                              onChange={handleReuqestType}
                              id="requestTypeUrgent"
                            />
                            <span className="checkround" />
                          </label>
                        </div>
                        <div className="right">
                          <label htmlFor="requestTypeUrgent">
                            {appLocale["REQUEST_USERINFO_REQUEST_URGENT"]}
                          </label>
                          <label htmlFor="requestTypeUrgent">
                            {appLocale["REQUEST_USERINFO_REQUEST_URGENT_INFO"]}
                          </label>
                        </div>
                      </div>
                      <p>{appLocale["REQUEST_USERINFO_TERMS"]}</p>
                    </div>

                    <div className="actions">
                      {item &&
                      item.settings &&
                      item.settings.userDetail === true ? (
                        tab === 1 ? (
                          <button
                            className="btn btn-primary"
                            onClick={upsertContent}
                          >
                            {appLocale["NEXT"]}
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-secondary"
                              onClick={backToContent}
                            >
                              {appLocale["PREVIOUS"]}
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={upsertContent}
                              disabled={!isValidForm}
                            >
                              <CircleSpinner
                                show={submitSpinner}
                                size="small"
                              />
                              {!submitSpinner && appLocale["SUBMIT"]}
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={upsertContent}
                          disabled={!isValidForm}
                        >
                          <CircleSpinner show={submitSpinner} size="small" />
                          {!submitSpinner && appLocale["SUBMIT"]}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace_upsertRequest;
