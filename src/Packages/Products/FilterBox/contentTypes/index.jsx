import React from "react";
import { languageManager } from "../../../../services";

const ContentTypeFilter = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  return (
    <div className="filterBox">
      <div className="filter-header">Item Types</div>
      <div className="filter-body">
        {props.data.map(listItem => (
          <div className="filter-list-item" key={listItem.id}>
            <div className="item-checkbox" />
            <div className="item-name">{listItem.title[currentLang]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeFilter;
