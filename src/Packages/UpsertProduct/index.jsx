import React, { useState } from "react";
import "./styles.scss";
import { Form, Input, FormGroup, Label } from "reactstrap";
import { languageManager } from "./../../services";
import CategoriesModal from "./Categories";

const UpsertProduct = props => {
   
  // variables
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [categoryModal, toggleCategoryModal] = useState(false);
  function handleNameChanged(e) {}
  function handleTitleChanged(e) {}
  function handleDescriptionChanged(e) {}
  function showCatgoryModal() {
    toggleCategoryModal(true);
  }
 
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light">
          <i className="icon-arrow-left2" />
          Products
        </button>
      </div>
      <div className="up-content">
        <main>
          <div className="up-content-title">Add New Product</div>
          <div className="up-categoryBox">
            <span>Apartment</span>
            <button className="btn btn-link" onClick={showCatgoryModal}>
              Change Category
            </button>
          </div>
          <div className="up-formInputs">
            <div className="row">
              <div className="form-group col">
                <label>
                  {languageManager.translate(
                    "CONTENT_TYPE_ADD_FIELD_MODAL_NAME"
                  )}
                </label>
                <input
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

              <FormGroup className="col">
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
            </div>
          </div>
        </main>
      </div>
      {categoryModal && (
        <CategoriesModal
          onCloseModal={() => toggleCategoryModal(false)}
        />
      )}
    </div>
  );
};

export default UpsertProduct;
