import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "./../../services";

const BooleanComponent = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [resetInputLocaly, setResetLocaly] = useState(true);
  // چک کن ببین فرم دیتا با این اسم فیلد مقدار داره یا نه . الان فقط رو یه اینپوت ست کردم باید رو تک تک اینپوت های زبان ها ست بشه
  const chk_value = props.formData[field.name]
    ? field.isTranslate
      ? props.formData[field.name][currentLang]
      : props.formData[field.name]
    : false;
  const [value, setValue] = useState(chk_value);

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
        ? setValue(props.formData[field.name][currentLang])
        : setValue(props.formData[field.name])
      : setValue(false);

    if (props.reset && resetInputLocaly) {
      setResetLocaly(false);
      setValue(false);
    }
  }, [props.reset, formData]);

  function handleCheckboxValue(e) {
    setValue(e.target.checked);
    let value = e.target.checked;
    if (field.isRequired) {
      let isValid = false;
      if (value) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }

  if (field.appearance === "default") {
    return (
      <div className="custom_checkbox" style={{ marginTop: 10 }}>
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
      <div className="custom_checkbox" style={{ marginTop: 10 }}>
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
