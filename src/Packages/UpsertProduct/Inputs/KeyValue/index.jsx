import React, { useState } from "react";
import "./styles.scss";

const KeyValueInput = props => {
  const { field } = props;
  if (field.appearance === "combo") {
    return (
      <div className="form-group">
        <label>{field.title}</label>
        <select className="form-control">
          {field.options &&
            field.options.map(option => (
              <option value={option.key}>{option.value}</option>
            ))}
        </select>
        <small className="form-text text-muted">{field.description}</small>
      </div>
    );
  } else if (field.appearance === "radioGroup") {
    return (
      <>
        <label>{field.title}</label>
        <div className="up-form-keyvalue-radio">
          {field.options.map(option => (
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id={"radio" + option.key}
                value={option.key}
              />
              <label class="form-check-label" for={"radio" + option.key}>
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="form-group">
        <label>{field.title}</label>
        <select className="form-control">
          {field.options &&
            field.options.map(option => (
              <option value={option.key}>{option.value}</option>
            ))}
        </select>
        <small className="form-text text-muted">{field.description}</small>
      </div>
    );
  }
};

export default KeyValueInput;
