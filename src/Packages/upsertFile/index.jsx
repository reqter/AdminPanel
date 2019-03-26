import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
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

const fields = [
  {
    id: "1",
    name: "name",
    title: {
      en: "Name",
      fa: "Name"
    },
    description: {
      fa: "name of each product",
      en: "name of each product"
    },
    type: "string",
    isBase: true,
    isTranslate: true,
    isRequired: true
  },
  {
    id: "2",
    name: "shortDesc",
    title: {
      fa: "Short Description",
      en: "Short Description"
    },
    description: {
      fa: "",
      en: ""
    },
    type: "string",
    isBase: true,
    isTranslate: true
  },
  {
    id: "3",
    name: "url",
    title: {
      fa: "Your File",
      en: "Your File"
    },
    description: {
      fa: "",
      en: "Click on file selector top choose your file"
    },
    type: "media",
    mediaType: "file",
    isBase: true,
    isTranslate: true,
    isRequired: true
  }
];
const UpsertFile = props => {
  let selectedItem;
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ assets }, dispatch] = useGlobalState();
  // variables
  const [updateMode, toggleUpdateMode] = useState(
    props.match.params.id ? true : false
  );
  const [category, setCategory] = useState();

  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();

  useEffect(() => {
    if (updateMode) {
      if (props.match.params.id !== undefined) {
        if (props.match.params.id.length > 0) {
          toggleUpdateMode(true);
          getAssetItemById(props.match.params.id);
        }
      }
    }
  }, [props.match.params.id]);

  // methods
  function getAssetItemById(id) {}
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
  function backToAssets() {
    props.history.push("/home/assets");
  }

  function upsertItem(closePage) {
    if (!updateMode) {
      const obj = {
        id: Math.random.toString(),
        name: formData.name,
        url: formData.url,
        dimention: "312 * 215 px",
        type: formData.type,
        updated: "just now",
        by: "Me",
        mediaType: "image"
      };
      dispatch({
        type: "ADD_ITEM_TO_ASSETS",
        value: obj
      });
    }
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToAssets}>
          <i className="icon-arrow-left2" />
          Back
        </button>
        <div className="tabItems">
          <div className="item active">1.Upload new file</div>
        </div>
      </div>
      <div className="up-content">
        <main>
          <div className="up-content-title">
            {updateMode ? "Edit " : "Upload new file"}
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
                    Object.keys(formData).length > 0 &&
                    formValidation === undefined
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
                  formValidation === undefined
                    ? false
                    : true
                }
              >
                {updateMode ? "Update & Close" : "Save & Close"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpsertFile;
