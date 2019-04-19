import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager } from "../../services";

const StringInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const { field, formData } = props;
  const [latitude, setLatitude] = useState(
    field.defaultValue ? field.defaultValue.latitude : ""
  );
  const [longitude, setLongitude] = useState(
    field.defaultValue ? field.defaultValue.longitude : ""
  );

  // set default value to form data in parent
  useEffect(() => {
    if (field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
  }, []);

  // set value to input
  useEffect(() => {
    if (formData[field.name]) {
      setValueToInput(props.formData[field.name]);
    } else {
      if (field.defaultValue) {
        setValueToInput(field.defaultValue);
        props.onChangeValue(field, field.defaultValue, true);
      } else setValueToInput({});
    }
  }, [formData]);

  function setValueToInput(obj) {
    setLatitude(obj.latitude ? obj.latitude : "");
    setLongitude(obj.longitude ? obj.longitude : "");
  }

  function setValueToParentForm(lat, long) {
    let value = {
      latitude: lat,
      longitude: long,
    };

    if (field.isRequired) {
      let isValid = false;
      if (lat.length > 0 && long.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }
  function handleLatitudeChange(e) {
    setLatitude(e.target.value);
    setValueToParentForm(e.target.value, longitude);
  }
  function handleLongitudeChange(e) {
    setLongitude(e.target.value);
    setValueToParentForm(latitude, e.target.value);
  }
  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <div className="row">
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder={languageManager.translate("LATITUDE")}
            value={latitude}
            onChange={handleLatitudeChange}
            readOnly={props.viewMode}
          />
        </div>
        <div className="col">
          <input
            type="number"
            placeholder={languageManager.translate("LONGITUDE")}
            className="form-control"
            value={longitude}
            onChange={handleLongitudeChange}
            readOnly={props.viewMode}
          />
        </div>
      </div>
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default StringInput;
