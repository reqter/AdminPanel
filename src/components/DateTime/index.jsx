import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager } from "../../services";

const StringInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const { field, formData } = props;
  const [input, setInput] = useState();

  function initValue() {
    if (field.showCurrent) {
      if (field.format === "dateTime") return getCurrentDateTime();
      if (field.format === "date") return getCurrentDate();
      if (field.format === "time") return getCurrentTime();
    }
    return "";
  }

  // set default value to form data in parent
  useEffect(() => {
    if (field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
  }, []);

  // set value to input (update time and reset form)
  useEffect(() => {
    if (formData[field.name]) {
      setInput(props.formData[field.name]);
    } else {
      if (field.showCurrent) {
        const val = initValue();
        setInput(val);
        setValueToParentForm(val);
      } else setInput("");
    }
  }, [formData]);

  function getCurrentDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return mm + "/" + dd + "/" + yyyy;
  }
  function getCurrentTime() {
    var today = new Date();
    return (
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    );
  }
  function getCurrentDateTime() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    //2019-04-19T01:00"
    return date + "T" + time;
  }
  function setValueToParentForm(inputValue) {
    let value = inputValue;

    if (field.isRequired) {
      let isValid = false;
      if (inputValue.length > 0) isValid = true;

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
        type={
          field.format
            ? field.format === "dateTime"
              ? "datetime-local"
              : field.format === "date"
              ? "date"
              : field.format === "time"
              ? "time"
              : "datetime-local"
            : "datetime-local"
        }
        className="form-control"
        placeholder={field.title[currentLang]}
        value={input}
        onChange={handleOnChange}
        readOnly={props.viewMode}
      />
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default StringInput;
