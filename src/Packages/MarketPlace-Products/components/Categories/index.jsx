import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import { languageManager, useGlobalState } from "./../../../../services";
import { useLocale } from "./../../../../hooks";

const Tree = props => {
  const { match, history, location } = props;
  const { appLocale, direction, currentLang } = useLocale();
  const [{ spaceInfo, spinner, mp_categories }] = useGlobalState();
  const [innerSpinner, toggleSpinner] = useState(true);
  const [selected, setSelected] = useState({});
  const [idState, setId] = useState({});

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "category");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);
  useEffect(() => {
    let result;
    function findNodeById(data, nodeId) {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].items) {
            findNodeById(data[i].items, nodeId);
          }
          if (data[i]._id === nodeId) {
            result = data[i];
          }
        }
      }
    }
    let expandObj = {};
    function findParent(data, node) {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          const c = data[i];
          if (c._id === node.parentId) {
            expandObj[c._id] = true;
            if (c.parentId) {
              findParent(mp_categories, c);
            }
          } else if (c.items) findParent(c.items, node);
        }
      }
    }
    let id;
    function getNodeIdByLink(data, link) {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].items) {
            getNodeIdByLink(data[i].items, link);
          }
          if (data[i].sys.link === link) {
            id = data[i]._id;
          }
        }
      }
    }
    if (!spinner) {
      if (innerSpinner) {
        toggleSpinner(false);
        const categoryLink = props.match.params.categoryId;
        if (
          categoryLink !== "view" &&
          categoryLink &&
          categoryLink.length > 0
        ) {
          getNodeIdByLink(mp_categories, categoryLink);
          if (id) {
            findNodeById(mp_categories, id);
            if (result) {
              setSelected(result);
              findParent(mp_categories, result);
              setId(expandObj);
              if (props.onCatgorySelect) props.onCatgorySelect(result);
            }
          }
        }
      }
    }
  }, [spinner]);
  function toggle(event, node) {
    const id = event.target.getAttribute("id");
    let n_s = { ...idState };
    n_s[id] = !idState[id];
    setId(n_s);
    if (node.items === undefined || node.items.length === 0) {
      if (node._id !== selected._id) {
        setSelected(node);
        if (props.onCatgorySelect) props.onCatgorySelect(node);
        history.push("/market/" + node.sys.link);
      }
    }
  }

  function mapper(nodes, parentId, lvl) {
    return nodes.map((node, index) => {
      if (node.sys.type !== "contentType") {
        const id = node._id;
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
        {innerSpinner ? (
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
          mp_categories !== undefined &&
          mp_categories.length > 0 &&
          mapper(mp_categories)
        )}
      </ul>
    </div>
  );
};

export default withRouter(Tree);
