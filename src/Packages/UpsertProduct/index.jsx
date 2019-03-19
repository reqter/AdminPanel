import React, { useState } from "react";
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
} from "./Inputs";

const baseFields = [
  {
    id: "3333",
    index: 1,
    name: "name",
    title: "Name",
    description: "Name of product",
    type: "string",
    isBase: true,
    isRequired: true
  },
  {
    id: "6666",
    name: "shortDesc",
    title: "Short Description",
    description: "",
    type: "string",
    isBase: true,
    index: 2,
    isMultiLine: true
  },
  {
    id: "4444",
    name: "thumbnail",
    title: "Thumbnail",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "media",
    mediaType: "image",
    isList: false,
    isBase: true,
    index: 3
  }
  //   {
  //     id: "5555",
  //     name: "images",
  //     title: "Images",
  //     description: "Lorem ipsum dolor sit amet, consectetur",
  //     type: "media",
  //     isBase: true,
  //     isList: true,
  //     mediaType: "image",
  //     index: 4
  //   },

  //   {
  //     id: "7777",
  //     name: "longDesc",
  //     title: "Long Description",
  //     description: "Lorem ipsum dolor sit amet, consectetur",
  //     type: "richText",
  //     isBase: true,
  //     index: 5
  //   }
];

const UpsertProduct = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories, contentTypes, contents }, dispatch] = useGlobalState();

  // variables
  const [tab, toggleTab] = useState(props.location.params ? 2 : 1);
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [category, setCategory] = useState();
  const [contentType, setContentType] = useState(
    props.location.params
      ? { title: "Generic Item" }
      : //? props.location.params.selectedItem.contentType
        undefined
  );
  const [fields, setFields] = useState();

  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState({});
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

  // methods
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
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "number":
        return <Number field={field} />;
      case "datetime":
        return <DateTime field={field} />;
      case "location":
        return <Location field={field} />;
      case "media":
        return (
          <Media
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "boolean":
        return <Boolean field={field} />;
      case "keyvalue":
        return <KeyValue field={field} />;
      case "richtext":
        return <RichText field={field} />;
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
    changeTab(2);
    setContentType(contentType);
  }
  function upsertItem() {
    const obj = {
      sys: {
        id: Math.random().toString(),
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
    let d = [...contents];
    d.push(obj);
    dispatch({
      type: "SET_CONTENTS",
      value: d
    });
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToProducts}>
          <i className="icon-arrow-left2" />
          Back
        </button>
        <div className="tabItems">
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
                Add New {contentType.title[currentLang]}
              </div>
              <div className="up-categoryBox">
                <span>
                  {category ? category.name[currentLang] : "Choose a category"}
                </span>
                <button className="btn btn-link" onClick={showCatgoryModal}>
                  Change category
                </button>
              </div>
              <div className="up-formInputs">
                {fields &&
                  fields.map(field => (
                    <div key={field.id} className="rowItem">
                      {getFieldItem(field)}
                    </div>
                  ))}
                <div className="actions">
                  <button
                    className="btn btn-primary "
                    onClick={upsertItem}
                    disabled={
                      Object.keys(formData).length > 0 &&
                      formValidation === undefined &&
                      category !== undefined
                        ? false
                        : true
                    }
                  >
                    Add Item
                  </button>
                </div>
              </div>
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
