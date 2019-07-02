import React, { useState, useEffect } from "react";
import { useGlobalState, useLocale } from "./../../../../hooks";

const StatusFilter = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [selected, setSelected] = useState({});
  const [{ status }, dispatch] = useGlobalState();

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "status");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);

  function handleClick(item) {
    setSelected(item);
    if (item.id !== selected.id) props.onStatusSelected(item);
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
            <div className="treeItem-icon treeItem-status">
              <div className="contentIcon">
                <i className={listItem.icon} />
              </div>
            </div>

            <div
              className="item-name"
              style={{
                color: selected.id === listItem.id ? "rgb(56,132,255)" : "gray",
              }}
            >
              {t(listItem.name)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
