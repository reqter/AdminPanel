import React, { useState, useEffect } from "react";
import { languageManager, useGlobalState, utility } from "../../../../services";
import { useLocale } from "./../../../../hooks";
import { getContentTypes } from "./../../../../Api/content-api";
import "./styles.scss";

const ContentTypeFilter = props => {
  const { appLocale, currentLang } = useLocale();
  const [{ mp_contentTypes, spinner, spaceInfo }, dispatch] = useGlobalState();
  const [selected, setSelected] = useState({});
  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "contentType");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);

  function handleChangeContentType(item) {
    if (item._id !== selected._id) {
      setSelected(item);
      if (props.onContentTypeSelect) props.onContentTypeSelect(item);
    }
  }
  return (
    <div className="mp-p__ct">
      <div className="mp-p__ct__header">
        <span className="mp-p__ct__title">
          {appLocale["PRODUCTS_CONTENT_TYPE_TITLE"]}
        </span>
      </div>
      <div className="">
        {spinner
          ? [1, 2, 3].map(c => (
              <div className="radioSkeleton">
                <div className="radioItem">
                  <div className="radio__circle" />
                  <div className="lines">
                    <div className="line" />
                  </div>
                </div>
              </div>
            ))
          : mp_contentTypes &&
            mp_contentTypes.map(listItem => (
              <div className="mp-p__ct__row" key={listItem._id}>
                <label className="radio">
                  <input
                    type="radio"
                    value={listItem._id}
                    checked={selected._id === listItem._id}
                    name="contentType"
                    onChange={() => handleChangeContentType(listItem)}
                    id={"contentTypeRdio" + listItem._id}
                  />
                  <span className="checkround" />
                </label>
                <label
                  htmlFor={"contentTypeRdio" + listItem._id}
                  className={selected._id === listItem._id ? "--active" : ""}
                >
                  {listItem.title[currentLang]}
                </label>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ContentTypeFilter;
