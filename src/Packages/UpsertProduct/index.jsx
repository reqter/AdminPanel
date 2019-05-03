import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import {
  addContent,
  updateContent,
  getContentById,
  getContentTypes,
} from "./../../Api/content-api";
import CategoriesModal from "./Categories";
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
} from "./../../components";

const UpsertProduct = props => {
  let selectedItem;
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories, contentTypes, contents }, dispatch] = useGlobalState();

  // variables
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

  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [error, setError] = useState({});
  const [isValidForm, toggleIsValidForm] = useState(false);

  useEffect(() => {
    if (updateMode || viewMode) {
      if (props.match.params.id !== undefined) {
        if (props.match.params.id.length > 0) {
          //toggleUpdateMode(true);
          getItemById(props.match.params.id);
        } else {
          toggleTab(3);
        }
      } else {
        getContentTypesList();
      }
    } else {
      getContentTypesList();
    }
  }, [props.match.params.id]);

  useEffect(() => {
    changeTab(2);
  }, [contentType]);
  useEffect(() => {
    if (
      Object.keys(form).length > 0 &&
      checkFormValidation() &&
      category !== undefined
    ) {
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
  function getContentTypesList() {
    getContentTypes()
      .onOk(result => {
        toggleTab(1);
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result,
        });
      })
      .onServerError(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_ON_SERVER_ERROR"),
        };
        setError(obj);
      })
      .onBadRequest(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST"),
        };
        setError(obj);
      })
      .unAuthorized(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED"),
        };
        setError(obj);
      })
      .call();
  }
  function getItemById(id) {
    getContentById()
      .onOk(result => {
        if (result) {
          if (result.contentType === undefined) {
            toggleTab(3);
            const obj = {
              type: "CONTEN_TYPE_UNDEFINED",
              sender: "getItemById",
              message: languageManager.translate(
                "UPSERT_ITEM_GET_BY_ID_CONTENT_TYPE_UNDEFINED"
              ),
            };
            setError(obj);
          } else {
            if (tab !== 2) toggleTab(2);
            setFormData(result.fields);
            setForm(result.fields);
            setContentType(result.contentType);
            const c_fields = result.contentType.fields;
            setFields(c_fields.sort((a, b) => a.index - b.index));
            setCategory(result.category);
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
      .call(id);
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
      default:
        break;
    }
  }
  function backToProducts() {
    props.history.push("/panel/contents");
  }
  function changeTab(tab) {
    if (tab === 2) {
      if (contentType !== undefined) {
        toggleTab(2);
        const f = contentType.fields;
        setFields(f.sort((a, b) => a.index - b.index));
      }
    } else {
      setContentType(undefined);
      toggleTab(1);
    }
  }
  function handleSelectContentType(contentType) {
    setContentType(contentType);
  }
  function upsertItem(closePage) {
    const obj = {
      sys: {
        id: updateMode ? props.match.params.id : Math.random().toString(),
        issuer: {
          id: "1",
          fullName: "Saeed Padyab",
          image: "",
        },
        issueDate: "19/01/2019 20:18",
      },
      //contentType: contentType.id,
      contentType: {
        id: contentType.sys.id,
        name: contentType.name,
        title: contentType.title,
      },
      //category:category.id,
      category: {
        id: category.sys.id,
        name: category.name,
      },
      fields: form,
    };
    if (updateMode) {
      obj["status"] = "changed";
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
        .call(obj);
    } else {
      obj["status"] = "draft";
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
              <div className="up-content-itemTypes animated fadeIn ">
                {contentTypes.map(c => (
                  <div key={c.id} className="listGroupItem">
                    <div className="treeItem">
                      {c.media === undefined || c.media.length === 0 ? (
                        <div className="treeItem-icon">
                          <div className="contentIcon">
                            <i className="icon-item-type" />
                          </div>
                        </div>
                      ) : (
                        <div className="treeItem-img">
                          <img src={c.media[0][currentLang]} alt="" />
                        </div>
                      )}
                      <div className="treeItem-text">
                        <span className="treeItem-name">
                          {c.title[currentLang]}
                        </span>
                        <span className="treeItem-desc">
                          {c.description[currentLang] ||
                            "Lorem ipsum dolor sit amet, consectetur"}
                        </span>
                      </div>
                      <button
                        className="btn btn-light treeItem-action"
                        size="xs"
                        onClick={() => handleSelectContentType(c)}
                      >
                        <span style={{ fontSize: 12 }}>
                          {languageManager.translate("Choose")}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <div className="up-content-title">
                {updateMode
                  ? "Edit "
                  : viewMode
                  ? "View"
                  : "Add New " + contentType.title[currentLang]}
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
                  {category ? category.name[currentLang] : "Choose a category"}
                </span>
                {!viewMode && (
                  <button className="btn btn-link" onClick={showCatgoryModal}>
                    Change category
                  </button>
                )}
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields &&
                  fields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                {!viewMode && (
                  <div className="actions">
                    {!updateMode && (
                      <button
                        className="btn btn-primary"
                        onClick={() => upsertItem(false)}
                        disabled={!isValidForm}
                      >
                        Save & New
                      </button>
                    )}
                    <button
                      className="btn btn-primary "
                      onClick={() => upsertItem(true)}
                      disabled={!isValidForm}
                    >
                      {updateMode ? "Update & Close" : "Save & Close"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {tab === 3 && (
            <div className="up-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error.message}</div>
              <div className="actions">
                {error.sender === "contentType" && (
                  <button className="btn btn-light">
                    {languageManager.translate("Reload Item Types")}
                  </button>
                )}
                {error.sender === "getItemById" && (
                  <button className="btn btn-light">
                    {languageManager.translate("Reload")}
                  </button>
                )}
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
