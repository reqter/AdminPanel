import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import List from "./list";
import AddNewField from "./modals/AddNewField";
import AddNewItemType from "./modals/AddNewItemType";
import { languageManager, useGlobalState } from "../../services";

const ItemTypes = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const [{ contentTypes }, dispatch] = useGlobalState();

  const { name: pageTitle, desc: pageDescription } = props.component;
  // variables and handlers
  const [upsertFieldModal, toggleUpsertFieldModal] = useState(false);
  const [upsertItemTypeModal, toggleUpserItemTypeModal] = useState(false);
  const [selectedItemType, setItemType] = useState({});
  const [fields, setFields] = useState([]);
  const [updateMode, setUpdateMode] = useState();

  const [rightContent, toggleRightContent] = useState(false);

  function openAddItemTypeModal() {
    setUpdateMode(false);
    toggleUpserItemTypeModal(true);
  }

  function closeAddItemTypeModal(item) {
    if (item === undefined) toggleUpserItemTypeModal(false);
    else upsertItemType(item);
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
    setItemType(item);
    setUpdateMode(true);
    toggleUpserItemTypeModal(true);
  }

  function upsertItemType(item) {
    if (updateMode) {
      let obj = {};
      for (const key in selectedItemType) {
        obj[key] = selectedItemType[key];
      }
      obj["name"] = item.name;
      obj["title"] = item.title;
      obj["description"] = item.description;
      updateNodeInList(contentTypes, selectedItemType, obj);
      dispatch({
        type: "SET_CONTENT_TYPES",
        value: contentTypes
      });
      toggleUpserItemTypeModal(false);
    } else {
      let obj = {
        id: Math.random(),
        name: item.name,
        title: item.title,
        description: item.description,
        fields: item.selectedTemplate.fields,
        type: "contentType",
        template: item.selectedTemplate.name,
        allowCustomFields: item.selectedTemplate.allowCustomFields
      };
      let data = [...contentTypes];
      data.push(obj);
      dispatch({
        type: "SET_CONTENT_TYPES",
        value: data
      });
      toggleUpserItemTypeModal(false);
      console.log(contentTypes);
    }
  }
  function removeItemType(selected) {
    deleteNodeInList(contentTypes, selected);
    const data = [...contentTypes];
    dispatch({
      type: "SET_CONTENT_TYPES",
      value: data
    });
    toggleRightContent(false);
  }
  function closeRightContent() {
    toggleRightContent();
  }

  // field
  function showFields(item) {
    if (!rightContent) toggleRightContent(true);
    setItemType(item);
    setFields(item.fields);
  }
  function closeAddFieldModal() {
    toggleUpsertFieldModal(false);
  }
  function addNewField() {
    toggleUpsertFieldModal(prevModal => !prevModal);
  }
  function handleAddField(field) {
    if (selectedItemType.fields === undefined) selectedItemType.fields = [];
    const m = [...fields];
    m.push(field);
    setFields(m);
    selectedItemType.fields.push(field);
    updateNodeInList(contentTypes, selectedItemType, selectedItemType); //
    dispatch({
      type: "SET_CONTENT_TYPES",
      value: contentTypes
    });
  }
  function handleRemoveField(field) {
    const m = fields.filter(item => item.id !== field.id);
    setFields(m);
    selectedItemType.fields = m;
    updateNodeInList(contentTypes, selectedItemType, selectedItemType); //
    dispatch({
      type: "SET_CONTENT_TYPES",
      value: contentTypes
    });
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
            <button className="btn btn-primary" onClick={openAddItemTypeModal}>
              {languageManager.translate("CONTENT_TYPE_NEW_ITEM_BTN")}
            </button>
          </div>
        </div>
        <div className="ct-content">
          <div className="ct-content-left">
            <List
              rightContent={rightContent}
              data={contentTypes}
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
                  {/* <SortableContainer onSortEnd={onSortEnd}>
                    {fields.map((value, index) => (
                      <SortableItem
                        key={`item-${index}`}
                        index={index}
                        field={value}
                      />
                    ))}
                  </SortableContainer> */}
                  {fields &&
                    fields.map(field => (
                      <div
                        className="fieldItem"
                        key={field.id}
                        // style={{
                        //   display: !selectedItemType.allowCustomFields
                        //     ? field.isBase
                        //       ? "none"
                        //       : "flex"
                        //     : "flex"
                        // }}
                      >
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
                        <div className="fieldItem-title">
                          {field.title[currentLang]}
                        </div>

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
                            // <span className="badge badge-danger label-nonEditable">
                            //   Non-editable
                            // </span>
                            <div />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="btnNewFieldContent">
                  {selectedItemType.allowCustomFields && (
                    <button className="btn btn-primary" onClick={addNewField}>
                      <i className="icon-plus" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {upsertItemTypeModal && (
        <AddNewItemType
          selectedItemType={selectedItemType}
          updateMode={updateMode}
          isOpen={upsertFieldModal}
          onCloseModal={closeAddItemTypeModal}
        />
      )}
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
