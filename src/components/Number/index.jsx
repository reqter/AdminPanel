import React, { useState } from "react";
import "./styles.scss";
import { languageManager } from "../../services";

const NumberInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <input type="number" className="form-control" placeholder={field.title} />
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default NumberInput;
