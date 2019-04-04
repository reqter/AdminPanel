import React, { useState } from "react";
import String from "./../String";
import Number from "./../Number";
import RichText from "./../RichText";
import Media from "./../Media";
import Boolean from "./../Boolean";
import DateTime from "./../DateTime";
import FileUploader from "./../FileUploader";
import Location from "./../Location";
import KeyValue from "./../KeyValue";

const DynamicForm = props => {
  const { resetForm } = props;
  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();
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
      if (key === "url" && field.isBase) delete f["fileType"];
    } else {
      if (key === "url" && field.isBase) {
        f[key] = {
          en: value["en"],
          fa: value["fa"]
        };
        f.fileType = value.fileType;
      } else f[key] = value;
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
  return (
    <div className="up-formInputs animated fadeIn">
      {props.fields.map(field => (
        <div key={field.id} className="rowItem">
          {getFieldItem(field)}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
