import React, { useState } from "react";
import "./styles.scss";
import { languageManager } from "../../../../services";

const BooleanComponent = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field } = props;
  if (field.appearance === "checkbox") {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={"chk" + field.id}
        />
        <label className="form-check-label" for={"chk" + field.id}>
          {field.title[currentLang]}
        </label>
      </div>
    );
  } else {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={"chk" + field.id}
        />
        <label className="form-check-label" for={"chk" + field.id}>
          {field.title[currentLang]}
        </label>
      </div>
    );
  }
};

export default BooleanComponent;
