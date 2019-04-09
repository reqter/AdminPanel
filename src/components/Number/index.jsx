import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";

const NumberInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const { field, formData } = props;
  const [input, setInput] = useState(
    field.defaultValue ? field.defaultValue : ""
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
        ? setInput(props.formData[field.name][currentLang])
        : setInput(props.formData[field.name])
      : setInput("");
  }, [formData]);

  function setValueToParentForm(inputValue) {
    let value;
    if (field.isTranslate) value = utility.applyeLangs(inputValue);
    else value = inputValue;

    if (field.isRequired) {
      let isValid = false;
      if (inputValue.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }
  function handleOnChange(e) {
    setInput(e.target.value);
    setValueToParentForm(e.target.value);
  }
  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <input
        type="number"
        className="form-control"
        placeholder={field.title[currentLang]}
        value={input}
        onChange={handleOnChange}
      />
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default NumberInput;
