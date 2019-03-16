import React, { useState } from "react";
import "./styles.scss";

const NumberInput = props => {
  const { field } = props;
  return (
    <div className="form-group">
      <label>{field.title}</label>
      <input
        type="number"
        className="form-control"
        placeholder={field.title}
      />
      <small className="form-text text-muted">{field.description}</small>
    </div>
  );
};

export default NumberInput;
