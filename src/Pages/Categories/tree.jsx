import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";

class Tree extends Component {
  state = {
    selected: {},
    currentLang: "en",
  };
  static getDerivedStateFromProps(props, current_state) {
    if (!props.rightContent) {
      return {
        selected: {},
      };
    }
    return null;
  }

  toggle = event => {
    const id = event.target.getAttribute("id");
    this.setState(state => ({ [id]: !state[id] }));
  };
  mapper = (nodes, parentId, lvl) => {
    return nodes.map((node, index) => {
      const id = `${node._id}-${parentId ? parentId : "top"}`.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      );
      return (
        <>
          <ListGroupItem
            style={{
              zIndex: 0,
              padding: 10,
              background: this.state.selected
                ? this.state.selected._id === node._id
                  ? "lightgray"
                  : "white"
                : "white",
            }}
            className={`treeItemParent ${
              parentId ? `rounded-0 ${lvl ? "border-bottom-0" : ""}` : ""
            }`}
          >
            {
              <div
                className="treeItem"
                style={{
                  paddingLeft: `${15 * lvl}px`,
                }}
              >
                {node.items && node.items.length > 0 ? (
                  <>
                    <div
                      className="btnCategoryCollapse"
                      id={id}
                      color="primary"
                      onClick={this.toggle}
                    >
                      {this.state[id] ? (
                        <span className="icon-caret-down" id={id} />
                      ) : (
                        <span className="icon-caret-right" id={id} />
                      )}
                    </div>
                    {node.image !== undefined ? (
                      <div className="treeItem-img">
                        <img
                          src={node.image[this.state.currentLang]}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="treeItem-icon">
                        <div className="contentIcon">
                          <i className="icon-item-type" />
                        </div>
                      </div>
                    )}
                  </>
                ) : node.image !== undefined ? (
                  <>
                    <button className="btnCategoryLeaf btn btn-link btn-sm">
                      <i className="icon-circle-o" />
                    </button>
                    <div className="treeItem-img">
                      <img
                        src={node.image[this.state.currentLang]}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <button className="btnCategoryLeaf btn btn-link btn-sm">
                      <i className="icon-circle-o" />
                    </button>
                    <div className="treeItem-icon">
                      <div className="contentIcon">
                        <i className="icon-item-type" />
                      </div>
                    </div>
                  </>
                )}
                <div className="treeItem-text">
                  <span className="treeItem-name">
                    {node.name[this.state.currentLang]}
                  </span>
                  <span className="treeItem-desc">
                    {node.shortDesc
                      ? node.shortDesc[this.state.currentLang].length > 0
                        ? node.shortDesc[this.state.currentLang]
                        : "Lorem ipsum dolor sit amet, consectetur"
                      : "Lorem ipsum dolor sit amet, consectetur"}
                  </span>
                </div>

                
                {/* hoverAction */}
                {(node.items === undefined ||
                  node.items.length === 0) && (
                  <button
                    className="btn btn-light treeItem-action "
                    size="xs"
                    onClick={() => this.props.handleDeleteCategory(node)}
                  >
                    <i className="icon-bin" />
                  </button>
                )}
                {/* hoverAction */}
                <button
                  className="btn btn-light treeItem-action "
                  size="xs"
                  onClick={() => this.props.handleEditCategory(node)}
                >
                  <i className="icon-pencil" />
                </button>
                {(node.itemTypes === undefined ||
                  node.itemTypes.length === 0) && (
                  <button
                    className="btn btn-light treeItem-action"
                    size="xs"
                    onClick={() => this.props.handleNewCategory(node)}
                  >
                    <i
                      className="icon-plus"
                      style={{ fontWeight: "bold" }}
                    />
                  </button>
                )}
              </div>
            }
          </ListGroupItem>
          {node.items && (
            <Collapse isOpen={this.state[id]}>
              {this.mapper(node.items, id, (lvl || 0) + 1)}
            </Collapse>
          )}
        </>
      );
    });
  };

  render() {
    const { data } = this.props;
    return data && data.length > 0 ? (
      <ListGroup>{this.mapper(data)}</ListGroup>
    ) : null;
  }
}

export default Tree;
