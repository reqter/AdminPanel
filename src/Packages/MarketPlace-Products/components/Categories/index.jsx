import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

import { languageManager, useGlobalState } from "./../../../../services";
import { useLocale } from "./../../../../hooks";
// import { getCategories } from "./../../../../Api/content-api";

const categories = [
  {
    _id: "1",
    sys: {},
    name: { en: "News", fa: "اخبار" },
    count: 23,
    items: [
      { _id: "11", sys: {}, name: { en: "Sport", fa: "ورزش" }, count: 23 },
      { _id: "12", sys: {}, name: { en: "Basketball", fa: "بسکتبال" }, count: 76 },
    ],
  },
  { _id: "2", sys: {}, name: { en: "Economy", fa: "اقتصاد" }, count: 56 },
  { _id: "3", sys: {}, name: { en: "Social", fa: "جامعه" }, count: 14 },
  { _id: "4", sys: {}, name: { en: "Business", fa: "بازار" }, count: 7 },
  { _id: "5", sys: {}, name: { en: "War", fa: "حوادث" }, count: 49 },
];

const Tree = props => {
  const { appLocale, direction ,currentLang } = useLocale();
  const [{ spaceInfo }, dispatch] = useGlobalState();
  const [spinner, toggleSpinner] = useState(true);
  const [selected, setSelected] = useState({});
  const [idState, setId] = useState({});

  useEffect(() => {
    setTimeout(() => {
      toggleSpinner(false);
    }, 1000);
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
  }, []);
  function toggle(event, node) {
    const id = event.target.getAttribute("id");
    let n_s = { ...idState };
    n_s[id] = !idState[id];
    setId(n_s);
    if (node.items === undefined || node.items.length === 0) {
      if (node._id !== selected._id) {
        setSelected(node);
        if (props.onCatgorySelect) props.onCatgorySelect(node);
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
          <li key={id} className="animated fadeIn faster">
            <div className="mp-p__c_categoryItem">
              <span
                className={
                  "categoryName " +
                  (selected._id === node._id ? "--active" : "")
                }
                onClick={e => toggle(e, node)}
                id={id}
                style={{
                  marginLeft: direction === "ltr" ? `${10 * lvl}px` : 0,
                  marginRight: direction === "ltr" ? 0 : `${10 * lvl}px`,
                }}
              >
                {node.name[currentLang]}
              </span>
              <span
                className={
                  "categoryCount " +
                  (selected._id === node._id ? "--active" : "")
                }
              >
                {node.count}
              </span>
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
        {spinner ? (
          <li className="lineSkeleton">
            <div className="lines">
              <div className="line l1" />
              <div className="line l2" />
              <div className="line l2" />
              <div className="line l1" />
              <div className="line l2" />
            </div>
          </li>
        ) : (
          categories !== undefined &&
          categories.length > 0 &&
          mapper(categories)
        )}
      </ul>
    </div>
  );
};

export default Tree;
