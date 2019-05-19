import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import {
  addContent,
  updateContent,
  getContentById,
} from "./../../Api/content-api";
import {
  addRequest,
  updateRequest,
  getRequestById,
} from "../../Api/request-api";
import CategoriesModal from "./Categories";
import ContentTypesList from "./ContentTypes";
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

const UpsertProduct = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const requestBaseLink = process.env.REACT_APP_REQUESTS_DELIVERY_URL;
  const [{ categories, spaceInfo }, dispatch] = useGlobalState();

  // variables
  const requestLinkInput = useRef(null);
  const isRequest = props.match.url.includes("requests") ? true : false;

  const [updateMode, toggleUpdateMode] = useState(
    props.match.params.id
      ? props.match.url.includes("view")
        ? false
        : true
      : false
  );

  const [viewMode] = useState(props.match.url.includes("view") ? true : false);
  const [tab, toggleTab] = useState();
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [category, setCategory] = useState();
  const [contentType, setContentType] = useState();
  const [fields, setFields] = useState();

  // it will get value editing time
  const [selectedContent, setSelectedContent] = useState();

  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [error, setError] = useState({});
  const [isValidForm, toggleIsValidForm] = useState(false);

  const [newContentTypeBox, toggleNewContentTypeBox] = useState(false);
  const [spinner, toggleSpinner] = useState(false);
  const [closeSpinner, toggleCloseSpinner] = useState(false);
  const [requestResult, setRequestResult] = useState();

  useEffect(() => {
    if (updateMode || viewMode) {
      if (props.match.params.id !== undefined) {
        if (props.match.params.id.length > 0) {
          //toggleUpdateMode(true);
          if (isRequest) getRequestContentById(props.match.params.id);
          else getItemById(props.match.params.id);
        } else {
          toggleTab(3);
        }
      } else {
        toggleTab(1);
      }
    } else {
      toggleTab(1);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    changeTab(2);
  }, [contentType]);
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
  function getItemById(id) {
    getContentById()
      .onOk(result => {
        if (result) {
          setSelectedContent(result);
          if (!result.contentType) {
            const obj = {
              type: "CONTEN_TYPE_UNDEFINED",
              sender: "getItemById",
              errorType: "contentType",
              message: languageManager.translate(
                "UPSERT_ITEM_GET_BY_ID_CONTENT_TYPE_UNDEFINED"
              ),
            };
            setError(obj);
            toggleTab(3);
          } else {
            initEditMode(result);
          }
        } else {
          toggleTab(3);
        }
      })
      .onServerError(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"
          ),
        };
        setError(obj);
      })
      .onBadRequest(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"
          ),
        };
        setError(obj);
      })
      .unAuthorized(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"
          ),
        };
        setError(obj);
      })
      .notFound(() => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
      })
      .call(spaceInfo.id, id);
  }
  function getRequestContentById(id) {
    getRequestById()
      .onOk(result => {
        if (result) {
          setSelectedContent(result);
          if (!result.contentType) {
            const obj = {
              type: "CONTEN_TYPE_UNDEFINED",
              sender: "getItemById",
              errorType: "contentType",
              message: languageManager.translate(
                "UPSERT_ITEM_GET_BY_ID_CONTENT_TYPE_UNDEFINED"
              ),
            };
            setError(obj);
            toggleTab(3);
          } else {
            initEditMode(result);
          }
        } else {
          toggleTab(3);
        }
      })
      .onServerError(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"
          ),
        };
        setError(obj);
      })
      .onBadRequest(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"
          ),
        };
        setError(obj);
      })
      .unAuthorized(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"
          ),
        };
        setError(obj);
      })
      .notFound(() => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
      })
      .call(spaceInfo.id, id);
  }
  function initEditMode(result) {
    setContentType(result.contentType);
    if (isRequest) {
      setFormData(result);
      setForm(result);
      setFields(requestFields);
    } else {
      setFormData(result.fields);
      setForm(result.fields);
      const c_fields = result.contentType.fields;
      setFields(c_fields.sort((a, b) => a.index - b.index));
    }
    if (result.contentType.categorization === true)
      setCategory(result.category);

    if (tab !== 2) toggleTab(2);
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
  function showCatgoryModal() {
    toggleCategoryModal(true);
  }
  function onCloseModel(selected) {
    if (selected !== undefined) {
      setCategory(selected);
    }
    toggleCategoryModal(false);
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
          <Media
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
  function backToProducts() {
    if (isRequest) props.history.push("/panel/requests");
    else props.history.push("/panel/contents");
  }
  function changeTab(tab) {
    if (tab === 2) {
      if (contentType !== undefined) {
        toggleTab(2);
        if (isRequest) {
          setFields(requestFields);
        } else {
          const f = contentType.fields;
          setFields(f.sort((a, b) => a.index - b.index));
        }
      }
    } else {
      setContentType(undefined);
      toggleTab(1);
    }
  }
  function handleLoadedContentTypes(success, error, sender) {
    if (sender === "choosingNewContentType") {
      if (error) {
        setError(error);
      }
    } else {
      if (success) toggleTab(1);
      else {
        setError(error);
        toggleTab(3);
      }
    }
  }

  function handleSelectContentType(contentType) {
    setContentType(contentType);
  }
  function handleSelectNewContentType(contentType) {
    selectedContent.contentType = contentType;
    initEditMode(selectedContent);
    setContentType(contentType);
  }
  function chooseNewContentType() {
    toggleNewContentTypeBox(true);
  }
  function upsertItem(closePage) {
    if (!spinner && !closeSpinner) {
      if (closePage) toggleCloseSpinner(true);
      else toggleSpinner(true);
      if (isRequest) {
        upsertRequestItem(true);
      } else {
        upsertContent(closePage);
      }
    }
  }
  function upsertRequestItem(closePage) {
    if (updateMode) {
      const obj = {
        id: props.match.params.id,
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : ""
            : "",
        title: form["title"],
        description: form["description"]  ? form["description"] : "",
        receiver: form["receiver"] ? form["receiver"] : "",
        thumbnail: form["thumbnail"],
        attachments: form["attachments"],
      };
      updateRequest()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_UPDATE_ON_OK"),
            },
          });
          backToProducts();
        })
        .onServerError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_ON_SERVER_ERROR"
              ),
            },
          });
        })
        .onBadRequest(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_ON_BAD_REQUEST"
              ),
            },
          });
        })
        .unAuthorized(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_NOT_FOUND"
              ),
            },
          });
        })
        .unKnownError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("error occured."),
            },
          });
        })
        .onRequestError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("request error"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    } else {
      const obj = {
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : null
            : null,
        ...form,
      };
      addRequest()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_ADD_ON_OK"),
            },
          });
          setRequestResult(result);
          toggleTab(4);
          toggleSpinner(false);
          setFormData({});
          setForm({});
          setFormValidation({});
        })
        .onServerError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("UPSERT_ITEM_ADD_NOT_FOUND"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    }
  }
  function upsertContent(closePage) {
    if (updateMode) {
      const obj = {
        _id: props.match.params.id,
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : null
            : null,
        fields: form,
      };
      updateContent()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_UPDATE_ON_OK"),
            },
          });
          backToProducts();
        })
        .onServerError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_ON_SERVER_ERROR"
              ),
            },
          });
        })
        .onBadRequest(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_ON_BAD_REQUEST"
              ),
            },
          });
        })
        .unAuthorized(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ITEM_UPDATE_NOT_FOUND"
              ),
            },
          });
        })
        .call(spaceInfo.id, obj);
    } else {
      const obj = {
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : null
            : null,
        fields: form,
      };
      addContent()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_ADD_ON_OK"),
            },
          });
          if (closePage) {
            backToProducts();
          } else {
            if (closePage) toggleCloseSpinner(false);
            else toggleSpinner(false);
            setFormData({});
            setForm({});
            // let n_obj = {};
            // for (const key in formValidation) {
            //   n_obj[key] = false;
            // }
            setFormValidation({});
          }
        })
        .onServerError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
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
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("UPSERT_ITEM_ADD_NOT_FOUND"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    }
  }
  function copyRequestLink() {
    requestLinkInput.current.select();
    document.execCommand("copy");
    dispatch({
      type: "ADD_NOTIFY",
      value: {
        type: "success",
        message: languageManager.translate("Request link copied"),
      },
    });
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToProducts}>
          <i className="icon-arrow-left2" />
          Back
        </button>
        {tab !== undefined && tab !== 3 && (
          <div className="tabItems">
            {updateMode || viewMode ? (
              <div className="item active">
                {contentType && contentType.title[currentLang]}
              </div>
            ) : (
              <>
                <div
                  className={["item", tab === 1 ? "active" : ""].join(" ")}
                  onClick={() => changeTab(1)}
                >
                  1.Choosing Content Type
                </div>
                <div
                  className={["item", tab === 2 ? "active" : ""].join(" ")}
                  onClick={() => changeTab(2)}
                >
                  2.Complete Form
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="up-content">
        <main>
          {tab === 1 && (
            <>
              <div className="up-content-title">Choose a content type</div>
              <div className="up-content-itemTypes animated fadeIn">
                <ContentTypesList
                  onSelectContentType={handleSelectContentType}
                  onEndLoading={handleLoadedContentTypes}
                />
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <div className="up-content-title">
                {updateMode ? "Edit " : viewMode ? "View" : "Add New "}
              </div>
              <div className="up-categoryBox animated fadeIn">
                {category &&
                  (category.image !== undefined ? (
                    <div className="selectedCategory-img">
                      <img src={category.image[currentLang]} alt="" />
                    </div>
                  ) : (
                    <div className="selectedCategory-icon">
                      <div className="contentIcon">
                        <i className="icon-item-type" />
                      </div>
                    </div>
                  ))}
                <span>
                  {contentType.categorization === true
                    ? category
                      ? category.name[currentLang]
                      : viewMode
                      ? "This content dosen't have category"
                      : "Choose a category"
                    : contentType.title[currentLang]}
                </span>
                {!viewMode ? (
                  contentType.categorization === true ? (
                    <button className="btn btn-link" onClick={showCatgoryModal}>
                      {category ? "Change Category" : "Choose a category"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-link"
                      onClick={() => changeTab(1)}
                    >
                      Change content type
                    </button>
                  )
                ) : null}
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields &&
                  fields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                {!viewMode && (
                  <div className="form-submit-btns">
                    {!updateMode && !isRequest && (
                      <button
                        className="btn btn-primary"
                        onClick={() => upsertItem(false)}
                        disabled={!isValidForm}
                      >
                        <CircleSpinner show={spinner} size="small" />
                        {!spinner && "Save & New"}
                      </button>
                    )}
                    <button
                      className="btn btn-primary "
                      onClick={() => upsertItem(true)}
                      disabled={!isValidForm}
                    >
                      <CircleSpinner show={closeSpinner} size="small" />
                      {!closeSpinner &&
                        (updateMode ? "Update & Close" : "Save & Close")}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {tab === 3 && (
            <div className="up-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error && error.message}</div>
              <div className="actions">
                {error.sender === "contentType" && (
                  <div className="btns">
                    <button className="btn btn-light">
                      {languageManager.translate("Reload Item Types")}
                    </button>
                  </div>
                )}
                {error.sender === "getItemById" && (
                  <>
                    <div className="btns">
                      <button className="btn btn-light">
                        {languageManager.translate("Reload")}
                      </button>
                      {error.errorType === "contentType" && (
                        <button
                          className="btn btn-light"
                          onClick={chooseNewContentType}
                        >
                          {languageManager.translate("Choose Content Type")}
                        </button>
                      )}
                    </div>
                    {newContentTypeBox && (
                      <div className="getItem-content-itemTypes animated fadeIn">
                        <ContentTypesList
                          onSelectContentType={handleSelectNewContentType}
                          onEndLoading={(success, error) =>
                            handleLoadedContentTypes(
                              success,
                              error,
                              "choosingNewContentType"
                            )
                          }
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {tab === 4 && (
            <div className="up-formInputs animated fadeIn errorsBox requestAlert">
              <div className="requestAlert-top">
                <div className="requestSuccessIcon">
                  <i className="icon-checkmark" />
                </div>
                <h4 className="alert-heading">Submitted!</h4>
              </div>
              <p>
                Your request is created successfully.Use this link to send to
                your audience.
              </p>
              <hr />
              <p className="mb-0">
                This link will be activated when you publish the request.
                <br />
                Request link :
                <a
                  href={requestBaseLink + "/" + requestResult.sys.link}
                  class="alert-link"
                >
                  {requestBaseLink + "/" + requestResult.sys.link}
                </a>
              </p>

              <div className="form-group">
                <div className="input-group">
                  <input
                    ref={requestLinkInput}
                    type="text"
                    className="form-control"
                    defaultValue={
                      requestBaseLink + "/" + requestResult.sys.link
                    }
                    readOnly
                  />
                  <div
                    className="input-group-append"
                    onClick={copyRequestLink}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="input-group-text">Copy</span>
                  </div>
                </div>
              </div>
              <div className="requestLink-actions">
                <button className="btn btn-light" onClick={backToProducts}>
                  {languageManager.translate("Close")}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      {categoryModal && (
        <CategoriesModal categories={categories} onCloseModal={onCloseModel} />
      )}
    </div>
  );
};

export default UpsertProduct;
