import React, { useState } from "react";
import "./styles.scss";

const RichTextInput = props => {
  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title}</label>
      <textarea
        type="text"
        className="form-control up-form-richtext-textArea"
        placeholder={field.title}
      />
      <small className="form-text text-muted">{field.description}</small>
    </div>
  );
};

export default RichTextInput;
