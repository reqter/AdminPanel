import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import { getAssetById, addAsset, updateAsset } from "./../../Api/asset-api";
import {
  String,
  Number,
  DateTime,
  Location,
  Media,
  Boolean,
  KeyValue,
  RichText,
  FileUploader
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
    type: "fileUploader",
    mediaType: "file",
    isBase: true,
    isTranslate: true,
    isRequired: true
  }
];
const UpsertFile = props => {
  // variables
  const [updateMode, toggleUpdateMode] = useState();
  const [tab, changeTab] = useState(); // tab1 ; form , tab2 : errors
  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      if (props.match.params.id.length > 0) {
        getAssetItemById(props.match.params.id);
        toggleUpdateMode(true);
      } else {
        changeTab(2);
      }
    } else {
      toggleUpdateMode(false);
      changeTab(1);
    }
  }, [props.match.params.id]);

  // methods
  function getAssetItemById(id) {
    getAssetById()
      .onOk(result => {
        changeTab(1);
        setFormData(result);
      })
      .notFound(result => {
        changeTab(2);
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
  function handleOnChangeValue(key, value, isValid) {
    // add value to form
    let f = { ...formData };
    if (key === "url") {
      f[key] = {
        en: value["en"],
        fa: value["fa"]
      };
      f.fileType = value.fileType;
    } else f[key] = value;
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
      case "fileuploader":
        return (
          <FileUploader
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
  function backToAssets() {
    props.history.push("/home/assets");
  }

  function upsertItem(closePage) {
    if (updateMode) {
      updateAsset()
        .onOk(result => {
          if (closePage) {
            backToAssets();
          } else {
            setResetForm(true);
            setFormData({});
            setFormValidation();
          }
        })
        .call(formData);
    } else {
      const obj = {
        sys: {
          id: Math.random().toString(),
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: formData.name,
        shorDesc: formData.shortDesc,
        status: {},
        url: formData.url,
        fileType: formData.fileType
      };
      addAsset()
        .onOk(result => {
          if (closePage) {
            backToAssets();
          } else {
            setResetForm(true);
            setFormData({});
            setFormValidation();
          }
        })
        .call(obj);
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
          {tab === 1 && (
            <>
              <div className="up-content-title">
                {updateMode ? "Edit " : "Upload new file"}
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields.map(field => (
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
                          formValidation === undefined
                        )
                      }
                    >
                      Save & New
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => upsertItem(true)}
                    disabled={
                      !(
                        Object.keys(formData).length > 0 &&
                        formValidation === undefined
                      )
                    }
                  >
                    {updateMode ? "Update & Close" : "Save & Close"}
                  </button>
                </div>
              </div>
            </>
          )}
          {tab === 2 && <div className="up-formInputs animated fadeIn" />}
        </main>
      </div>
    </div>
  );
};

export default UpsertFile;
