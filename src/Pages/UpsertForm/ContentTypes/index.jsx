import React, { useState, useEffect, useRef } from "react";
import { useGlobalState, useLocale } from "../../../hooks";
import { getContentTypes } from "../../../Api/content-api";
import { CircleSpinner, Image } from "../../../components";

const ContentTypes = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [{ contentTypes, spaceInfo }, dispatch] = useGlobalState();
  const [spinner, togglepinner] = useState(true);
  function handleSelectContentType(contentType) {
    props.onSelectContentType(contentType);
  }
  function navigateToContentTypes() {
    props.history.push("/contentType");
  }
  useEffect(() => {
    getContentTypes()
      .onOk(result => {
        togglepinner(false);
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result,
        });
        props.onEndLoading(true);
      })
      .onServerError(result => {
        togglepinner(false);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: t("CONTENT_TYPE_ON_SERVER_ERROR"),
        };
        props.onEndLoading(false, obj);
      })
      .onBadRequest(result => {
        togglepinner(false);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: t("CONTENT_TYPE_ON_BAD_REQUEST"),
        };
        props.onEndLoading(false, obj);
      })
      .unAuthorized(result => {
        togglepinner(false);
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "contentType",
          message: t("CONTENT_TYPE_UN_AUTHORIZED"),
        };
        props.onEndLoading(false, obj);
      })
      .call(spaceInfo.id);
  }, []);

  return spinner ? (
    <div className="contentTypesSpinner">
      <CircleSpinner show={spinner} size="large" />
      <span>{t("UPSERT_FORM_TEMPLATES_LOADING")}.</span>
    </div>
  ) : !contentTypes || contentTypes.length === 0 ? (
    <div className="emptyContenType">
      <i className="icon-empty-box-open icon" />
      <span className="title">{t("UPSERT_FORM_TEMPLATES_EMPTY_TITLE")}</span>
      <span className="info">{t("UPSERT_FORM_TEMPLATES_EMPTY_DESC")}</span>
      <button
        className="btn btn-sm btn-primary"
        onClick={navigateToContentTypes}
      >
        {t("UPSERT_FORM_TEMPLATES_EMPTY_BTN")}
      </button>
    </div>
  ) : (
    contentTypes.map(c => (
      <div key={c.id} className="listGroupItem">
        <div className="treeItem">
          {c.media === undefined || c.media.length === 0 ? (
            <div className="treeItem-icon">
              <div className="contentIcon">
                <i className="icon-item-type" />
              </div>
            </div>
          ) : (
            <div className="treeItem-img">
              <Image url={c.media[0][currentLang]}/>
            </div>
          )}
          <div className="treeItem-text">
            <span className="treeItem-name">{c.title[currentLang]}</span>
            <span className="treeItem-desc">
              {c.description &&
                c.description[currentLang] &&
                c.description[currentLang]}
            </span>
          </div>
          <button
            className="btn btn-light treeItem-action"
            size="xs"
            onClick={() => handleSelectContentType(c)}
          >
            <span style={{ fontSize: 12 }}>{t("CHOOSE")}</span>
          </button>
        </div>
      </div>
    ))
  );
};
export default ContentTypes;
