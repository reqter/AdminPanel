import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./styles.scss";
import { languageManager, utility } from "../../services";
import { getByContentTypes } from "./../../Api/content-api";
const currentLang = languageManager.getCurrentLanguage().name;

const ReferenceInput = props => {
  const { field, formData } = props;
  // چک کن ببین فرم دیتا با این اسم فیلد مقدار داره یا نه . الان فقط رو یه اینپوت ست کردم باید رو تک تک اینپوت های زبان ها ست بشه
  const [input, setInput] = useState(
    field.defaultValue ? field.defaultValue : ""
  );
  const [selected, setSelected] = useState();

  const [options, setOptions] = useState([]);

  // set default value to form data in parent
  useEffect(() => {
    getByContentTypes()
      .onOk(result => {
        if (result) {
          setOptions(result);
        }
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(() => {})
      .call(field.references);
    if (field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
  }, []);

  // set value to input
  useEffect(() => {
    props.formData[field.name]
      ? field.isTranslate
        ? setInput(props.formData[field.name][currentLang])
        : setInput(props.formData[field.name])
      : setInput("");
  }, [formData]);

  function setValueToParentForm(inputValue) {
    let value = inputValue;

    if (field.isRequired) {
      let isValid = false;
      if (inputValue.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }
  function handleChange(item) {
    setInput(selected);
    console.log();
    //setValueToParentForm(selected);
  }

  return (
    <div className="form-group">
      <label>{field.title[currentLang]}</label>
      <Select
        value={selected}
        onChange={handleChange}
        options={options}
        isMulti={field.isList}
        isSearchable={true}
        components={{ Option: CustomOption, MultiValueLabel }}
      />
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default ReferenceInput;

const MultiValueLabel = props => {
  const { data } = props;
  return (
    <components.MultiValueLabel {...props}>
      <div className="custome-select-selected">
        {data.fields["thumbnail"] && data.fields["thumbnail"].length > 0 && (
          <div className="selectedItemImage">
            <img src={data.fields["thumbnail"][0][currentLang]} alt="" />
          </div>
        )}
        <div className="selectedItemName">
          {data.fields.name && data.fields.name[currentLang]}
        </div>
      </div>
    </components.MultiValueLabel>
  );
};

const CustomOption = ({ innerProps, isDisabled, data }) => {
  if (!isDisabled) {
    return (
      <div {...innerProps} className="custom-select-item">
        <div className="imageItem">
          {data.fields["thumbnail"] && data.fields["thumbnail"].length > 0 ? (
            <img src={data.fields["thumbnail"][0][currentLang]} alt="" />
          ) : (
            <div className="imageItem-empty">No Image</div>
          )}
        </div>
        <div className="itemName">
          <span>{data.fields.name && data.fields.name[currentLang]}</span>
          <span>
            {data.fields.shortDesc && data.fields.shortDesc[currentLang]}
          </span>
        </div>
        <div className="itemBy">
          <span>{data.sys.issuer && data.sys.issuer.fullName}</span>
          <span>{data.sys.issueDate && data.sys.issueDate}</span>
        </div>
        <div className="itemStatus">
          <span>
            {data.fields.status &&
              languageManager.translate(data.fields.status)}
          </span>
        </div>
      </div>
    );
  } else return null;
};
