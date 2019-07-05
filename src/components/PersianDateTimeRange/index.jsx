import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useLocale } from "../../hooks";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
//
const DateTimeInput = props => {
  const { appLocale, t, currentLang } = useLocale();

  const { field, formData } = props;
  const [cmpKey, setKey] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disableDaysStartDate, setDisableDaysStartDate] = useState([]);
  const [disableDaysEndDate, setDisableDaysEndDate] = useState([]);

  function initValue() {
    if (formData[field.name]) {
      return formData[field.name];
    } else {
      if (field.showCurrent) {
        if (field.format === "dateTime") return getCurrentDateTime();
        if (field.format === "date") return getCurrentDate();
        if (field.format === "time") return getCurrentTime();
      }
      return "";
    }
  }

  // set value to input (update time and reset form)
  useEffect(() => {
    if (formData[field.name]) {
      if (field.isRequired === true)
        if (props.init) props.init(field.name, true);
    } else {
      if (field.isRequired === true)
        if (props.init) props.init(field.name, false);
    }

    const val = initValue();
    setKey(Math.random());
    if (field.showCurrent) {
      setValueToParentForm(val);
    }
  }, [formData]);

  function getCurrentDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + "-" + mm + "-" + dd;
  }
  function getCurrentTime() {
    var today = new Date();
    let h = today.getHours();
    const m = today.getMinutes();
    if (parseInt(h) > 12) {
      return "0" + (parseInt(h) - 12).toString() + ":" + m + " AM";
    }
    return h + ":" + m + "PM";
  }
  function getCurrentDateTime() {
    return getCurrentDate() + " " + getCurrentTime();
  }
  function setValueToParentForm(inputValue) {
    if (props.onChangeValue) {
      let value = inputValue;

      if (field.isRequired) {
        let isValid = true;
        // if (inputValue.length > 0) isValid = true;
        props.onChangeValue(field, value, isValid);
      } else props.onChangeValue(field, value, true);
    }
  }
  function handleStartDateChanged(e) {
    setStartDate(e);
    const s = e.year + "/" + e.month + "/" + e.day;
    const en = endDate
      ? endDate.year + "/" + endDate.month + "/" + endDate.day
      : "";
    setValueToParentForm({ startDate: s, endDate: en });
    //1398-04-07
    const a = [];
    for (let l = 1; l < e.day; l++) {
      let obj = {
        year: e.year,
        month: e.month,
        day: l,
      };
      a.push(obj);
    }
    for (let j = 1; j < e.month; j++) {
      let daysCount = j < 7 ? 31 : 30;
      for (let h = 1; h <= daysCount; h++) {
        let obj = {
          year: 1398,
          month: j,
          day: h,
        };
        a.push(obj);
      }
    }
    for (let k = 1; k <= 2; k++) {
      for (let j = 1; j <= 12; j++) {
        let daysCount = j < 7 ? 31 : 30;
        for (let h = 1; h <= daysCount; h++) {
          let obj = {
            year: e.year - k,
            month: j,
            day: h,
          };
          a.push(obj);
        }
      }
    }
    setDisableDaysEndDate(a);
  }
  function handleEndDateChanged(e) {
    setEndDate(e);
    const st = startDate
      ? startDate.year + "/" + startDate.month + "/" + startDate.day
      : "";
    const en = e ? e.year + "/" + e.month + "/" + e.day : "";
    setValueToParentForm({ startDate: st, endDate: en });

    const a = [];
    for (let l = e.day + 1; l <= 31; l++) {
      let obj = {
        year: e.year,
        month: e.month,
        day: l,
      };
      a.push(obj);
    }
    for (let j = e.month + 1; j <= 12; j++) {
      let daysCount = j < 7 ? 31 : 30;
      for (let h = 1; h <= daysCount; h++) {
        let obj = {
          year: 1398,
          month: j,
          day: h,
        };
        a.push(obj);
      }
    }
    for (let k = 1; k <= 2; k++) {
      for (let j = 1; j <= 12; j++) {
        let daysCount = j < 7 ? 31 : 30;
        for (let h = 1; h <= daysCount; h++) {
          let obj = {
            year: e.year + k,
            month: j,
            day: h,
          };
          a.push(obj);
        }
      }
    }
    setDisableDaysStartDate(a);
  }

  return (
    <div className="rangeDate">
      <div className="rangeDate__left">
        <label>
          {field.label
            ? field.label.startDate[currentLang]
              ? field.label.startDate[currentLang]
              : field.name
            : field.title
            ? field.title[currentLang]
              ? field.title[currentLang]
              : field.title
            : field.name}
        </label>
        <DatePicker
          selectedDay={startDate}
          onChange={handleStartDateChanged}
          inputPlaceholder={t("START_DATE")}
          inputClassName="form-control"
          disabledDays={disableDaysStartDate}
        />
        <small className="form-text text-muted">
          {field.description &&
            field.description[currentLang] &&
            field.description[currentLang]}
        </small>
      </div>
      <div className="rangeDate__right">
        <label>
          {field.label
            ? field.label.endDate[currentLang]
              ? field.label.endDate[currentLang]
              : field.name
            : field.title
            ? field.title[currentLang]
              ? field.title[currentLang]
              : field.title
            : field.name}
        </label>
        <DatePicker
          selectedDay={endDate}
          onChange={handleEndDateChanged}
          inputPlaceholder={t("END_DATE")}
          inputClassName="form-control"
          disabledDays={disableDaysEndDate}
        />
        <small className="form-text text-muted">
          {field.description &&
            field.description[currentLang] &&
            field.description[currentLang]}
        </small>
      </div>
    </div>
  );
};

export default DateTimeInput;
