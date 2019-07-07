import React, { useState, useEffect } from "react";
import { utility } from "../../../services";
import { useLocale } from "../../../hooks";

const List = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [selected, setSelected] = useState({});
  useEffect(() => {
    if (!props.rightContent) {
      setSelected({});
    }
  }, [props.rightContent]);
  return (
    props.data &&
    props.data.map(listItem => (
      <div
        key={listItem._id}
        className="listGroupItem"
        style={{
          backgroundColor: selected.sys
            ? selected._id === listItem._id
              ? "lightgray"
              : "white"
            : "white",
        }}
      >
        <div className="treeItem">
          {listItem.media === undefined || listItem.media.length === 0 ? (
            <div className="treeItem-icon">
              <div className="contentIcon">
                <i className="icon-item-type" />
              </div>
            </div>
          ) : (
            <div className="treeItem-img">
              <div className="treeItem-ext">
                {utility.getAssetIconByURL(listItem.media[0][currentLang])}
              </div>
            </div>
          )}
          <div className="treeItem-text">
            <span className="treeItem-name">
              {listItem.title
                ? listItem.title[currentLang]
                  ? listItem.title[currentLang]
                  : listItem.title
                : ""}
            </span>
            <span className="treeItem-desc">
              {listItem.description[currentLang] || ""}
            </span>
          </div>
          {listItem.template !== "generic" && (
            <button
              className="btn btn-light treeItem-action"
              size="xs"
              onClick={() => props.handleDeleteType(listItem)}
            >
              <i className="icon-bin" />
            </button>
          )}
          <button
            className="btn btn-light treeItem-action"
            size="xs"
            onClick={() => props.handleEditType(listItem)}
          >
            <i className="icon-pencil" />
          </button>
          {/* {listItem.accessRight && (
            <button
              className="btn btn-light treeItem-action"
              size="xs"
              onClick={() => {
                props.onSelectAccessRight(listItem);
              }}
            >
              <span style={{ fontSize: 12 }}>
                {t("ITEM_TYPES_ACCESS_RIGHT")}
              </span>
            </button>
          )} */}
          <button
            className="btn btn-light treeItem-action"
            size="xs"
            onClick={() => {
              setSelected(listItem);
              props.handleShowFields(listItem);
            }}
          >
            <span style={{ fontSize: 12 }}>{t("CONTENT_TYPES_FIELDS")}</span>
          </button>
        </div>
      </div>
    ))
  );
};
export default List;
