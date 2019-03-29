import React, { useState, useEffect } from "react";
import { languageManager, useGlobalState } from "../../../../services";

const StatusFilter = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [selected, setSelected] = useState({});
  const [{ status }, dispatch] = useGlobalState();
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
      <div className="filter-header">Status</div>
      <div className="filter-body">
        {status.map(listItem => (
          <div
            className="filter-list-item"
            key={listItem.id}
            onClick={() => handleClick(listItem)}
          >
            <i
              className={listItem.icon}
              style={{
                marginRight: 10
              }}
            />
            <div
              className="item-name"
              style={{
                color: selected.id === listItem.id ? "rgb(56,132,255)" : "gray"
              }}
            >
              {listItem.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
