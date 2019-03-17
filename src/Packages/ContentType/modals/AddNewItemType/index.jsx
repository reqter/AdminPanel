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
import { languageManager } from "../../../../services";
import "./styles.scss";
const templates = [
  {
    id: "1",
    name: "dataCollection",
    title: "Data Collection",
    description: "Create an item type with custom fields",
    icon: "",
    fields: [],
    allowCustomFields: true
  },
  {
    id: "2",
    name: "content",
    title: "Content",
    description: "it does not allow you to have custom fields",
    icon: "",
    fields: [
      {
        id: Math.random(),
        name: "body",
        title: "Body",
        description: "",
        type: "richText",
        isBase: true
      }
    ],
    allowCustomFields: true
  },
  {
    id: "3",
    name: "gallery",
    title: "Gallery",
    description: "Making custom gallery data",
    icon: "icon-images",
    fields: [
      {
        id: Math.random(),
        name: "images",
        title: "Images",
        description: "",
        type: "media",
        isList: true,
        isBase: true
      }
    ],
    allowCustomFields: true
  }
];
const UpsertTemplate = props => {
  const { updateMode } = props;
  const submitBtnText = !updateMode
    ? languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_NEW")
    : languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_EDIT");
  const selectedItemType = updateMode ? props.selectedItemType : undefined;

  const [isOpen, toggleModal] = useState(true);

  const [modalHeaderTitle, setModalHeader] = useState(
    !updateMode
      ? languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_NEW")
      : languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_EDIT")
  );

  const [tab, changeTab] = useState(updateMode ? 2 : 1);
  const [newFieldHeaderTitle, setAddFieldHeaderTitle] = useState(
    languageManager.translate("CONTENT_TYPE_ADD_FIELD_TITLE")
  );
  const [selectedTemplate, setTemplate] = useState(
    updateMode ? props.selectedTemplate : {}
  );
  const [name, setName] = useState(
    selectedItemType ? selectedItemType.name : ""
  );
  const [title, setTitle] = useState(
    selectedItemType ? selectedItemType.title : ""
  );
  const [description, setDescription] = useState(
    selectedItemType ? selectedItemType.description : ""
  );

  useEffect(() => {
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, []);

  function closeModal() {
    props.onCloseModal();
  }
  function handleChooseTemplate(tmp) {
    changeTab(2);
    setTemplate(tmp);
    const title =
      languageManager.translate("CONTENT_TYPE_ADD_FIELD_CHOOSEN") +
      " " +
      tmp.name;
    setAddFieldHeaderTitle(title);
  }
  function backToTemplates() {
    const title = languageManager.translate("CONTENT_TYPE_ADD_FIELD_CHOOSEN");
    setAddFieldHeaderTitle(title);
    changeTab(1);
  }
  function handleNameChanged(e) {
    setName(e.target.value);
  }
  function handleTitleChanged(e) {
    setTitle(e.target.value);
  }
  function handleDescriptionChanged(e) {
    setDescription(e.target.value);
  }
  function upsertItemType() {
    const obj = {
      selectedTemplate: selectedTemplate,
      name: name,
      title: title,
      description: description
    };
    props.onCloseModal(obj);
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>{modalHeaderTitle}</ModalHeader>
      <ModalBody>
        <div className="c-category-templates-body">
          {tab === 1 ? (
            <div className="fieldsTab">
              {templates.map(tmp => (
                <div
                  key={tmp.id}
                  className="add-field-types"
                  onClick={() => handleChooseTemplate(tmp)}
                >
                  <div
                    className="add-field-icon"
                    style={{
                      backgroundColor:
                        selectedItemType &&
                        selectedItemType.template === tmp.name
                          ? "lightgray"
                          : "whitesmoke"
                    }}
                  >
                    <i className={tmp.icon || "icon-item-type"} />
                  </div>
                  <span className="title">{tmp.title}</span>
                  <span className="description">{tmp.description}</span>
                </div>
              ))}
            </div>
          ) : (
            <Form>
              <div className="row">
                <div className="form-group col">
                  <label>
                    {languageManager.translate("CONTENT_TYPE_MODAL_NAME")}
                  </label>
                  <input
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

              <FormGroup>
                <Label>
                  {languageManager.translate("CONTENT_TYPE_MODAL_DESCRIPTION")}
                </Label>
                <Input
                  type="string"
                  placeholder={languageManager.translate(
                    "CONTENT_TYPE_MODAL_DESCRIPTION_PLACEHOLDER"
                  )}
                  value={description}
                  onChange={handleDescriptionChanged}
                />
              </FormGroup>
            </Form>
          )}
        </div>
      </ModalBody>
      {tab !== 1 ? (
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={upsertItemType}
            disabled={
              name.length > 0 && title.length > 0 && !name.includes(" ")
                ? false
                : true
            }
          >
            {submitBtnText}
          </Button>
          {!updateMode && (
            <Button color="secondary" onClick={backToTemplates}>
              Templates
            </Button>
          )}
        </ModalFooter>
      ) : (
        undefined
      )}
    </Modal>
  );
};

export default UpsertTemplate;
