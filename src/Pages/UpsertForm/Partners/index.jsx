import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "../../../hooks";

import "./styles.scss";
const allData = [
  {
    _id: 1,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "https://cdn.kickcharge.com/wp-content/uploads/2017/03/28090959/miracle-vet-logo-1024x626.jpeg",
    company_name: "بنیان سیستم",
  },
  {
    _id: 2,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "https://cdn.kickcharge.com/wp-content/uploads/2018/04/24093540/airprofessionals-logo-1024x625.jpg",
    company_name: "بانک ملی ایران",
  },
  {
    _id: 3,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "https://s3.amazonaws.com/logos.brandpa.com/uploads/7e927cff248a747852c9ed1bae960d6f/bionamic.png",
    company_name: "رهن و اقتصاد وام بین بانکی",
  },
  {
    _id: 4,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "https://amp.businessinsider.com/images/58486129ba6eb604688b6f51-750-500.jpg",
    company_name: "فضای کار اشتراکی پارادایس",
  },
  {
    _id: 5,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "http://www.tertia.lu/wp-content/uploads/2017/01/Photo-page-entreprise.png",
    company_name: "بازرگانی اسلامی",
  },
  {
    _id: 6,
    first_name: "سعید",
    last_name: "پادیاب",
    phoneNumber: "0090",
    email: "padyabsaeed@gmail.com",
    avatar:
      "http://officemoversofflorida.com/wp-content/uploads/2016/02/modular-furniture-installers-tampa-florida.png",
    company_name: "لپ تاپ برند اپل",
  },
];
export default function Partners(props) {
  const { t, currentLang } = useLocale();
  const [partners, setPartners] = useState(allData);
  const [selectedPartner, setPartner] = useState();

  useEffect(() => {
    if (props.selectedPartner) {
      for (let i = 0; i < partners.length; i++) {
        const p = partners[i];
        if (p._id === props.selectedPartner._id) {
          setPartner(p);
          break;
        }
      }
    }
  }, [props.selectedPartner]);

  function handleClickType(type) {
    if (props.onSelectType) {
      props.onSelectType(type);
    }
  }
  function handleSearchChanged(e) {
    const key = e.which || e.key;
    if (key === 13) {
      const s = allData.filter(item =>
        item.company_name.includes(e.target.value)
      );
      setPartners(s);
    } else {
      if (e.target.value.length === 0) setPartners(allData);
    }
  }
  function handlePartnerClicked(p) {
    setPartner(p);
    if (props.onSelectPartner) {
      props.onSelectPartner(p);
    }
  }
  return (
    <div className="partners">
      <h5 className="partners__title">{t("UPSERT_FORM_PARTNERS_TITLE")}</h5>
      <span className="partners__desc">{t("UPSERT_FORM_PARTNERS_DESC")}</span>
      <input
        type="text"
        className="form-control"
        placeholder={t("UPSERT_FORM_PARTNERS_SEARCH_PLACEHOLDER")}
        onKeyUp={handleSearchChanged}
      />
      <div className="partners__items">
        {partners &&
          partners.map(p => {
            return (
              <div
                className={
                  "user " +
                  (selectedPartner && selectedPartner._id === p._id
                    ? "active"
                    : "")
                }
                key={p._id}
                onClick={() => handlePartnerClicked(p)}
              >
                <div className="user__top">
                  <div className="user__avatar">
                    <img src={p.avatar} alt="" />
                  </div>
                </div>
                <div className="user__bottom">
                  {p.company_name
                    ? p.company_name
                    : p.first_name + " " + p.last_name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
