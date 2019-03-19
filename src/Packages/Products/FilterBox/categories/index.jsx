import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { languageManager } from "../../../../services";

class Tree extends Component {
  state = {
    selected: {},
    hasContentType: false,
    currentLang :languageManager.getCurrentLanguage().name
  };
  static getDerivedStateFromProps(props, current_state) {
    if (!props.leftContent) {
      return {
        selected: {}
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
      const id = `${node.id}-${parentId ? parentId : "top"}`.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      );
      return (
        <>
          <ListGroupItem
            key={id}
            style={{
              zIndex: 0,
              padding: 10,
              background:
                this.state.selected.id === node.id ? "lightgray" : "white"
            }}
            className={`listGroupItem ${
              parentId ? `rounded-0 ${lvl ? "border-bottom-0" : ""}` : ""
            }`}
          >
            {
              <div className="treeItem">
                {node.children && node.children.length > 0 ? (
                  <div id={id} onClick={this.toggle}>
                    {this.state[id] ? (
                      <i className="icon-caret-down" />
                    ) : (
                      <i className="icon-caret-right" />
                    )}
                    <label className="form-check-label">{node.name[this.state.currentLang]}</label>
                  </div>
                ) : (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={"chk" + id}
                      />
                      <label className="form-check-label" for={"chk" + id}>
                        {node.name[this.state.currentLang]}
                      </label>
                    </div>
                  </>
                )}
                {/* <div className="treeItem-text">
                  <span className="treeItem-name">{node.name}</span>
                </div> */}
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
    return (
      <div className="filterBox">
        <div className="filter-header">Categories</div>
        <div className="filter-body">
          <ListGroup className="listGroup">
            {this.mapper(this.props.data)}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Tree;
