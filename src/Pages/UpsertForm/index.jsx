import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { useGlobalState, useLocale } from "../../hooks";
import {
  addContent,
  updateContent,
  getContentById,
  getContentTypes,
} from "../../Api/content-api";
import {
  addRequest,
  updateRequest,
  getRequestById,
} from "../../Api/request-api";
import CategoriesModal from "./Categories";
import ContentTypesList from "./ContentTypes";
import FormTypes from "./FormTypes";
import Partners from "./Partners";
import FormDesign from "./FormDesign";
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
  Image,
} from "../../components";

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
      fa: "عنوان فرم اجباری می باشد",
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
      en: "Short description of your form",
      fa: "توضیح کوتاه برای فرم",
    },
    type: "string",
    isBase: true,
    isTranslate: true,
    isMultiLine: true,
  },
  {
    id: "7",
    name: "thumbnail",
    title: {
      en: "Thumbnail",
      fa: "تصویر نمایه فرم",
    },
    description: {
      fa: "تصویر کوچک برای نمایش به عنوان نمایه فرم",
      en: "a small image to show as form image",
    },
    type: "media",
    mediaType: ["image"],
    isTranslate: true,
  },
  {
    id: "8",
    name: "attachments",
    title: {
      en: "Attachments",
      fa: "فایل های ضمیمه",
    },
    description: {
      fa: "فایل های ضمیمه شده همراه با فرم",
      en: "Attachments files beside form",
    },
    type: "media",
    isTranslate: true,
    isList: true,
  },
  {
    id: "9",
    name: "startDate",
    title: {
      en: "Start Date",
      fa: "تاریخ شروع",
    },
    description: {
      fa: "تاریخ شروع درخواست یا پیشنهاد برای این فرم",
      en: "Start date of request or quote of this form",
    },
    type: "dateTime",
    format: "date",
    disablePastDates: true,
  },
  {
    id: "10",
    name: "endDate",
    title: {
      en: "End Date",
      fa: "تاریخ پایان",
    },
    description: {
      fa: "تاریخ پایان درخواست یا پیشنهاد برای این فرم",
      en: "End date of request or quote of this form",
    },
    type: "dateTime",
    format: "date",
    disablePastDates: true,
  },
  {
    id: "11",
    name: "longDesc",
    title: {
      en: "More Info",
      fa: "اطلاعات بیشتر",
    },
    description: {
      fa: "اطلاعات بیشتر از جزئیات فرم",
      en: "More detail of this form",
    },
    type: "richText",
    isTranslate: true,
  },
  // {
  //   id: "10",
  //   name: "userFields",
  //   title: {
  //     en: "User Fields",
  //     fa: "فیلدهای نمایشی",
  //   },
  //   description: {
  //     fa: "فیلد های قایل نمایش برای کاربران",
  //     en: "User can only the fields which you you select",
  //   },
  //   type: "keyValue",
  //   isList: true,
  // },
];
const headerTabs = [
  {
    id: 1,
    name: "UPSERT_FORM_FIRST_TAB_TITLE",
  },
  {
    id: 2,
    name: "UPSERT_FORM_SECOND_TAB_TITLE",
  },
  {
    id: 3,
    name: "UPSERT_FORM_THIRTH_TAB_TITLE",
  },
  {
    id: 4,
    name: "UPSERT_FORM_FOURTH_TAB_TITLE",
  },
  {
    id: 5,
    name: "UPSERT_FORM_FIVTH_TAB_TITLE",
  },
];
const UpsertProduct = props => {
  const { appLocale, t, currentLang, direction } = useLocale();
  const requestBaseLink = process.env.REACT_APP_REQUESTS_DELIVERY_URL;
  const [{ categories, spaceInfo }, dispatch] = useGlobalState();

  // variables
  const requestLinkInput = useRef(null);

  const [updateMode, toggleUpdateMode] = useState(
    props.match.params.id
      ? props.match.url.includes("view")
        ? false
        : true
      : false
  );

  const [viewMode] = useState(props.match.url.includes("view") ? true : false);
  const [tab, changeTab] = useState();
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
  const [formType, setSelectedFormType] = useState();

  useEffect(() => {
    if (updateMode || viewMode) {
      if (props.match.params.id !== undefined) {
        if (props.match.params.id.length > 0) {
          getRequestContentById(props.match.params.id);
        } else {
          changeTab(5);
        }
      } else {
        changeTab(1);
      }
    } else {
      if (props.location.params && props.location.params.content) {
        getItemById(props.location.params.content._id);
        //_getContentTypeById(props.location.params.content._id);
      } else {
        changeTab(1);
      }
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (contentType) changeTab(4);
  }, [contentType]);

  useEffect(() => {
    if (Object.keys(form).length > 0 && category && checkFormValidation()) {
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
              message: t("UPSERT_ITEM_GET_BY_ID_CONTENT_TYPE_UNDEFINED"),
            };
            setError(obj);
            changeTab(5);
          } else {
            initEditMode(result);
          }
        } else {
          changeTab(5);
        }
      })
      .onServerError(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"),
        };
        setError(obj);
      })
      .onBadRequest(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"),
        };
        setError(obj);
      })
      .unAuthorized(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"),
        };
        setError(obj);
      })
      .notFound(() => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
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
              message: t("UPSERT_ITEM_GET_BY_ID_CONTENT_TYPE_UNDEFINED"),
            };
            setError(obj);
            changeTab(5);
          } else {
            initEditMode(result);
          }
        } else {
          changeTab(5);
        }
      })
      .onServerError(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"),
        };
        setError(obj);
      })
      .onBadRequest(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"),
        };
        setError(obj);
      })
      .unAuthorized(result => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"),
        };
        setError(obj);
      })
      .notFound(() => {
        changeTab(5);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: t("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
      })
      .call(spaceInfo.id, id);
  }
  function initEditMode(result) {
    let obj = {};
    for (const key in result) {
      if (key === "settings") {
        obj = { ...obj, ...result[key] };
      } else {
        obj[key] = result[key];
      }
    }
    setFormData(obj);
    setForm(obj);
    setContentType(result.contentType);
    if (result.contentType.categorization === true)
      setCategory(result.category);

    if (tab !== 2) changeTab(4);
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
    //const f = { ...form, [key]: value };
    //form[key] = value;
    setForm(prevForm => {
      const obj = { ...prevForm, [key]: value };
      return obj;
    });

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
  function backToForms() {
    props.history.push(`/${currentLang}/forms`);
  }
  function changeTabContent(t) {
    if (t === 2) {
      if (formType) changeTab(t);
    } else if (t === 3) {
      changeTab(t);
    } else if (t === 4) {
      changeTab(t);
    } else if (t === 5) changeTab(t);
    else {
      changeTab(t);
    }

    // if (tab === 2) {
    //   if (contentType !== undefined) {
    //     changeTab(2);
    //     if (isRequest) {
    //       const f = contentType.fields.reduce((preValue, currentValue) => {
    //         preValue.push({ value: currentValue.name });
    //         return preValue;
    //       }, []);
    //       const r_f = requestFields.map(rF => {
    //         if (rF.name === "userFields") {
    //           rF.options = f;
    //         }
    //         return rF;
    //       });
    //       setFields(r_f);
    //     } else {
    //       const f = contentType.fields;
    //       setFields(f.sort((a, b) => a.index - b.index));
    //     }
    //   }
    // } else {
    //   setContentType(undefined);
    //   changeTab(1);
    // }
  }
  function handleLoadedContentTypes(success, error, sender) {
    if (sender === "choosingNewContentType") {
      if (error) {
        setError(error);
      }
    } else {
      if (success) {
        if (tab !== 3) changeTab(3);
      } else {
        setError(error);
        changeTab(5);
      }
    }
  }

  function handleSelectContentType(contentType) {
    setContentType(contentType);
    if (
      !contentType.allowCustomFields ||
      contentType.allowCustomFields === true
    ) {
      changeTab(4);
    } else {
      changeTab(5);
    }
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
      upsertRequestItem(true);
    }
  }
  function upsertRequestItem(closePage) {
    if (updateMode) {
      let obj = {
        id: props.match.params.id,
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : ""
            : "",
        title: form["title"],
        description: form["description"] ? form["description"] : "",
        receiver: form["receiver"] ? form["receiver"] : "",
        thumbnail: form["thumbnail"],
        attachments: form["attachments"],
        longDesc: form["longDesc"],
        settings: {
          showHeader: form["showHeader"],
          showRequestInfo: form["showRequestInfo"],
          userDetail: form["userDetail"],
          userFields: form["userFields"],
        },
      };
      if (selectedContent.settings && selectedContent.settings.contentId) {
        obj["settings"]["contentId"] = selectedContent.settings.contentId;
      }
      updateRequest()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: t("UPSERT_ITEM_UPDATE_ON_OK"),
            },
          });
          setRequestResult(result);
          changeTab(4);
        })
        .onServerError(result => {
          if (closePage) toggleCloseSpinner(false);
          else toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("UPSERT_ITEM_UPDATE_ON_SERVER_ERROR"),
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
              message: t("UPSERT_ITEM_UPDATE_ON_BAD_REQUEST"),
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
              message: t("UPSERT_ITEM_UPDATE_UN_AUTHORIZED"),
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
              message: t("UPSERT_ITEM_UPDATE_NOT_FOUND"),
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
              message: t("error occured."),
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
              message: t("request error"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    } else {
      let obj = {
        contentType: contentType._id,
        category:
          contentType.categorization === true
            ? category
              ? category._id
              : null
            : null,
        title: form["title"],
        description: form["description"] ? form["description"] : "",
        receiver: form["receiver"] ? form["receiver"] : "",
        thumbnail: form["thumbnail"],
        attachments: form["attachments"],
        longDesc: form["longDesc"],
        settings: {
          showHeader: form["showHeader"],
          showRequestInfo: form["showRequestInfo"],
          userDetail: form["userDetail"],
          userFields: form["userFields"],
        },
      };
      if (props.location.params && props.location.params.content) {
        obj["settings"]["contentId"] = props.location.params.content._id;
      }
      addRequest()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: t("UPSERT_ITEM_ADD_ON_OK"),
            },
          });
          setRequestResult(result);
          changeTab(4);
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
              message: t("UPSERT_ITEM_ADD_ON_SERVER_ERROR"),
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
              message: t("UPSERT_ITEM_ADD_ON_BAD_REQUEST"),
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
              message: t("UPSERT_ITEM_ADD_UN_AUTHORIZED"),
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
              message: t("UPSERT_ITEM_ADD_NOT_FOUND"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    }
  }
  // useEffect(() => {
  //   if (formType) {
  //     if (formType.id !== 2 && formType.id !== 4) {
  //       changeTab(2);
  //     } else {
  //       changeTab(3);
  //     }
  //   }
  // }, [formType]);
  function handleSelectFormType(type) {
    setSelectedFormType(type);
    if (type.id === 1 || type.id === 3) {
      changeTab(3);
    } else {
      changeTab(2);
    }
  }
  function copyRequestLink() {
    requestLinkInput.current.select();
    document.execCommand("copy");
    dispatch({
      type: "ADD_NOTIFY",
      value: {
        type: "success",
        message: t("Request link copied"),
      },
    });
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToForms}>
          <i
            className={
              "icon-arrow-" + (direction === "ltr" ? "left2" : "right2")
            }
          />
          {t("BACK")}
        </button>
        <div className="tabItems">
          {updateMode || viewMode ? (
            <div className="item active">
              {contentType && contentType.title[currentLang]}
            </div>
          ) : (
            headerTabs.map(h => (
              <div
                className={["item", tab === h.id ? "active" : ""].join(" ")}
                onClick={() => changeTabContent(h.id)}
                style={{
                  display:
                    h.id !== 4
                      ? "flex"
                      : contentType
                      ? !contentType.allowCustomFields ||
                        contentType.allowCustomFields === true
                        ? "flex"
                        : "none"
                      : "none",
                }}
              >
                <div
                  className={["tabNumber ", tab === h.id ? "active" : ""].join(
                    " "
                  )}
                />
                {t(h.name)}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="up-content">
        <main>
          {tab === 1 && (
            <FormTypes
              selectedType={formType}
              onSelectType={handleSelectFormType}
            />
          )}
          {tab === 2 && <Partners />}
          {tab === 3 && (
            <>
              <h5>{t("UPSERT_FORM_TEMPLATES_TITLE")}</h5>
              <span style={{ fontSize: 13 }}>
                {t("UPSERT_FORM_TEMPLATES_DESC")}
              </span>
              <input
                type="text"
                className="form-control contentTypeSearch"
                placeholder="جستحوی قالب با نام"
              />
              <div className="up-content-itemTypes animated fadeIn">
                <ContentTypesList
                  onSelectContentType={handleSelectContentType}
                  onEndLoading={handleLoadedContentTypes}
                />
              </div>
            </>
          )}
          {tab === 4 && <FormDesign />}
          {tab === 5 && (
            <>
              <div className="up-content-title">
                {updateMode
                  ? t("EDIT")
                  : viewMode
                  ? t("VIEW_MODE")
                  : t("ADD_NEW") +
                    " " +
                    (contentType &&
                      contentType.title &&
                      contentType.title[currentLang])}
              </div>
              <div className="up-categoryBox animated fadeIn">
                {category ? (
                  category.image !== undefined ? (
                    <div className="selectedCategory-img">
                      <Image url={category.image[currentLang]}/>
                    </div>
                  ) : (
                    <div className="selectedCategory-icon">
                      <div className="contentIcon">
                        <i className="icon-item-type" />
                      </div>
                    </div>
                  )
                ) : (
                  <div className="selectedCategory-icon">
                    <div className="contentIcon">
                      <i className="icon-item-type" />
                    </div>
                  </div>
                )}
                <span>
                  {category
                    ? category.name[currentLang]
                    : viewMode
                    ? t("UPSERT_FORM_NO_CATEGORY_HEADER")
                    : t("CATEGORY")}
                </span>
                {!viewMode && (
                  <button className="btn btn-link" onClick={showCatgoryModal}>
                    {category
                      ? t("UPSERT_FORM_CHANGE_CATEGORY")
                      : t("UPSERT_FORM_CHOOSE_CATEGORY")}
                  </button>
                )}
              </div>
              {(updateMode || viewMode) && (
                <div className="linkBox animated fadeIn">
                  <span className="linkmsg">
                    This link will be activated when you publish the request.
                  </span>
                  <div>
                    Request link :
                    <a
                      href={requestBaseLink + "/" + selectedContent.sys.link}
                      class="alert-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {requestBaseLink + "/" + selectedContent.sys.link}
                    </a>
                  </div>
                </div>
              )}
              <div className="up-formInputs animated fadeIn">
                {requestFields &&
                  requestFields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                {!viewMode && (
                  <div className="form-submit-btns">
                    {!updateMode && (
                      <button
                        className="btn btn-primary"
                        onClick={() => upsertItem(false)}
                        disabled={!isValidForm}
                      >
                        <CircleSpinner show={spinner} size="small" />
                        {!spinner && t("SAVE_AND_NEW")}
                      </button>
                    )}
                    <button
                      className="btn btn-primary "
                      onClick={() => upsertItem(true)}
                      disabled={!isValidForm}
                    >
                      <CircleSpinner show={closeSpinner} size="small" />
                      {!closeSpinner &&
                        (updateMode
                          ? t("UPDATE_AND_CLOSE")
                          : t("SAVE_AND_CLOSE"))}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {tab === 6 && (
            <div className="up-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error && error.message}</div>
              <div className="actions">
                {error.sender === "contentType" && (
                  <div className="btns">
                    <button className="btn btn-light">
                      {t("Reload Item Types")}
                    </button>
                  </div>
                )}
                {error.sender === "getItemById" && (
                  <>
                    <div className="btns">
                      <button className="btn btn-light">{t("Reload")}</button>
                      {error.errorType === "contentType" && (
                        <button
                          className="btn btn-light"
                          onClick={chooseNewContentType}
                        >
                          {t("Choose Content Type")}
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
          {tab === 7 && (
            <div className="up-formInputs animated fadeIn errorsBox requestAlert">
              <div className="requestAlert-top">
                <div className="requestSuccessIcon">
                  <i className="icon-checkmark" />
                </div>
                <h4 className="alert-heading">
                  {updateMode ? "Updated!" : "Submitted!"}
                </h4>
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                <button className="btn btn-light" onClick={backToForms}>
                  {t("CLOSE")}
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
