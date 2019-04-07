import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import {
  addContent,
  updateContent,
  getContentById,
  getContentTypes
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
  RichText
} from "./../../components";

const UpsertProduct = props => {
  let selectedItem;
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories, contentTypes, contents }, dispatch] = useGlobalState();

  // variables
  const [updateMode, toggleUpdateMode] = useState(
    props.match.params.id ? true : false
  );
  const [tab, toggleTab] = useState();
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [category, setCategory] = useState();
  const [contentType, setContentType] = useState();
  const [fields, setFields] = useState();

  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [resetForm, setResetForm] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (updateMode) {
      if (props.match.params.id !== undefined) {
        if (props.match.params.id.length > 0) {
          toggleUpdateMode(true);
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

  // methods
  function getContentTypesList() {
    getContentTypes()
      .onOk(result => {
        toggleTab(1);
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .onServerError(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_ON_SERVER_ERROR")
        };
        setError(obj);
      })
      .onBadRequest(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST")
        };
        setError(obj);
      })
      .unAuthorized(result => {
        toggleTab(3);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED")
        };
        setError(obj);
      })
      .call();
  }
  function getItemById(id) {
    getContentById()
      .onOk(result => {
        if (result) {
          if (tab !== 2) toggleTab(2);
          setFormData(result.fields);
          setContentType(result.contentType);
          const c = contentTypes.find(
            item => item.id === result.contentType.id
          );
          setFields(c.fields.sort((a, b) => a.index - b.index));
          setCategory(result.category);
        } else {
          toggleTab(3);
        }
      })
      .call(id);
  }
  function setNameToFormValidation(name) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        [name]: null,
        ...prevFormValidation
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    // add value to form
    let f = { ...formData };
    const { name: key } = field;
    if (value === undefined) {
      delete f[key];
    } else {
      f[key] = value;
    }
    setFormData(f);

    // check validation
    let obj = { ...formValidation };
    if (isValid && obj) {
      delete obj[key];
      if (Object.keys(obj).length === 0) {
        setFormValidation(undefined);
      } else {
        setFormValidation(obj);
      }
    } else {
      if (obj === undefined) {
        obj = {};
      }
      obj[key] = null;
      setFormValidation(obj);
    }
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
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "number":
        return (
          <Number
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "datetime":
        return (
          <DateTime
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "location":
        return (
          <Location
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "media":
        return (
          <Media
            reset={resetForm}
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "boolean":
        return (
          <Boolean
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "keyvalue":
        return (
          <KeyValue
            reset={resetForm}
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "richtext":
        return (
          <RichText
            reset={resetForm}
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
    props.history.push("/panel/items");
  }
  function changeTab(tab) {
    if (tab === 2) {
      if (contentType !== undefined) {
        toggleTab(2);
        const f = contentType.fields;
        setFields(f.sort((a, b) => a.index - b.index));
      }
    } else {
      toggleTab(1);
    }
  }
  function handleSelectContentType(contentType) {
    setContentType(contentType);
    changeTab(2);
  }
  function upsertItem(closePage) {
    const obj = {
      sys: {
        id: updateMode ? props.match.params.id : Math.random().toString(),
        issuer: {
          id: "1",
          fullName: "Saeed Padyab",
          image: ""
        },
        issueDate: "19/01/2019 20:18"
      },
      //contentType: contentType.id,
      contentType: {
        id: contentType.id,
        name: contentType.name,
        title: contentType.title
      },
      //category:category.id,
      category: {
        id: category.id,
        name: category.name
      },
      fields: formData
    };

    if (updateMode) {
      updateContent()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_UPDATE_ON_OK")
            }
          });
          if (closePage) {
            backToProducts();
          } else {
            setResetForm(true);
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
                "UPSERT_ITEM_UPDATE_ON_SERVER_ERROR"
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
                "UPSERT_ITEM_UPDATE_ON_BAD_REQUEST"
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
                "UPSERT_ITEM_UPDATE_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("UPSERT_ITEM_UPDATE_NOT_FOUND")
            }
          });
        })
        .call(obj);
    } else {
      addContent()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ITEM_ADD_ON_OK")
            }
          });
          if (closePage) {
            backToProducts();
          } else {
            setResetForm(true);
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
                "UPSERT_ITEM_ADD_ON_SERVER_ERROR"
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
                "UPSERT_ITEM_ADD_ON_BAD_REQUEST"
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
                "UPSERT_ITEM_ADD_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("UPSERT_ITEM_ADD_NOT_FOUND")
            }
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
            {updateMode ? (
              <div className="item active">Update Mode</div>
            ) : (
              <>
                <div
                  className={["item", tab === 1 ? "active" : ""].join(" ")}
                  onClick={() => changeTab(1)}
                >
                  1.Choosing Item Type
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
              <div className="up-content-title">Choose an item type</div>
              <div className="up-content-itemTypes animated fadeIn ">
                {contentTypes.map(c => (
                  <div key={c.id} className="listGroupItem">
                    <div className="treeItem">
                      {c.images === undefined || c.images.length === 0 ? (
                        <div className="treeItem-icon">
                          <div className="contentIcon">
                            <i className="icon-item-type" />
                          </div>
                        </div>
                      ) : (
                        <div className="treeItem-img">
                          <img src={c.images[0][currentLang]} alt="" />
                        </div>
                      )}

                      {/* <button
                        className="btn btn-primary btn-sm"
                        color="primary"
                        style={{ marginRight: 15 }}
                      >
                        <i className="icon-item-type" />
                      </button> */}
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
                {updateMode ? "Edit " : "Add New "}
                {contentType && contentType.title[currentLang]}
              </div>
              <div className="up-categoryBox animated fadeIn">
                <span>
                  {category ? category.name[currentLang] : "Choose a category"}
                </span>
                <button className="btn btn-link" onClick={showCatgoryModal}>
                  Change category
                </button>
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields &&
                  fields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                <div className="actions">
                  {!updateMode && (
                    <button
                      className="btn btn-primary"
                      onClick={() => upsertItem(false)}
                      disabled={
                        !(
                          Object.keys(formData).length > 0 &&
                          formValidation === undefined &&
                          category !== undefined
                        )
                      }
                    >
                      Save & New
                    </button>
                  )}
                  <button
                    className="btn btn-primary "
                    onClick={() => upsertItem(true)}
                    disabled={
                      !(
                        Object.keys(formData).length > 0 &&
                        formValidation === undefined &&
                        category !== undefined
                      )
                    }
                  >
                    {updateMode ? "Update & Close" : "Save & Close"}
                  </button>
                </div>
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
