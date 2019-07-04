import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useLocale } from "../../hooks";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";

var moment = require("moment");
//
const DateTimeInput = props => {
  const { appLocale, t, currentLang } = useLocale();

  const { field, formData } = props;
  const [cmpKey, setKey] = useState();
  const [selectedDay, setSelectedDay] = useState(null);

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
        let isValid = false;
        if (inputValue.length > 0) isValid = true;

        props.onChangeValue(field, value, isValid);
      } else props.onChangeValue(field, value, true);
    }
  }
  function handleOnChange(e) {
    setSelectedDay(e);
    const d = e.year + "/" + e.month + "-" + e.day;
    setValueToParentForm(d);
    // if (e["_d"]) {
    //   const val = moment(e["_d"]).format(
    //     !field.format || field.format === "dateTime"
    //       ? "YYYY-MM-DD hh:mm A"
    //       : field.format === "date"
    //       ? "YYYY-MM-DD"
    //       : "hh:mm A"
    //   );
    //   setValueToParentForm(val);
    // } else setValueToParentForm("");
  }
  // var yesterday = Datetime.moment().subtract(1, "day");
  // var valid = function(current) {
  //   return current.isAfter(yesterday);
  // };
  return (
    <div className="form-group">
      <label>
        {field.title && field.title[currentLang] && field.title[currentLang]}
      </label>
      <div className="">
        <DatePicker
          selectedDay={selectedDay}
          onChange={handleOnChange}
          inputPlaceholder="انتخاب روز"
          inputClassName="form-control"
        />
      </div>
      <small className="form-text text-muted">
        {field.description[currentLang]}
      </small>
    </div>
  );
};

export default DateTimeInput;
