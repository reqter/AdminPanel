import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../../../services";

const StringInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field } = props;
  const [input, setInput] = useState("");

  useEffect(() => {
    if (props.init && field.isRequired !== undefined && field.isRequired) {
      props.init(field.name);
    }
  }, []);
  function handleOnChange(e) {
    setInput(e.target.value);
    let value = utility.applyeLangs(e.target.value);

    if (field.isRequired) {
      let isValid = false;
      if (e.target.value.length > 0) {
        isValid = true;
      }
      
      props.onChangeValue(field.name, value, isValid);
    } else props.onChangeValue(field.name, value, true);
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
        <small className="form-text text-muted">{field.description[currentLang]}</small>
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
        />
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  }
};

export default StringInput;
