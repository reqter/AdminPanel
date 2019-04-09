import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "./../../services";

const BooleanComponent = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;

  const [value, setValue] = useState(
    field.defaultValue ? field.defaultValue : false
  );

  if (field.isRequired !== undefined && field.isRequired) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  // set default value to form data in parent
  useEffect(() => {
    if (field.defaultValue && !props.formData[field.name]) {
      setValueToParentForm(field.defaultValue);
    }
  }, []);

  // set value to input
  useEffect(() => {
    props.formData[field.name]
      ? field.isTranslate
        ? setValue(props.formData[field.name][currentLang])
        : setValue(props.formData[field.name])
      : setValue(false);
  }, [formData]);

  function setValueToParentForm(inputValue) {
    let value = inputValue;
    if (field.isRequired) {
      let isValid = false;
      if (value) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }

  function handleCheckboxValue(e) {
    setValue(e.target.checked);
    setValueToParentForm(e.target.checked);
  }

  if (field.appearance === "default") {
    return (
      <div
        className="custom_checkbox"
        style={{
          marginTop: 10
        }}
      >
        <div className="left">
          <label className="checkBox">
            <input
              type="checkbox"
              id={"chk" + field.sys.id}
              checked={value}
              onChange={handleCheckboxValue}
            />
            <span className="checkmark" />
          </label>
        </div>
        <div className="right">
          <label for={"chk" + field.sys.id}>{field.title[currentLang]}</label>
          <label>{field.description[currentLang]}</label>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="custom_checkbox"
        style={{
          marginTop: 10
        }}
      >
        <div className="left">
          <label className="checkBox">
            <input
              type="checkbox"
              id={"chk" + field.sys.id}
              checked={value}
              onChange={handleCheckboxValue}
            />
            <span className="checkmark" />
          </label>
        </div>
        <div className="right">
          <label for={"chk" + field.sys.id}>{field.title[currentLang]}</label>
          <label>{field.description[currentLang]}</label>
        </div>
      </div>
    );
  }
};

export default BooleanComponent;
