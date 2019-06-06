import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  languageManager,
  useGlobalState,
  storageManager,
  utility,
} from "../../services";
import { useLocale } from "./../../hooks";
import { addContent } from "./../../Api/content-api";
import { getRequestDetail } from "./../../Api/content-delivery-api";
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
    name: "email",
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
    name: "fullName",
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
    name: "phoneNumber",
    title: {
      en: "Phone Number",
    },
    description: {
      en: "Phone Number is required",
    },
    type: "number",
  },
];

const MarketPlace_upsertRequest = props => {
  const { currentLang } = useLocale();

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
        f = item.contentType.fields;
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
        } else setItem({});
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
    setCurrentBox("form");
  }
  function handleSubmitMore() {
    changeTab(1);
    toggleSubmitSpinner(false);
    setCurrentBox("form");
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
  function submit(closePage) {
    toggleSubmitSpinner(true);
    let obj = {
      contentType: item.contentType._id,
      // category:
      //   item.contentType.categorization === true
      //     ? item.category
      //       ? item.category._id
      //       : null
      //     : null,
      fields: form,
    };
    if (item.settings && item.settings.userDetail === true) {
      delete obj["fields"]["email"];
      delete obj["fields"]["fullName"];
      delete obj["fields"]["phoneNumber"];
      obj["request"] = {
        email: form["email"],
        fullName: form["fullName"],
        phoneNumber: form["phoneNumber"],
      };
    }
    addContent()
      .onOk(result => {
        setCurrentBox("successBox");
        // toggleSubmitSpinner(false);
        // dispatch({
        //   type: "ADD_NOTIFY",
        //   value: {
        //     type: "success",
        //     message: languageManager.translate("UPSERT_ITEM_ADD_ON_OK"),
        //   },
        // });

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
      .call(item.sys.spaceId, obj);
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
                  <span className="title">Submitted!</span>
                  <span className="successMsg">
                    Request Successfully submitted.only requester will know the
                    content
                  </span>
                  <div className="successBox-actions">
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitMore}
                    >
                      Submit More
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
                    <div className="requestDate">
                      <DateFormater date={item.sys.issueDate} />
                    </div>
                  </div>
                  <div className="content-inputs" style={{ marginTop: 20 }}>
                    {tab === 1 &&
                      fields &&
                      fields.map(field => (
                        <div key={field.id} className="rowItem">
                          {getFieldItem(field)}
                        </div>
                      ))}
                    <div className="actions">
                      <button
                        className="btn btn-primary"
                        onClick={upsertContent}
                        disabled={!isValidForm}
                      >
                        <CircleSpinner show={submitSpinner} size="small" />
                        {!submitSpinner && "Submit"}
                      </button>
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
