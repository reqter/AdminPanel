import React from "react";
import Sortable from "react-sortablejs";
import { useLocale } from "./../../../hooks";
// 
const SharedGroup = ({ items }) => {
  const { t, currentLang } = useLocale();
  items = items.map(field => (
    <li key={field.name}>
      <span>
        {field.title && field.title[currentLang] && field.title[currentLang]}
      </span>
      
    </li>
  ));

  return (
    <Sortable
      options={{
        group: "shared",
      }}
      tag="ul"
    >
      {items}
    </Sortable>
  );
};

export default SharedGroup;
