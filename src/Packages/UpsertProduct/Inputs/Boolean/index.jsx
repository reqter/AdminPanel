import React, { useState } from "react";
import "./styles.scss";

const BooleanComponent = props => {
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
          {field.title}
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
          {field.title}
        </label>
      </div>
    );
  }
};

export default BooleanComponent;
