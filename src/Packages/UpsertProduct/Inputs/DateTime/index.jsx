import React, { useState } from "react";
import "./styles.scss";

const DateTimeInput = props => {
  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title}</label>
      <textarea
        type="datetime"
        className="form-control up-form-stringInput-textArea"
        placeholder={field.title}

      />
      <small className="form-text text-muted">{field.description}</small>
    </div>
  );
};

export default DateTimeInput;
