import React, { useState } from "react";
import "./styles.scss";
import { Form, Input, FormGroup, Label } from "reactstrap";
import { languageManager } from "./../../services";
import CategoriesModal from "./Categories";

const UpsertProduct = props => {
  let hasContentType = props.location.params
    ? props.location.params.hasContentType
    : false;
  // variables
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [categoryBoxTitle, setCategoryBoxTitle] = useState(
    checkPropsToSetCategoryBoxTitle()
  );
  const [selectedNode, setSelectedNode] = useState(
    props.location.params ? props.location.params.selectedNode : undefined
  );

  function checkPropsToSetCategoryBoxTitle() {
    const selectedNode =
      props !== undefined
        ? props.location !== undefined
          ? props.location.params !== undefined
            ? props.location.params.selectedNode
            : undefined
          : undefined
        : undefined;
    hasContentType =
      props !== undefined
        ? props.location !== undefined
          ? props.location.params !== undefined
            ? props.location.params.hasContentType
            : undefined
          : undefined
        : undefined;
    if (selectedNode === undefined) {
      if (hasContentType !== undefined && hasContentType)
        return "Choose an item type";
      return "Choose a category";
    } else {
      if (selectedNode.itemType) return selectedNode.itemType.name;
      return selectedNode.name;
    }
  }

  // methods
  function handleNameChanged(e) {}
  function handleTitleChanged(e) {}
  function handleDescriptionChanged(e) {}
  function showCatgoryModal() {
    toggleCategoryModal(true);
  }
  function onCloseModel(selected) {
    setSelectedNode(selected);
    setCategoryBoxTitle(selected.name);
    toggleCategoryModal(false);
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light">
          <i className="icon-arrow-left2" />
          Back
        </button>
      </div>
      <div className="up-content">
        <main>
          <div className="up-content-title">Add New Product</div>
          <div className="up-categoryBox">
            <span>{categoryBoxTitle}</span>
            <button className="btn btn-link" onClick={showCatgoryModal}>
              {hasContentType ? "Change item" : "Change category"}
            </button>
          </div>
          <div className="up-formInputs">
            <FormGroup className="rowItem">
              <Label>
                {languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE"
                )}
              </Label>
              <Input
                type="string"
                value={title}
                placeholder={languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE_PLACEHOLDER"
                )}
                onChange={handleTitleChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                {languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE_INFO"
                )}
              </small>
            </FormGroup>
            <div className="form-group rowItem shortDesc">
              <label>Short Descrption</label>
              <textarea
                type="text"
                className="form-control"
                placeholder={languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_NAME_PLACEHOLDER"
                )}
                value={name}
                required
                onChange={handleNameChanged}
              />
              <small className="form-text text-muted">
                {languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_NAME_INFO"
                )}
              </small>
            </div>

            <div className="up-uploader rowItem">
              <span className="title">Thumbnail</span>
              <span className="description">You can have an image as main</span>
              <div className="files">
                <div className="files-input">
                  <i className="icon-camera" />
                </div>
              </div>
            </div>
            <div className="up-uploader rowItem">
              <span className="title">Images</span>
              <span className="description">
                All of these uploaded images is going to show in detailes of
                item
              </span>
              <div className="files">
                <div className="files-uploaded">
                  <div className="files-uploaded-icon">
                    <i className="icon-bin" />
                  </div>
                  <img
                    src="https://myresources1195.blob.core.windows.net/images/banana.jpg"
                    alt=""
                  />
                </div>
                <div className="files-uploaded">
                  <div className="files-uploaded-icon">
                    <i className="icon-bin" />
                  </div>
                  <img
                    src="https://myresources1195.blob.core.windows.net/images/per.jpg"
                    alt=""
                  />
                </div>
                <div className="files-uploaded">
                  <div className="files-uploaded-icon">
                    <i className="icon-bin" />
                  </div>
                  <img
                    src="https://myresources1195.blob.core.windows.net/images/apple.jpg"
                    alt=""
                  />
                </div>
                <div className="files-input">
                  <i className="icon-camera" />
                </div>
              </div>
            </div>

            <div className="form-group rowItem longDesc">
              <label>Long Descrption</label>
              <textarea
                type="text"
                className="form-control"
                placeholder={languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_NAME_PLACEHOLDER"
                )}
                value={name}
                required
                onChange={handleNameChanged}
              />
              <small className="form-text text-muted">
                {languageManager.translate(
                  "CONTENT_TYPE_ADD_FIELD_MODAL_NAME_INFO"
                )}
              </small>
            </div>
            <div className="actions">
              <button className="btn btn-primary ">Add Item</button>
            </div>
          </div>
        </main>
      </div>
      {categoryModal && (
        <CategoriesModal
          hasContentType={hasContentType}
          onCloseModal={onCloseModel}
        />
      )}
    </div>
  );
};

export default UpsertProduct;
