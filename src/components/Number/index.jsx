import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";

const validkeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const NumberInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const { field, formData } = props;
  const [resetInputLocaly, setResetLocaly] = useState(true);
  // چک کن ببین فرم دیتا با این اسم فیلد مقدار داره یا نه . الان فقط رو یه اینپوت ست کردم باید رو تک تک اینپوت های زبان ها ست بشه
  const value = props.formData[field.name]
    ? field.isTranslate
      ? props.formData[field.name][currentLang]
      : props.formData[field.name]
    : "";

  const [input, setInput] = useState(value);
  
  if (
    props.init &&
    field.isRequired !== undefined &&
    field.isRequired &&
    !props.reset
  ) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  useEffect(() => {
    props.formData[field.name]
      ? field.isTranslate
        ? setInput(props.formData[field.name][currentLang])
        : setInput(props.formData[field.name])
      : setInput("");

    if (props.reset && resetInputLocaly) {
      setResetLocaly(false);
      setInput("");
    }
  }, [props.reset, formData]);

  function handleOnChange(e) {
    setInput(e.target.value);

    let value;
    if (field.isTranslate) value = utility.applyeLangs(e.target.value);
    else value = e.target.value;

    if (field.isRequired) {
      let isValid = false;
      if (e.target.value.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }
  function handleOnKeyDown(e) {
    if (validkeys.indexOf(e.key) < 0) return false;
  }
  if (field.isMultiLine !== undefined && field.isMultiLine) {
    return (
      <div className="form-group">
        <label>{field.title[currentLang]}</label>
        <textarea
          type="text"
          className="form-control up-form-stringInput-textArea"
          placeholder={field.title[currentLang]}
          value={input}
          onChange={handleOnChange}
        />
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <label>{field.title[currentLang]}</label>
        <input
          type="text"
          className="form-control"
          placeholder={field.title[currentLang]}
          value={input}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  }
};

export default NumberInput;
