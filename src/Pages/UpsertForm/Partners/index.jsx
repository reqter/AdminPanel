import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "../../../hooks";
import { getPartners } from "./../../../Api/request-api";
import CircleSpinner from "./../../../components/CircleSpinner";
import { Empty, Wrong } from "./../../../components/Commons/ErrorsComponent";
import "./styles.scss";

export default function Partners(props) {
  const { t, currentLang } = useLocale();
  const [spinner, toggleSpinner] = useState(true);
  const [allData, setAllData] = useState();
  const [partners, setPartners] = useState();
  const [selectedPartner, setPartner] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getPartners()
      .onOk(result => {
        if (result && result.length > 0) {
          setAllData(result || []);
          setPartners(result);
          if (props.selectedPartner) {
            for (let i = 0; i < result.length; i++) {
              const p = result[i];
              if (p._id === props.selectedPartner._id) {
                setPartner(p);
                break;
              }
            }
          }
        } else {
          setError({
            type: "length",
            title: t("UPSERT_FORM_PARTNERS_EMPTY_TITLE"),
            message: t("UPSERT_FORM_PARTNERS_EMPTY_MESSAGE"),
          });
        }
        toggleSpinner(false);
      })
      .onServerError(result => {
        toggleSpinner(false);
        setError({
          type: "error",
          title: t("INTERNAL_SERVER_ERROR"),
          message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
        });
      })
      .onBadRequest(result => {
        toggleSpinner(false);
        setError({
          type: "error",
          title: t("BAD_REQUEST"),
          message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
        });
      })
      .unAuthorized(result => {
        toggleSpinner(false);
      })
      .notFound(result => {
        toggleSpinner(false);
        setError({
          type: "error",
          title: t("NOT_FOUND"),
          message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
        });
      })
      .unKnownError(result => {
        toggleSpinner(false);
        setError({
          type: "error",
          title: t("UNKNOWN_ERROR"),
          message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
        });
      })
      .onRequestError(result => {
        toggleSpinner(false);
        setError({
          type: "error",
          title: t("ON_REQUEST_ERROR"),
          message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
        });
      })
      .call();
  }, []);

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
        {spinner ? (
          <div className="tabsSpinner">
            <CircleSpinner show={spinner} size="large" />
            <span>{t("UPSERT_FORM_PARTNERS_LOADING")}</span>
          </div>
        ) : partners ? (
          partners.map(p => (
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
          ))
        ) : (
          <div className="partner-errors">
            {error && error.type === "length" ? (
              <Empty />
            ) : (
              <Wrong width="200" height="200" />
            )}
            {error && <span className="title">{error.title}</span>}
            {error && <span className="message">{error.message}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
