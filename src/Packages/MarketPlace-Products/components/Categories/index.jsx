import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

import { languageManager, useGlobalState } from "./../../../../services";
import { useLocale } from "./../../../../hooks";
// import { getCategories } from "./../../../../Api/content-api";

const categories = [
  { _id: "1", sys: {}, name: { en: "News" }, count: 23 },
  { _id: "2", sys: {}, name: { en: "Economy" }, count: 56 },
  { _id: "3", sys: {}, name: { en: "Social" }, count: 14 },
  { _id: "4", sys: {}, name: { en: "Business" }, count: 7 },
  { _id: "5", sys: {}, name: { en: "War" }, count: 49 },
];

const Tree = props => {
  const { appLocale } = useLocale();
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories, spaceInfo }, dispatch] = useGlobalState();
  const [spinner, toggleSpinner] = useState(true);
  const [selected, setSelected] = useState({});
  const [idState, setId] = useState({});
  // useEffect(() => {
  //   if (!categories || categories.length === 0) {
  //     getCategories()
  //       .onOk(result => {
  //         dispatch({
  //           type: "SET_CATEGORIES",
  //           value: result,
  //         });
  //       })
  //       .onServerError(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "error",
  //             message: languageManager.translate("CATEGORY_ON_SERVER_ERROR"),
  //           },
  //         });
  //       })
  //       .onBadRequest(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "error",
  //             message: languageManager.translate("CATEGORY_ON_BAD_REQUEST"),
  //           },
  //         });
  //       })
  //       .unAuthorized(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "warning",
  //             message: languageManager.translate("CATEGORY_UN_AUTHORIZED"),
  //           },
  //         });
  //       })
  //       .call(spaceInfo.id);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (Object.keys(selected).length > 0) {
  //     const c = props.filters.find(item => item.type === "category");
  //     if (!c) {
  //       setSelected({});
  //     }
  //   }
  // }, [props.filters]);
  function toggle(event, node) {
    const id = event.target.getAttribute("id");
    let n_s = { ...idState };
    n_s[id] = !idState[id];
    setId(n_s);
    if (node.items === undefined || node.items.length === 0) {
      if (node._id !== selected._id) {
        setSelected(node);
        props.onCategorySelect(node);
      }
    }
  }
  function mapper(nodes, parentId, lvl) {
    return nodes.map((node, index) => {
      if (node.sys.type !== "contentType") {
        const id = `${node._id}-${parentId ? parentId : "top"}`.replace(
          /[^a-zA-Z0-9-_]/g,
          ""
        );
        return (
          <li
            key={id}
            className="animated fadeIn faster"
            style={{
              paddingLeft: `${25 * lvl}px`,
              color: selected._id === node._id ? "rgb(56,132,255)" : "gray",
            }}
          >
            <div
              className="mp-p__c_categoryItem"
              onClick={e => toggle(e, node)}
              id={id}
            >
              <span className="categoryName">{node.name[currentLang]}</span>
              <span className="categoryCount">{node.count}</span>
            </div>
            {node.items && node.items.length > 0 && (
              <ul
                style={{
                  display: idState[id] ? "block" : "none",
                }}
              >
                {mapper(node.items, id, (lvl || 0) + 1)}
              </ul>
            )}
          </li>
        );
      }
      return undefined;
    });
  }

  return (
    // mp-p__c == mp-products_categories
    <div className="mp-p__c">
      <div className="mp-p__c__header">
        <span className="mp-p__c__title">
          {appLocale["PRODUCTS_CATEGORY_TITLE"]}
        </span>
      </div>

      <ul>
        {spinner && (
          <li className="lineSkeleton">
            <div className="lines">
              <div className="line l1" />
              <div className="line l2" />
              <div className="line l2" />
              <div className="line l1" />
              <div className="line l2" />
            </div>
          </li>
        )}
        {/* {categories !== undefined &&
          categories.length > 0 &&
          mapper(categories)} */}
      </ul>
    </div>
  );
};

export default Tree;
