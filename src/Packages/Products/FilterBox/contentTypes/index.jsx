import React, { useState, useEffect } from "react";
import { languageManager } from "../../../../services";

const ContentTypeFilter = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "contentType");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);

  function handleClick(item) {
    setSelected(item);
    if (item.id !== selected.id) props.onContentTypeSelect(item);
  }
  return (
    <div className="filterBox">
      <div className="filter-header">Item Types</div>
      <div className="filter-body">
        {props.data.map(listItem => (
          <div
            className="filter-list-item"
            key={listItem.id}
            onClick={() => handleClick(listItem)}
          >
            <div className="item-checkbox" />
            <div
              className="item-name"
              style={{
                color: selected.id === listItem.id ? "rgb(56,132,255)" : "gray"
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
