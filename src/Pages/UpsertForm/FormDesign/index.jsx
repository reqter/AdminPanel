import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "../../../hooks";
import Select, { components } from "react-select";
//
import "./styles.scss";
import { Empty } from "./../../../components/Commons/ErrorsComponent";
//
export default function DesignForm(props) {
  const { t, currentLang, direction } = useLocale();
  const { fields } = props.contentType;
  const [allFields, setAllFeilds] = useState(() => {
    const f = fields.map(item => {
      return {
        value: item.description
          ? item.description[currentLang]
            ? item.description[currentLang].length > 0
              ? item.description[currentLang]
              : item.title
              ? item.title[currentLang]
                ? item.title[currentLang]
                : item.name
              : item.name
            : item.title
            ? item.title[currentLang]
              ? item.title[currentLang]
              : item.name
            : item.name
          : item.title
          ? item.title[currentLang]
            ? item.title[currentLang]
            : item.name
          : item.name,
        item,
      };
    });
    return f;
  });
  const [selectedField, setSelected] = useState();
  const [selectedFields, setSelectedFields] = useState();

  useEffect(() => {
    if (props.fieldsOrder && props.fieldsOrder.length > 0) {
      setSelectedFields(props.fieldsOrder);
    }
  }, [props.fieldsOrder]);

  function handleQuestionSelect(q) {
    setSelected(q);
  }
  function handlePlusClicked() {
    setSelected();
    if (selectedField) {
      const { item } = selectedField;
      if (item) {
        let newFields = [];
        if (selectedFields) {
          const r = selectedFields.filter(f => f.name === item.name);
          if (!r || r.length === 0) {
            newFields = [...selectedFields];
            newFields.push(item);
            setSelectedFields(newFields);
            callParentFieldsOrder(newFields);
          }
        }
      }
    }
  }
  function handleUpClicked(item, index) {
    let b = selectedFields.filter(f => f.name !== item.name);
    b.splice(index - 1, 0, item);
    setSelectedFields(b);
    callParentFieldsOrder(b);
  }
  function handleDownClicked(item, index) {
    let b = selectedFields.filter(f => f.name !== item.name);
    b.splice(index + 1, 0, item);
    setSelectedFields(b);
    callParentFieldsOrder(b);
  }

  function handleDeleteClicked(item) {
    const r = selectedFields.filter(f => f.name !== item.name);
    setSelectedFields(r);
    callParentFieldsOrder(r);
  }
  function callParentFieldsOrder(fs) {
    if (props.orderChanged) {
      props.orderChanged(fs);
    }
  }
  function changeTab() {
    if (props.onNextBtnClicked) {
      props.onNextBtnClicked();
    }
  }
  return (
    <div className="designForm">
      <div className="designForm__header">
        <div className="designForm__header__left">
          <h5 className="designForm__title">{t("UPSERT_FORM_DESIGN_TITLE")}</h5>
          <span className="designForm__desc">
            {t("UPSERT_FORM_DESIGN_DESC")}
          </span>
        </div>
        <div className="designForm__header__right">
          <button className="btn btn-primary btn-sm" onClick={changeTab}>
            {t("UPSERT_FORM_DESIGN_HEADER_NEXT_BTN")}
            <i
              className={
                "icon-arrow-" + (direction === "ltr" ? "right2" : "left2")
              }
            />
          </button>
        </div>
      </div>
      <div className="designForm__content">
        <div className="box designForm__fieldsOrder">
          <div className="designFormBox-header">
            <div className="designFormBox-header__icon">
              <i className="icon-list" />
            </div>
            <span className="designFormBox-header__info">
              {t("UPSERT_FORM_DESIGN_FIELDS_TITLE")}
            </span>
          </div>
          <div className="fieldsBox">
            <div className="fieldsBox__top">
              <Select
                key={selectedField}
                menuPlacement="bottom"
                closeMenuOnScroll={true}
                closeMenuOnSelect={true}
                // defaultValue={true && getSelectedOption()}
                onChange={handleQuestionSelect}
                options={allFields}
                isMulti={false}
                isSearchable={true}
                className="select"
                placeholder={t("UPSERT_FORM_DESIGN_FIELDS_SELECT_PLACEHOLDER")}
                value={selectedField}
                components={{
                  Option: CustomOption,
                  SingleValue,
                  IndicatorSeparator,
                  IndicatorsContainer,
                  NoOptionsMessage,
                }}
              />
              <button className="btn btn-primary" onClick={handlePlusClicked}>
                <i className="icon-plus" />
              </button>
            </div>
            <div className="fieldsBox__bottom">
              {!selectedFields || selectedFields.length === 0 ? (
                <div className="emptyFields">
                  <Empty />
                  <span className="title">{t("EMPTY_LIST")}</span>
                  <span className="info">
                    {t("UPSERT_FORM_DESIGN_FIELDS_EMPTY_LIST_INFO")}
                  </span>
                </div>
              ) : (
                selectedFields.map((f, index) => (
                  <div className="selectedField animated fadeIn" key={f.name}>
                    <i className={"icon " + getFieldIcon(f.type)} />
                    <span className="title">
                      {f.description
                        ? f.description[currentLang]
                          ? f.description[currentLang]
                          : f.title
                          ? f.title[currentLang]
                            ? f.title[currentLang]
                            : f.name
                          : f.name
                        : f.title
                        ? f.title[currentLang]
                          ? f.title[currentLang]
                          : f.name
                        : f.name}
                    </span>
                    <div className="actions">
                      {index !== 0 && (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => handleUpClicked(f, index)}
                        >
                          <i className="icon-arrow-up2" />
                        </button>
                      )}
                      {index !== selectedFields.length - 1 && (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => handleDownClicked(f, index)}
                        >
                          <i className="icon-arrow-down2" />
                        </button>
                      )}
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => handleDeleteClicked(f)}
                      >
                        <i className="icon-bin" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function getFieldIcon(type) {
  switch (type.toLowerCase()) {
    case "string":
      return "icon-file-text";
    case "number":
      return "icon-number";
    case "datetime":
      return "icon-calendar";
    case "location":
      return "icon-location";
    case "media":
      return "icon-images";
    case "boolean":
      return "icon-boolean";
    case "keyvalue":
      return "icon-combo-box";
    case "richtext":
      return "icon-file-text-o";
    case "jsonobject":
      return "icon-json-file";
    case "reference":
      return "icon-reference";
    default:
      break;
  }
}
const SingleValue = props => {
  const { currentLang, t } = useLocale();
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="selectValue">
        {data.item.description && data.item.description[currentLang]
          ? data.item.description[currentLang]
          : data.item.title
          ? data.item.title[currentLang]
            ? data.item.title[currentLang]
            : data.item.name
          : data.item.name}
      </div>
    </components.SingleValue>
  );
};
const NoOptionsMessage = props => {
  const { t } = useLocale();
  return (
    <components.NoOptionsMessage {...props}>
      <div>{t("EMPTY_LIST")}</div>
    </components.NoOptionsMessage>
  );
};

const IndicatorSeparator = ({ innerProps }) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};
const indicatorSeparatorStyle = {
  display: "none",
};
const IndicatorsContainer = props => {
  return (
    <div style={{ display: "none" }}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};
const CustomOption = ({ innerProps, isDisabled, data }) => {
  const { currentLang, t } = useLocale();
  if (!isDisabled) {
    return (
      <div {...innerProps} className="allFields-items">
        <i className={"icon " + getFieldIcon(data.item.type)} />
        <div className="title">
          <span className="question">
            {data.item.description
              ? data.item.description[currentLang]
                ? data.item.description[currentLang]
                : data.item.title
                ? data.item.title[currentLang]
                  ? data.item.title[currentLang]
                  : data.item.name
                : data.item.name
              : data.item.title
              ? data.item.title[currentLang]
                ? data.item.title[currentLang]
                : data.item.name
              : data.item.name}
          </span>
          <span>
            {data.item.title &&
              data.item.title[currentLang] &&
              data.item.title[currentLang]}
          </span>
        </div>
      </div>
    );
  } else return null;
};
