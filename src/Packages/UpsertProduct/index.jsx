import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
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
        toggleTab(1);
      }
    } else toggleTab(1);
  }, [props.match.params.id]);

  // methods
  function getItemById(id) {
    selectedItem = contents.find(item => item.sys.id === id);
    if (selectedItem) {
      if (tab !== 2) toggleTab(2);
      setFormData(selectedItem.fields);
      setContentType(selectedItem.contentType);
      const c = contentTypes.find(
        item => item.id === selectedItem.contentType.id
      );
      setFields(c.fields.sort((a, b) => a.index - b.index));
      setCategory(selectedItem.category);
    } else {
      toggleTab(3);
    }
  }
  function setNameToFormValidation(name) {
    setFormValidation(prevFormValidation => ({
      [name]: null,
      ...prevFormValidation
    }));
  }
  function handleOnChangeValue(key, value, isValid) {
    // add value to form
    let f = { ...formData };
    f[key] = value;
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
  function backToProducts() {
    props.history.push("/home/products");
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
      dispatch({
        type: "UPDATE_ITEM",
        value: obj
      });
    } else {
      dispatch({
        type: "ADD_ITEM_TO_CONTENTS",
        value: obj
      });
    }
    if (closePage) {
      backToProducts();
    }
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToProducts}>
          <i className="icon-arrow-left2" />
          Back
        </button>
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
                      <button
                        className="btn btn-primary btn-sm"
                        color="primary"
                        style={{ marginRight: 15 }}
                      >
                        <i className="icon-item-type" />
                      </button>
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
                      className="btn btn-primary "
                      onClick={() => upsertItem(false)}
                      disabled={
                        Object.keys(formData).length > 0 &&
                        formValidation === undefined &&
                        category !== undefined
                          ? false
                          : true
                      }
                    >
                      Save & New
                    </button>
                  )}
                  <button
                    className="btn btn-primary "
                    onClick={() => upsertItem(true)}
                    disabled={
                      Object.keys(formData).length > 0 &&
                      formValidation === undefined &&
                      category !== undefined
                        ? false
                        : true
                    }
                  >
                    {updateMode ? "Update & Close" : "Save & Close"}
                  </button>
                </div>
              </div>
            </>
          )}
          {tab === 3 && (
            <>
              <div className="up-content-title">Error has occurred</div>
              <div className="up-error-section" />
            </>
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
