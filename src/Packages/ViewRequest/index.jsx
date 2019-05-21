import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  languageManager,
  useGlobalState,
  storageManager,
} from "../../services";
import { addContent } from "./../../Api/content-api";
import { getRequestById } from "./../../Api/request-api";
import { getUserInfo } from "./../../Api/account-api";
import { NotFound, Wrong } from "../../components/Commons/ErrorsComponent";
import {
  String,
  Number,
  DateTime,
  Location,
  Media,
  Boolean,
  KeyValue,
  RichText,
  Reference,
  CircleSpinner,
  JsonObject,
  FileUploader,
  AdvanceUploader,
} from "./../../components";
const requestFields = [
  {
    id: "1",
    name: "title",
    title: {
      en: "Title",
      fa: "عنوان",
    },
    description: {
      en: "title is required",
    },
    type: "string",
    isBase: true,
    isTranslate: true,
    isRequired: true,
  },
  {
    id: "2",
    name: "description",
    title: {
      en: "Description",
      fa: "توضیحات",
    },
    description: {
      en: "Short description of your request",
      fa: "توضیح کوتاه برای فایل",
    },
    type: "string",
    isBase: true,
    isTranslate: true,
  },
  {
    id: "3",
    name: "receiver",
    title: {
      en: "Receiver",
      fa: "عنوان",
    },
    description: {
      en: "Receiver is required",
    },
    type: "string",
    appearance: "email",
  },
  {
    id: "4",
    name: "thumbnail",
    title: {
      en: "Thumbnail",
    },
    description: {
      fa: "",
      en: "Click on file selector to choose your file",
    },
    type: "media",
    mediaType: ["image"],
    isTranslate: true,
  },
  {
    id: "5",
    name: "attachments",
    title: {
      en: "Attachments",
    },
    description: {
      fa: "",
      en: "Click on file selector to choose your file",
    },
    type: "media",
    isTranslate: true,
  },
];

const currentLang = languageManager.getCurrentLanguage().name;

const ViewRequest = props => {
  const viewMode = false;
  const updateMode = false;

  const [{ spaceInfo }, dispatch] = useGlobalState();
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
      const token = storageManager.getItem("token");
      if (token) fetchUserInfo();
      getItemById("5ccfd1297890980017b2c899", params.id);
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
  function getItemById(spaceId, id) {
    getRequestById()
      .onOk(result => {
        if (result) {
          if (!result.contentType) {
            const obj = {
              type: "CONTENT_TYPE",
              title: "Not Found!",
              message: "There is not content type for this content.",
            };
            setError(obj);
          } else {
            setItem(result);
            //setContentType(result.contentType);
            const c_fields = result.contentType.fields;
            setFields(c_fields.sort((a, b) => a.index - b.index));
            // if (result.contentType.categorization === true)
            //   setCategory(result.category);
            setError();
          }
        }
        toggleSpinner(false);
      })
      .onServerError(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onBadRequest(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unAuthorized(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .notFound(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onRequestError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unKnownError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .call(spaceId, id);
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
    setForm(prevState => ({
      ...prevState,
      [field.name]: value,
    }));
    setFormValidation(prevFormValidation => ({
      ...prevFormValidation,
      [key]: isValid,
    }));
  }

  function upsertContent(closePage) {
    if (!submitSpinner) {
      toggleSubmitSpinner(true)
      const obj = {
        contentType: item.contentType._id,
        // category:
        //   item.contentType.categorization === true
        //     ? item.category
        //       ? item.category._id
        //       : null
        //     : null,
        fields: form,
      };
      addContent()
        .onOk(result => {
            toggleSubmitSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_ADD_ON_OK"),
            },
          });

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
              message: languageManager.translate(
                "UPSERT_ITEM_ADD_UN_AUTHORIZED"
              ),
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
        .call(item.sys.spaceId, obj);
    }
  }
  return spinner ? (
    <div className="loaderBox">
      <div className="loader" />
      Loading ...
    </div>
  ) : (
    <div className="viewRequest">
      <div className="viewRequest--header">
        <div className="header--left">
          <div className="header--content-icon">
            {/* <div className="empty-icon">?</div> */}
            <img
              src="https://www.insertcart.com/wp-content/uploads/2018/05/thumbnail.jpg"
              alt=""
            />
          </div>
          <div className="header--content-name">
            <span>{item.title && item.title[currentLang]}</span>
            <span>
              {item.description
                ? item.description[currentLang]
                : "Lorem ipsum description"}
            </span>
          </div>
        </div>
        <div className="header--center" />
        <div className="header--right">
          {!userInfo && (
            <img
              src={require("./../../assets/logo.png")}
              alt=""
              className="logo"
            />
          )}
          {userInfo && (
            <div className="userinfo">
              <span>
                {(userInfo.profile.first_name === undefined ||
                  userInfo.profile.first_name.length === 0) &&
                (userInfo.profile.last_name === undefined ||
                  userInfo.profile.last_name.length === 0)
                  ? "Your name"
                  : userInfo.profile.first_name +
                    " " +
                    userInfo.profile.last_name}
              </span>
              {userInfo.profile.avatar &&
              userInfo.profile.avatar.length > 0 ? (
                <div>
                  <img src="https://i.redd.it/6onq25y0sh311.jpg" alt="" />
                </div>
              ) : (
                <div className="empty-avatar">?</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="viewRequest--body">
        {error ? (
          <div className="viewRequest--error">
            <div>{error.type === "CONTENT_TYPE" && <NotFound />}</div>
            <div>{error.type === "WRONG_URL" && <Wrong />}</div>
            <span className="viewRequest--error-title">{error.title}</span>
            <span className="viewRequest--error-msg">{error.message}</span>
          </div>
        ) : (
          <div className="viewRequest-form">
            <div className="formContent">
              <div className="content-userInfo">
                <div className="userImage">
                  <img
                    src="https://sitejerk.com/images/profile-image-png-17.png"
                    alt=""
                  />
                </div>
                <div className="info">
                  <span>
                    <strong>Saeed padyab</strong> is requesting
                  </span>
                  <span>{item.title && item.title[currentLang]}</span>
                </div>
                <div className="requestDate">{item.sys.issueDate}</div>
              </div>
              <div className="content-inputs">
                {fields &&
                  fields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                <div className="actions">
                  <button className="btn btn-primary" onClick={upsertContent}>
                    <CircleSpinner show={submitSpinner} size="small" />
                    {!submitSpinner && "Submit"}
                  </button>
                </div>
              </div>
              {item.attachments && item.attachments.length > 0 && (
                <div className="form-attachments">
                  <h5>Attachments</h5>
                  <div className="attachments-files">
                    <div className="attachmentItem" />
                    <div className="attachmentItem" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRequest;
