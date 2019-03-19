import React, { useState } from "react";
import "./styles.scss";
import { languageManager } from "../../../../services";

const DateTimeInput = props => {
    const currentLang = languageManager.getCurrentLanguage().name;
  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <textarea
        type="datetime"
        className="form-control up-form-stringInput-textArea"
        placeholder={field.title[currentLang]}

      />
      <small className="form-text text-muted">{field.description[currentLang]}</small>
    </div>
  );
};

export default DateTimeInput;
