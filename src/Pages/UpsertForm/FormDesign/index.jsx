import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "../../../hooks";

import "./styles.scss";

export default function DesignForm(props) {
  const { t, currentLang } = useLocale();
  function handleClickType(type) {
    if (props.onSelectType) {
      props.onSelectType(type);
    }
  }
  return (
    <div className="designForm">
      <h5 className="designForm__title">{t("UPSERT_FORM_DESIGN_TITLE")}</h5>
      <span className="designForm__desc">{t("UPSERT_FORM_DESIGN_DESC")}</span>
      <div className="designForm__content" />
    </div>
  );
}
