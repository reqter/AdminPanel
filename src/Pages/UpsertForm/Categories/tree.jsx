import React, { useState } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { Image } from "../../../components";
import { useLocale } from "./../../../hooks";

export default function Tree(props) {
  const { t, currentLang, direction } = useLocale();
  const [state, setState] = useState({});

  function toggle(event) {
    const id = event.target.getAttribute("id");
    setState(state => ({ [id]: !state[id] }));
  }
  function mapper(nodes, parentId, lvl) {
    return nodes.map((node, index) => {
      if (node.sys.type === "category") {
        const id = node._id;
        return (
          <>
            <div key={index} className="categorylistItem">
              <div
                className="categorylistItem__body"
                style={{
                  paddingLeft: direction === "ltr" ? `${20 * lvl}px` : 0,
                  paddingRight: direction === "ltr" ? 0 : `${20 * lvl}px`,
                }}
              >
                {node.items && node.items.length > 0 ? (
                  <>
                    <div
                      className="categorylistItem__toggleBtn btn btn-link"
                      id={id}
                      onClick={toggle}
                    >
                      {state[id] ? (
                        <span className="icon-caret-down" id={id} />
                      ) : (
                        <span className="icon-caret-right" id={id} />
                      )}
                    </div>

                    {node.image !== undefined ? (
                      <div className="categorylistItem__image">
                        <Image url={node.image[currentLang]} />
                      </div>
                    ) : (
                      <div className="categorylistItem__emptyImg">
                        <div className="">
                          <i className="icon-item-type" />
                        </div>
                      </div>
                    )}
                  </>
                ) : node.image !== undefined ? (
                  <>
                    <button className="categorylistItem__circleBtn btn btn-link btn-sm">
                      <i className="icon-circle-o" />
                    </button>
                    <div className="categorylistItem__image">
                      <Image url={node.image[currentLang]} />
                    </div>
                  </>
                ) : (
                  <>
                    <button className="categorylistItem__circleBtn btn btn-link btn-sm">
                      <i className="icon-circle-o" />
                    </button>
                    <div className="categorylistItem__emptyImg">
                      <div className="">
                        <i className="icon-item-type" />
                      </div>
                    </div>
                  </>
                )}
                <div className="categorylistItem__texts">
                  <span className="categorylistItem__name">
                    {node.name && node.name[currentLang]}
                  </span>
                  <span className="categorylistItem__desc">
                    {node.description && node.description[currentLang]
                      ? node.description[currentLang]
                      : "بدون توضیحات برای این دسته بندی"}
                  </span>
                </div>
                {(node.items === undefined || node.items.length === 0) && (
                  <button
                    className="btn btn-light categorylistItem__btnSelect"
                    size="xs"
                    onClick={() => {
                      props.onRowSelect(node);
                    }}
                  >
                    <span style={{ fontSize: 12 }}>{t("SELECT")}</span>
                  </button>
                )}
              </div>
            </div>
            {node.items && (
              <div
                style={{
                  display: state[id] ? "flex" : "none",
                  flexDirection: "column",
                }}
                className="listGroup"
              >
                {mapper(node.items, id, (lvl || 0) + 1)}
              </div>
            )}
          </>
        );
      } else {
        return <></>;
      }
    });
  }
  const { data } = props;
  return data ? <div className="listGroup">{mapper(props.data)}</div> : null;
}
