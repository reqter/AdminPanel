import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "../../../hooks";

import "./styles.scss";
const partners = [{}, {}, {}, {}, {}, {}];
export default function Partners(props) {
  const { t, currentLang } = useLocale();
  function handleClickType(type) {
    if (props.onSelectType) {
      props.onSelectType(type);
    }
  }
  return (
    <div className="partners">
      <h5 className="partners__title">{t("UPSERT_FORM_PARTNERS_TITLE")}</h5>
      <span className="partners__desc">{t("UPSERT_FORM_PARTNERS_DESC")}</span>
      <input
        type="text"
        className="form-control"
        placeholder="جستجوی همکار با نام"
      />
      <div className="partners__items">
        {partners &&
          partners.map(p => {
            return (
              <div className="user">
                <div className="user__top">
                  <div className="user__avatar">
                    <img
                      src="https://pixlr.com/photo/image-editing-2-3-pw.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="user__bottom">سعید پادیاب</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
