import React, { useState, useEffect } from "react";
import { Video, Gallery } from "./Templates";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import { getContentById } from "./../../Api/content-api";
import { NotFound } from "./ErrorsComponent";

const currentLang = languageManager.getCurrentLanguage().name;

const ViewContent = props => {
  const [{ spaceInfo }, dispatch] = useGlobalState();
  const [item, setItem] = useState();
  const [spinner, toggleSpinner] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const { params } = props.match;
    if (!params.id || !params.spaceId) {
      dispatch({
        type: "ADD_NOTIFY",
        value: {
          type: "error",
          message: "Url is wrong.content not found",
        },
      });
    } else {
      getItemById(params.spaceId, params.id);
    }
  }, [props.match.params.id]);

  function getItemById(spaceId, id) {
    getContentById()
      .onOk(result => {
        result.contentType.template = "video";
        if (result) {
          setItem(result);
          if (!result.contentType) {
            const obj = {
              type: "CONTENT_TYPE",
              title: "Not Found!",
              message: "There is not content type for this content.",
            };
            setError(obj);
          } else {
            setError();
          }
        }
        toggleSpinner(false);
      })
      .onServerError(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_ON_SERER_ERROR"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onBadRequest(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_BAD_REQUEST"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unAuthorized(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate(
            "UPSERT_ITEM_GET_BY_ID_UN_AUTHORIZED"
          ),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .notFound(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .onRequestError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .unKnownError(() => {
        const obj = {
          type: "ON_SERVER_ERROR",
          sender: "getItemById",
          message: languageManager.translate("UPSERT_ITEM_GET_BY_ID_NOT_FOUND"),
        };
        setError(obj);
        toggleSpinner(false);
      })
      .call(spaceId, id);
  }
  return spinner ? (
    <div className="loaderBox">
      <div className="loader" />
      Loading ...
    </div>
  ) : (
    <div className="viewContent">
      <div className="viewContent--header">
        <div className="header--left">
          <div className="header--content-icon">
            <img src={require("./../../assets/logo.png")} alt="" />
          </div>
          <div className="header--content-name">
            {item.fields.name[currentLang]}
          </div>
        </div>
        <div className="header--center" />
        <div className="header--right">
          <button className="btn btn-light">Download</button>
        </div>
      </div>
      <div className="viewContent--body">
        {error ? (
          <div className="viewContent--error">
            <div>{error.type === "CONTENT_TYPE" && <NotFound />}</div>
            <span className="viewContent--error-title">{error.title}</span>
            <span className="viewContent--error-msg">{error.message}</span>
          </div>
        ) : item.contentType.template === "video" ? (
          <div className="viewContent--template">
            <Video item={item} />
          </div>
        ) : item.contentType.template === "gallery" ? (
          <div className="viewContent--template">
            <Gallery item={item} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewContent;
