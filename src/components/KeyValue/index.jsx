import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./styles.scss";
import { languageManager } from "./../../services";

const KeyValueInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;

  function getSelectedOption() {
    if (field.options === undefined || field.options.length === 0)
      return undefined;
    if (field.isList) {
      const selected = field.options.filter(opt => opt.selected === true);
      setValueToParentForm(selected);
      return selected;
    } else {
      const selected = field.options.find(opt => opt.selected === true);
      setValueToParentForm(selected);
      return selected;
    }
  }

  // set default value to form data in parent
  useEffect(() => {
    if (field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
  }, []);

  // set value to input
  useEffect(() => {
    // props.formData[field.name]
    //   ? setSelectedOption(props.formData[field.name])
    //   : setSelectedOption("");
  }, [formData]);

  function setValueToParentForm(input) {
    if (field.isList) {
      let s = [];
      for (let i = 0; i < input.length; i++) {
        s.push(input[i].value);
      }
      if (field.isRequired) {
        let isValid = false;
        if (s.length > 0) {
          isValid = true;
        }
        props.onChangeValue(field, s, isValid);
      } else props.onChangeValue(field, s, true);
    } else {
      if (field.isRequired) {
        let isValid = false;
        if (input.value.length > 0) {
          isValid = true;
        }
        props.onChangeValue(field, input.value, isValid);
      } else props.onChangeValue(field, input.value, true);
    }
  }
  function handleOnChange(selected) {
    // setSelectedOption(selected);
    setValueToParentForm(selected);
  }
  if (field.appearance === "default") {
    return (
      <div className="form-group">
        <label>{field.title[currentLang]}</label>
        <Select
          menuPlacement="top"
          closeMenuOnScroll={true}
          closeMenuOnSelect={!field.isList}
          //value={selectedOption}
          defaultValue={true && getSelectedOption()}
          onChange={handleOnChange}
          options={field.options}
          isMulti={field.isList}
          isSearchable={true}
          isDisabled={props.viewMode}
          components={{
            Option: CustomOption,
            MultiValueLabel,
            SingleValue,
          }}
        />
        <small className="form-text text-muted">
          {field.description[currentLang]}
        </small>
      </div>
    );
  } else if (field.appearance === "radioGroup") {
    return (
      <>
        <label>{field.title[currentLang]}</label>
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
  }
};

export default KeyValueInput;

const SingleValue = props => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="options-single-selected">{data.value}</div>
    </components.SingleValue>
  );
};
const MultiValueLabel = props => {
  const { data } = props;
  return (
    <components.MultiValueLabel {...props}>
      <div className="options-multiple-selected">{data.value}</div>
    </components.MultiValueLabel>
  );
};

const CustomOption = ({ innerProps, isDisabled, data }) => {
  if (!isDisabled) {
    return (
      <div {...innerProps} className="options-items">
        {data.value}
      </div>
    );
  } else return null;
};
