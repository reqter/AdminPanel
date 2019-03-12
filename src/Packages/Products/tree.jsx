import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { languageManager } from "../../services";

class Tree extends Component {
  state = {};
  toggle = event => {
    const id = event.target.getAttribute("id");
    this.setState(state => ({ [id]: !state[id] }));
  };
  mapper = (nodes, parentId, lvl) => {
    return nodes.map((node, index) => {
      const id = `${node.id}-${parentId ? parentId : "top"}`.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      );
      return (
        <>
          <ListGroupItem
            key={index}
            style={{ zIndex: 0, padding: 10 }}
            className={`treeItemParent ${
              parentId ? `rounded-0 ${lvl ? "border-bottom-0" : ""}` : ""
            }`}
          >
            {
              <div
                className="treeItem"
                style={{
                  paddingLeft: `${15 * lvl}px`
                }}
              >
                {node.children && node.children.length > 0 ? (
                  <button
                    className="btnCategoryCollapse btn btn-primary btn-sm"
                    id={id}
                    color="primary"
                    onClick={this.toggle}
                  >
                    {this.state[id] ? (
                      <i className="icon-caret-down" onClick={this.toggle} />
                    ) : (
                      <i className="icon-caret-right" onClick={this.toggle} />
                    )}
                  </button>
                ) : (
                  <button className="btnCategoryCollapse btn btn-dark btn-sm">
                    <i className="icon-caret-circle" />
                  </button>
                )}
                <div className="treeItem-text">
                  <span className="treeItem-name">{node.name}</span>
                  <span className="treeItem-desc">
                    {node.description ||
                      "Lorem ipsum dolor sit amet, consectetur"}
                  </span>
                </div>
                {(node.children === undefined ||
                  node.children.length === 0) && (
                  <button className="btn btn-light treeItem-action" size="xs">
                    <span style={{ fontSize: 12 }}>
                      {languageManager.translate("ITEMS_CATEGORIES_CONTENT")}
                    </span>
                  </button>
                )}
              </div>
            }
          </ListGroupItem>
          {node.children && (
            <Collapse isOpen={this.state[id]}>
              {this.mapper(node.children, id, (lvl || 0) + 1)}
            </Collapse>
          )}
        </>
      );
    });
  };

  render() {
    return <ListGroup>{this.mapper(this.props.data)}</ListGroup>;
  }
}

export default Tree;
