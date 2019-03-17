import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { languageManager } from "../../../services";

const List = props => {
  console.log('list')
  const [selected, setSelected] = useState({});
  useEffect(() => {
    if (!props.rightContent) {
      setSelected({});
    }
  }, [props.rightContent]);
  return (
    <ListGroup>
      {props.data &&
        props.data.map(listItem => (
          <ListGroupItem
            key={listItem.id}
            className="listGroupItem"
            style={{
              backgroundColor:
                selected.id === listItem.id ? "lightgray" : "white"
            }}
          >
            <div className="treeItem">
              <button
                className="btn btn-primary btn-sm"
                color="primary"
                style={{ marginRight: 15 }}
              >
                <i className="icon-item-type" />
              </button>
              <div className="treeItem-text">
                <span className="treeItem-name">{listItem.title}</span>
                <span className="treeItem-desc">
                  {listItem.description ||
                    "Lorem ipsum dolor sit amet, consectetur"}
                </span>
              </div>
              {listItem.template !== "generic" && (
                <>
                  <button
                    className="btn btn-light treeItem-action"
                    size="xs"
                    onClick={() => props.handleDeleteType(listItem)}
                  >
                    <i className="icon-bin" />
                  </button>
                  <button
                    className="btn btn-light treeItem-action"
                    size="xs"
                    onClick={() => props.handleEditType(listItem)}
                  >
                    <i className="icon-pencil" />
                  </button>
                </>
              )}
              <button
                className="btn btn-light treeItem-action"
                size="xs"
                onClick={() => {
                  setSelected(listItem);
                  props.handleShowFields(listItem);
                }}
              >
                <span style={{ fontSize: 12 }}>
                  {languageManager.translate("ITEM_TYPES_FIELDS")}
                </span>
              </button>
            </div>
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};
export default List;
