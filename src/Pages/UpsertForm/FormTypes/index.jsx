import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "./../../../hooks";

import "./styles.scss";
const types = [
  {
    id: 1,
    name: "customer",
    title: "UPSERT_FORM_CUSTOMER_FORM_PUBLIC",
    description: "UPSERT_FORM_CUSTOMER_FORM_PUBLIC_DESC",
    icon: "icon-customer",
  },
  {
    id: 2,
    name: "customer",
    title: "UPSERT_FORM_CUSTOMER_FORM_FOR_PARTNER",
    description: "UPSERT_FORM_CUSTOMER_FORM_SPECIAL_DESC",
    icon: "icon-customer",
  },
  {
    id: 3,
    name: "partner",
    title: "UPSERT_FORM_PARTNER_FORM_PUBLIC",
    description: "UPSERT_FORM_PARTNER_FORM_PUBLIC_DESC",
    icon: "icon-partner",
  },

  {
    id: 4,
    name: "partner",
    title: "UPSERT_FORM_PARTNER_FORM_FOR_PARTNER",
    description: "UPSERT_FORM_PARTNER_FORM_SPECIAL_DESC",
    icon: "icon-partner",
  },
];
export default function FormTypes(props) {
  const { t, currentLang } = useLocale();
  const [selectedType, setSelected] = useState();
  function handleClickType(type) {
    setSelected(type);
    if (props.onSelectType) {
      props.onSelectType(type);
    }
  }
  useEffect(() => {
    if (props.selectedType) {
      for (let i = 0; i < types.length; i++) {
        const type = types[i];
        if (type.id === props.selectedType.id) {
          setSelected(type);
          break;
        }
      }
    }
  }, [props.selectedType]);
  return (
    <div className="formTypes">
      <h5 className="formTypes__title">{t("UPSERT_FORM_FORM_TYPES_TITLE")}</h5>
      <span className="formTypes__desc">
        {t("UPSERT_FORM_FORM_TYPES_DESC")}
      </span>
      <div className="formTypes__items">
        {types &&
          types.map(type => (
            <div
              key={type.id}
              className={
                "ft animated fadeIn faster " +
                (selectedType
                  ? selectedType.id === type.id
                    ? "active"
                    : ""
                  : "")
              }
              onClick={() => handleClickType(type)}
            >
              <div className="ft__icon">
                <i className={type.icon} />
              </div>
              <span className="ft__name">{t(type.title)}</span>
              <span className="ft__desc">{t(type.description)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
