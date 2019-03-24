import React, { useState, useEffect } from "react";
import { languageManager } from "../../../../services";

const Tree = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
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
  function toggle(event, node) {
    const id = event.target.getAttribute("id");
    let n_s = { ...idState };
    n_s[id] = !idState[id];
    setId(n_s);
    if (node && node.id !== selected.id) {
      setSelected(node);
      props.onCategorySelect(node);
    }
  }
  function mapper(nodes, parentId, lvl) {
    return nodes.map((node, index) => {
      if (node.type !== "contentType") {
        const id = `${node.id}-${parentId ? parentId : "top"}`.replace(
          /[^a-zA-Z0-9-_]/g,
          ""
        );
        return (
          <li
            key={id}
            className="animated fadeIn faster"
            style={{
              color: selected.id === node.id ? "rgb(56,132,255)" : "gray"
            }}
          >
            {node.children ? (
              <>
                {idState[id] ? (
                  <i
                    className="icon-down-chevron chevron"
                    onClick={toggle}
                    id={id}
                  />
                ) : (
                  <i
                    className="icon-right-chevron chevron"
                    onClick={toggle}
                    id={id}
                  />
                )}
                {node.name[currentLang]}
                <ul style={{ display: idState[id] ? "block" : "none" }}>
                  {mapper(node.children, id, (lvl || 0) + 1)}
                </ul>
              </>
            ) : (
              <span onClick={e => toggle(e, node)} id={id}>
                {node.name[currentLang]}
              </span>
            )}
          </li>
        );
      }
    });
  }

  return (
    <div className="filterBox">
      <div className="filter-header">Categories</div>
      <div className="filter-body">
        <ul>
          <li className="root">
            <i className="icon-right-chevron chevron" />
            All Categories
          </li>
          {mapper(props.data)}
        </ul>
      </div>
    </div>
  );
};

export default Tree;
