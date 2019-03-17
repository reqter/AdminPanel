import React, { useState } from "react";
import "./styles.scss";
import { useGlobalState } from "./../../services";
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
  const [{ categories: categories_data }, dispatch] = useGlobalState();

  let hasContentType = props.location.params
    ? props.location.params.hasContentType
    : checkCategoryHasContentType(categories_data);

  // variables
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [categoryBoxTitle, setCategoryBoxTitle] = useState(
    checkPropsToSetCategoryBoxTitle()
  );
  const [selectedNode, setSelectedNode] = useState(
    props.location.params ? props.location.params.selectedNode : undefined
  );
  const f = selectedNode ? selectedNode.fields : undefined;
  const [fields, setFields] = f
    ? useState(f.sort((a, b) => a.index - b.index))
    : useState(baseFields);

  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState({});
  function setNameToFormValidation(name) {
    setFormValidation(prevFormValidation => ({
      [name]: null,
      ...prevFormValidation
    }));
  }
  function handleOnChangeValue(key, value, isValid) {
    // add value to form
    let f = { ...form };
    f[key] = value;
    setForm(f);
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
  function checkPropsToSetCategoryBoxTitle() {
    const selectedNode =
      props !== undefined
        ? props.location !== undefined
          ? props.location.params !== undefined
            ? props.location.params.selectedNode
            : undefined
          : undefined
        : undefined;
    if (selectedNode === undefined) {
      if (hasContentType !== undefined && hasContentType)
        return "Choose an item type";
      return "Choose a category";
    } else {
      if (selectedNode.itemType) return selectedNode.itemType.name;
      return selectedNode.name;
    }
  }
  function checkCategoryHasContentType(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "contentType") {
        return true;
      }
      if (data[i].children)
        return checkCategoryHasContentType(data[i].children);
    }
  }
  // methods
  function showCatgoryModal() {
    toggleCategoryModal(true);
  }
  function onCloseModel(selected) {
    if (selected !== undefined) {
      setSelectedNode(selected);
      setCategoryBoxTitle(selected.name);
      const f = selected ? selected.fields : undefined;
      setFields(f ? f.sort((a, b) => a.index - b.index) : [...baseFields]);
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
        return <Media field={field} />;
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

  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light">
          <i className="icon-arrow-left2" />
          Back
        </button>
      </div>
      <div className="up-content">
        <main>
          <div className="up-content-title">Add New Product</div>
          <div className="up-categoryBox">
            <span>{categoryBoxTitle}</span>
            <button className="btn btn-link" onClick={showCatgoryModal}>
              {hasContentType ? "Change item" : "Change category"}
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
                disabled={
                  Object.keys(form).length > 0 && formValidation === undefined
                    ? false
                    : true
                }
              >
                Add Item
              </button>
            </div>
          </div>
        </main>
      </div>
      {categoryModal && (
        <CategoriesModal
          categoriesData={categories_data}
          hasContentType={hasContentType}
          onCloseModal={onCloseModel}
        />
      )}
    </div>
  );
};

export default UpsertProduct;
