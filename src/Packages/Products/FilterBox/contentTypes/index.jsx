import React, { useState, useEffect } from "react";
import { languageManager, useGlobalState, utility } from "../../../../services";
import { getContentTypes } from "./../../../../Api/content-api";
const ContentTypeFilter = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ contentTypes }, dispatch] = useGlobalState();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (contentTypes.length === 0) {
      getContentTypes()
        .onOk(result => {
          dispatch({
            type: "SET_CONTENT_TYPES",
            value: result
          });
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("CONTENT_TYPE_ON_SERVER_ERROR")
            }
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST")
            }
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED")
            }
          });
        })
        .call();
    }
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "contentType");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);

  function handleClick(item) {
    if (selected.sys === undefined || item.sys.id !== selected.sys.id) {
      setSelected(item);
      props.onContentTypeSelect(item);
    }
  }
  return (
    <div className="filterBox">
      <div className="filter-header">Item Types</div>
      <div className="filter-body">
        {contentTypes.map(listItem => (
          <div
            className="filter-list-item"
            key={listItem.sys.id}
            onClick={() => handleClick(listItem)}
          >
            {listItem.media !== undefined && listItem.media.length > 0 ? (
              <div className="treeItem-img treeItem-contentType">
                <div>
                  {utility.getAssetIconByURL(listItem.media[0][currentLang])}
                </div>
              </div>
            ) : (
              <div className="treeItem-icon treeItem-contentType">
                <div className="contentIcon">
                  <i className="icon-item-type" />
                </div>
              </div>
            )}
            <div
              className="item-name"
              style={{
                color: selected.sys
                  ? selected.sys.id === listItem.sys.id
                    ? "rgb(56,132,255)"
                    : "gray"
                  : "gray"
              }}
            >
              {listItem.title[currentLang]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeFilter;
