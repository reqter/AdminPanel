import React, { useState } from "react";
import "./styles.scss";
import { languageManager } from "../../services";

const RichTextInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <textarea
        type="text"
        className="form-control up-form-richtext-textArea"
        placeholder={field.title}
      />
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default RichTextInput;
