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
const fields = [
  {
    name: "string",
    title: languageManager.translate("FIELD_TYPE_TEXT"),
    description: languageManager.translate("FIELD_TYPE_TEXT_INFO"),
    icon: "icon-file-text"
  },
  {
    name: "number",
    title: languageManager.translate("FIELD_TYPE_NUMBER"),
    description: languageManager.translate("FIELD_TYPE_NUMBER_INFO"),
    icon: "icon-number"
  },
  {
    name: "dateTime",
    title: languageManager.translate("FIELD_TYPE_DATE_TIME"),
    description: languageManager.translate("FIELD_TYPE_DATE_TIME_INFO"),
    icon: "icon-calendar"
  },
  {
    name: "location",
    title: languageManager.translate("FIELD_TYPE_LOCATION"),
    description: languageManager.translate("FIELD_TYPE_LOCATION_INFO"),
    icon: "icon-location"
  },
  {
    name: "media",
    title: languageManager.translate("FIELD_TYPE_MEDIA"),
    description: languageManager.translate("FIELD_TYPE_MEDIA_INFO"),
    icon: "icon-images"
  },
  {
    name: "boolean",
    title: languageManager.translate("FIELD_TYPE_BOOLEAN"),
    description: languageManager.translate("FIELD_TYPE_BOOLEAN_INFO"),
    icon: "icon-boolean"
  },
  {
    name: "keyValue",
    title: languageManager.translate("FIELD_TYPE_KEY_VALUE"),
    description: languageManager.translate("FIELD_TYPE_KEY_VALUE_INFO"),
    icon: "icon-combo-box"
  },
  {
    name: "richText",
    title: languageManager.translate("FIELD_TYPE_RICH_TEXT"),
    description: languageManager.translate("FIELD_TYPE_RICH_TEXT_INFO"),
    icon: "icon-file-text"
  }
  // {
  //   name: "jsonObject",
  //   title: languageManager.translate("FIELD_TYPE_OBJECT"),
  //   description: languageManager.translate("FIELD_TYPE_OBJECT_INFO"),
  //   icon: "icon-json-file"
  // },
  // {
  //   name: "reference",
  //   title: languageManager.translate("FIELD_TYPE_REFERENCE"),
  //   description: languageManager.translate("FIELD_TYPE_REFERENCE_INFO"),
  //   icon: "icon-reference"
  // }
];

const AddNewField = props => {
  console.log('list')
  const category = props.selectedCategory;

  const [isOpen, toggleModal] = useState(true);
  const nameInput = useRef(null); //  ref is defined here
  const [tab, changeTab] = useState(1);
  const [newFieldHeaderTitle, setAddFieldHeaderTitle] = useState(
    languageManager.translate("CONTENT_TYPE_ADD_FIELD_TITLE")
  );
  const [selectedField, setField] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  });
  function closeAddFieldModal(params) {
    props.onCloseModal();
  }
  function handleChooseField(field) {
    changeTab(2);
    setField(field);
    const title =
      languageManager.translate("CONTENT_TYPE_ADD_FIELD_CHOOSEN") +
      " " +
      field.title;
    setAddFieldHeaderTitle(title);
    //nameInput.current.focus(); // focus after changing tab on first input
  }
  function backToFields(params) {
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
  function resetForm() {
    setName("");
    setTitle("");
    setDescription("");
  }
  function addField() {
    const obj = {
      id: Math.random().toString(),
      name: name,
      title: title,
      description: description,
      type: selectedField.name
    };
    props.onAddField(obj);
    resetForm();
  }
  function addField_configure() {}
  return (
    <Modal isOpen={isOpen} toggle={closeAddFieldModal} size="lg">
      <ModalHeader toggle={closeAddFieldModal}>
        {newFieldHeaderTitle}
      </ModalHeader>
      <ModalBody>
        <div className="c-category-addField-body">
          {tab === 1 ? (
            <div className="fieldsTab">
              {fields.map(field => (
                <div
                  key={field.icon}
                  className="add-field-types"
                  onClick={() => handleChooseField(field)}
                >
                  <div className="add-field-icon">
                    <i className={field.icon} />
                  </div>
                  <span className="title">{field.title}</span>
                  <span className="description">{field.description}</span>
                </div>
              ))}
            </div>
          ) : (
            <Form className="formTab">
              <div className="row">
                <div className="form-group col">
                  <label>
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_NAME"
                    )}
                  </label>
                  <input
                    ref={nameInput} // using ref
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
              <div className="formTab-row">
                <FormGroup>
                  <Label>
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_DESCRIPTION"
                    )}
                  </Label>
                  <Input
                    type="string"
                    value={description}
                    placeholder={languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_DESCRIPTION_PLACEHOLDER"
                    )}
                    onChange={handleDescriptionChanged}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_DESCRIPTION_INFO"
                    )}
                  </small>
                </FormGroup>
              </div>
            </Form>
          )}
        </div>
      </ModalBody>
      {tab !== 1 ? (
        <ModalFooter>
          <Button
            color="primary"
            onClick={addField}
            disabled={
              name.length > 0 && title.length > 0 && !name.includes(" ")
                ? false
                : true
            }
          >
            {languageManager.translate(
              "CONTENT_TYPE_ADD_FIELD_MODAL_CREATE_BTN"
            )}
          </Button>
          {/* <Button
            color="primary"
            onClick={addField_configure}
            disabled={
              name.length > 0 && title.length > 0 && !name.includes(" ")
                ? false
                : true
            }
          >
            {languageManager.translate(
              "CONTENT_TYPE_ADD_FIELD_MODAL_CREATE_CONFIG_BTN"
            )}
          </Button> */}
          <Button color="secondary" onClick={backToFields}>
            {languageManager.translate(
              "CONTENT_TYPE_ADD_FIELD_MODAL_CHNAGE_FIELD_BTN"
            )}
          </Button>
        </ModalFooter>
      ) : (
        undefined
      )}
    </Modal>
  );
};

export default AddNewField;
