import React, { useState, useEffect } from "react";
import "./styles.scss";

const StringInput = props => {
  const { field } = props;
  const [input, setInput] = useState("");

  useEffect(() => {
    if (props.init && field.isRequired !== undefined && field.isRequired) {
      props.init(field.name);
    }
  }, []);
  function handleOnChange(e) {
    setInput(e.target.value);
    if (field.isRequired) {
      let isValid = false;
      if (e.target.value.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field.name, e.target.value, isValid);
    } else props.onChangeValue(field.name, e.target.value, true);
  }
  if (field.isMultiLine !== undefined && field.isMultiLine) {
    return (
      <div className="form-group">
        <label>{field.title}</label>
        <textarea
          type="text"
          className="form-control up-form-stringInput-textArea"
          placeholder={field.title}
          value={input}
          onChange={handleOnChange}
        />
        <small className="form-text text-muted">{field.description}</small>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <label>{field.title}</label>
        <input
          type="text"
          className="form-control"
          placeholder={field.title}
          value={input}
          onChange={handleOnChange}
        />
        <small className="form-text text-muted">{field.description}</small>
      </div>
    );
  }
};

export default StringInput;
