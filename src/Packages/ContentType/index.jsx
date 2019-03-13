import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./styles.scss";
import List from "./list";
import AddNewField from "./modals/AddNewField";
import { languageManager } from "../../services";

let data = [
  {
    id: "1",
    name: "Car",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "contentType"
  },

  {
    id: "7",
    name: "Home",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "contentType"
  },
  {
    id: "8",
    name: "Football",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "contentType"
  },
  {
    id: "9",
    name: "Appliance",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "contentType"
  },
  {
    id: "10",
    name: "Flower",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "contentType"
  }
];

let baseFields = [
  {
    id: Math.random().toString(),
    name: "name",
    title: "Name",
    description: "name of each product",
    type: "string",
    isBase: true
  },

  // {
  //   id: Math.random().toString(),
  //   name: "code",
  //   title: "Code",
  //   description: "",
  //   type: "number",
  //   isBase: true
  // },
  {
    id: Math.random().toString(),
    name: "thumbnail",
    title: "Thumbnail",
    description: "",
    type: "media",
    isBase: true
  },
  {
    id: Math.random().toString(),
    name: "images",
    title: "Images",
    description: "",
    type: "media",
    isBase: true,
    isList: true
  },
  {
    id: Math.random().toString(),
    name: "shortDesc",
    title: "Short Description",
    description: "",
    type: "string",
    isBase: true
  },
  {
    id: Math.random().toString(),
    name: "longDesc",
    title: "Long Description",
    description: "",
    type: "richText",
    isBase: true
  },
  {
    id: Math.random().toString(),
    name: "price",
    title: "Price",
    description: "",
    type: "number",
    isBase: true
  }
];

const ItemTypes = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;
  // variables and handlers
  const addItem_nameInput = useRef(null);
  const [upsertItemTypeModal, setModal] = useState(false);
  const [upsertFieldModal, toggleUpsertFieldModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemTypesData, setData] = useState([]);
  const [selectedItemType, setItemType] = useState({});
  const [fields, setFields] = useState([]);
  const [updateMode, setUpdateMode] = useState();
  const [modalHeaderTitle, setModalHeader] = useState("");
  const [modalUpsertBtn, setModalUpsertBtnText] = useState("");
  const [rightContent, toggleRightContent] = useState(false);

  useEffect(() => {
    setData(data);
  });

  function initModalForm() {
    setName("");
    setDescription("");
  }
  function toggleModal() {
    setModalHeader(
      languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_NEW")
    );
    setModalUpsertBtnText(
      languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_NEW")
    );
    setModal(prevModal => !prevModal);
    initModalForm();
  }
  function handleNameChanged(e) {
    setName(e.target.value);
  }
  function handleDesciptionChanged(e) {
    setDescription(e.target.value);
  }

  function updateNodeInList(list, node, newValue) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === node.id) {
        list[i] = newValue;
        break;
      }
    }
  }

  function deleteNodeInList(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === node.id) {
        list.splice(i, 1);
        return;
      }
    }
  }

  function editItemType(item) {
    setModal(prevModal => !prevModal);
    setItemType(item);
    setUpdateMode(true);
    setName(item.name);
    setDescription(item.description);
    setModalHeader(
      languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_EDIT")
    );
    setModalUpsertBtnText(
      languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_EDIT")
    );
  }
  function upsertItemType() {
    if (updateMode) {
      let obj = {};
      for (const key in selectedItemType) {
        obj[key] = selectedItemType[key];
      }
      obj["name"] = name;
      obj["description"] = description;
      updateNodeInList(data, selectedItemType, obj);
      setData(data);
      toggleModal();
    } else {
      const obj = {
        id: Math.random(),
        name: name,
        description: description,
        type: "contentType"
      };
      data.push(obj);
      setData(data);
      initModalForm();
    }
  }
  function removeItemType(selected) {
    deleteNodeInList(data, selected);
    const d = [...data];
    setData(d);
    toggleRightContent(false);
  }
  function closeRightContent() {
    toggleRightContent();
  }
  // field
  function showFields(item) {
    if (!rightContent) toggleRightContent(true);
    setItemType(item);
    let m = baseFields;
    if (item.fields !== undefined) m = [...baseFields, ...item.fields];
    setFields(m);
  }
  function closeAddFieldModal() {
    toggleUpsertFieldModal(false);
  }
  function addNewField() {
    toggleUpsertFieldModal(prevModal => !prevModal);
  }
  function handleAddField(field) {
    debugger;
    if (selectedItemType.fields === undefined) selectedItemType.fields = [];
    const m = [...fields];
    m.push(field);
    setFields(m);
    selectedItemType.fields.push(field);
    updateNodeInList(data, selectedItemType, selectedItemType); //
  }
  function handleRemoveField(field) {
    const m = fields.filter(item => item.id !== field.id);
    setFields(m);
    selectedItemType.fields = m;
    updateNodeInList(data, selectedItemType, selectedItemType); //
  }
  return (
    <>
      <div className="ct-wrapper">
        <div className="ct-header">
          <div className="ct-header-left">
            <span className="ct-header-title">{pageTitle}</span>
            <span className="ct-header-description">{pageDescription}</span>
          </div>
          <div className="ct-header-right">
            <button className="btn btn-primary" onClick={toggleModal}>
              {languageManager.translate("CONTENT_TYPE_NEW_ITEM_BTN")}
            </button>
          </div>
        </div>
        <div className="ct-content">
          <div className="ct-content-left">
            <List
              rightContent={rightContent}
              data={itemTypesData}
              handleEditType={selected => editItemType(selected)}
              handleDeleteType={selected => removeItemType(selected)}
              handleShowFields={selected => showFields(selected)}
            />
          </div>
          {rightContent && (
            <div className="ct-content-right animated slideInRight faster">
              <div className="ct-content-right-header">
                <span className="ct-right-header-title">
                  {languageManager.translate("CONTENT_TYPE_MODEL_HEADER_TITLE")}
                </span>
                <span className="ct-right-header-description">
                  {languageManager.translate("CONTENT_TYPE_MODEL_HEADER_DESC")}
                </span>
                <span
                  className="icon-cross closeIcon"
                  onClick={closeRightContent}
                />
              </div>
              <div className="ct-content-right-body">
                <div className="fieldsContent">
                  {fields &&
                    fields.map(field => (
                      <div className="fieldItem" key={field.id}>
                        <div className="fieldItem-icon">
                          <i className="icon-more-h" />
                        </div>
                        <div className="fieldItem-type">
                          <i
                            className={
                              field.type === "string"
                                ? "icon-file-text"
                                : field.type === "number"
                                ? "icon-number"
                                : field.type === "dateTime"
                                ? "icon-calendar"
                                : field.type === "location"
                                ? "icon-location"
                                : field.type === "media"
                                ? "icon-images"
                                : field.type === "jsonObject"
                                ? "icon-json-file"
                                : field.type === "reference"
                                ? "icon-reference"
                                : field.type === "boolean"
                                ? "icon-boolean"
                                : "icon-file-text"
                            }
                          />
                        </div>
                        <div className="fieldItem-name">{field.name}</div>
                        <div className="fieldItem-title">{field.title}</div>

                        <div className="fieldItem-actions">
                          {field.isBase === undefined || !field.isBase ? (
                            <>
                              <button
                                className="btn btn-link"
                                size="xs"
                                onClick={() => handleRemoveField(field)}
                              >
                                <i className="icon-bin" />
                              </button>
                              <button className="btn btn-link" size="xs">
                                Settings
                              </button>
                            </>
                          ) : (
                            <span className="badge badge-danger label-nonEditable">
                              Non-editable
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="btnNewFieldContent">
                  <button className="btn btn-primary" onClick={addNewField}>
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={upsertItemTypeModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalHeaderTitle}</ModalHeader>
        <ModalBody>
          <div className="ct-category-modal-body">
            <Form>
              <div className="form-group">
                <label>
                  {languageManager.translate("CONTENT_TYPE_MODAL_NAME")}
                </label>
                <input
                  ref={addItem_nameInput}
                  type="text"
                  className="form-control"
                  placeholder={languageManager.translate(
                    "CONTENT_TYPE_MODAL_NAME_PLACEHOLDER"
                  )}
                  value={name}
                  required
                  onChange={handleNameChanged}
                />
                <small className="form-text text-muted">
                  {languageManager.translate(
                    "CONTENT_TYPE_MODAL_NAME_DESCRIPTION"
                  )}
                </small>
              </div>
              <FormGroup>
                <Label for="exampleEmail">
                  {languageManager.translate("CONTENT_TYPE_MODAL_DESCRIPTION")}
                </Label>
                <Input
                  type="string"
                  placeholder={languageManager.translate(
                    "CONTENT_TYPE_MODAL_DESCRIPTION_PLACEHOLDER"
                  )}
                  value={description}
                  onChange={handleDesciptionChanged}
                />
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={() => upsertItemType(selectedItemType)}
            disabled={name.length > 0 ? false : true}
          >
            {modalUpsertBtn}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            {languageManager.translate("CANCEL")}
          </Button>
        </ModalFooter>
      </Modal>
      {upsertFieldModal && (
        <AddNewField
          selectedItemType={selectedItemType}
          isOpen={upsertFieldModal}
          onCloseModal={closeAddFieldModal}
          onAddField={field => handleAddField(field)}
        />
      )}
    </>
  );
};

export default ItemTypes;
