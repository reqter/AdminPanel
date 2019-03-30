import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import List from "./list";
import AddNewField from "./modals/AddNewField";
import AddNewItemType from "./modals/AddNewItemType";
import { languageManager, useGlobalState } from "../../services";
import {
  getContentTypes,
  deleteContentType,
  removeContentTypeField
} from "./../../Api/contentType-api";
const ItemTypes = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const [{ contentTypes, fields }, dispatch] = useGlobalState();

  useEffect(() => {
    getContentTypes()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .call();
  }, []);

  const { name: pageTitle, desc: pageDescription } = props.component;
  // variables and handlers
  const [upsertFieldModal, toggleUpsertFieldModal] = useState(false);
  const [upsertItemTypeModal, toggleUpserItemTypeModal] = useState(false);
  const [selectedContentType, setItemType] = useState({});
  const [updateMode, setUpdateMode] = useState();

  const [rightContent, toggleRightContent] = useState(false);

  function openAddItemTypeModal() {
    setUpdateMode(false);
    toggleUpserItemTypeModal(true);
  }

  function editItemType(item) {
    setItemType(item);
    setUpdateMode(true);
    toggleUpserItemTypeModal(true);
  }

  function removeItemType(selected) {
    deleteContentType()
      .onOk(result => {
        if (selected.sys.id === selectedContentType.sys.id)
          toggleRightContent(false);
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .call(selected);
  }
  function closeRightContent() {
    toggleRightContent();
  }

  /////////////////////////////// fields
  function showFields(item) {
    if (!rightContent) toggleRightContent(true);
    setItemType(item);
    dispatch({ type: "SET_FIELDS", value: [...item.fields] });
  }
  function closeAddFieldModal(field) {
    if (field) {
      const f = fields;
      f.push(field);
      dispatch({ type: "SET_FIELDS", value: f });
    }
    // dispatch({
    //   type: "SET_CONTENT_TYPES",
    //   value: result
    // });
    toggleUpsertFieldModal(false);
  }
  function addNewField() {
    toggleUpsertFieldModal(prevModal => !prevModal);
  }
  function handleRemoveField(field) {
    removeContentTypeField()
      .onOk(result => {
        const f = [...fields].filter(item => item.id !== field.id);
        dispatch({ type: "SET_FIELDS", value: f });
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .call(selectedContentType.sys.id, field.id);
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
                        //   display: !selectedContentType.allowCustomFields
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
                  {selectedContentType.allowCustomFields && (
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
          selectedContentType={selectedContentType}
          updateMode={updateMode}
          isOpen={upsertFieldModal}
          onCloseModal={() => toggleUpserItemTypeModal(false)}
        />
      )}
      {upsertFieldModal && (
        <AddNewField
          selectedContentType={selectedContentType}
          isOpen={upsertFieldModal}
          onCloseModal={closeAddFieldModal}
        />
      )}
    </>
  );
};

export default ItemTypes;
