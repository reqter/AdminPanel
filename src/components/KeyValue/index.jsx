import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager } from "./../../services";

const KeyValueInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  // چک کن ببین فرم دیتا با این اسم فیلد مقدار داره یا نه . الان فقط رو یه اینپوت ست کردم باید رو تک تک اینپوت های زبان ها ست بشه
  const [selectedOption, setSelectedOption] = useState(getSelectedOption());
  function getSelectedOption() {
    if (field.options === undefined || field.options.length === 0) {
      return "";
    }
    const selected = field.options.find(opt => opt.selected === true);

    return selected ? selected.value : "";
  }
  if (field.isRequired !== undefined && field.isRequired) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  // set default value to form data in parent
  useEffect(() => {
    if (!props.formData[field.name]) {
      setValueToParentForm(getSelectedOption());
    }
  }, []);

  // set value to input
  useEffect(() => {
    props.formData[field.name]
      ? setSelectedOption(props.formData[field.name])
      : setSelectedOption("");
  }, [formData]);

  function setValueToParentForm(inputValue) {
    if (field.isRequired) {
      let isValid = false;
      if (inputValue.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, inputValue, isValid);
    } else props.onChangeValue(field, inputValue, true);
  }
  function handleOnChange(e) {
    setSelectedOption(e.target.value);
    setValueToParentForm(e.target.value);
  }
  if (field.appearance === "default") {
    return (
      <div className="form-group">
        <label>{field.title[currentLang]}</label>
        <select
          className="form-control"
          value={selectedOption}
          onChange={handleOnChange}
          disabled
        >
          <option value="">Pick an option</option>
          {field.options &&
            field.options.map(option => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
        </select>
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  } else if (field.appearance === "radioGroup") {
    return (
      <>
        <label>{field.title[currentLang]}</label>
        <div className="up-form-keyvalue-radio">
          {field.options.map(option => (
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id={"radio" + option.key}
                value={option.key}
              />
              <label class="form-check-label" for={"radio" + option.key}>
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="form-group">
        <label>{field.title[currentLang]}</label>
        <select className="form-control">
          {field.options &&
            field.options.map(option => (
              <option value={option.key}>{option.value}</option>
            ))}
        </select>
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  }
};

export default KeyValueInput;
