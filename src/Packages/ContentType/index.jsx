import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import List from "./list";
import AddNewField from "./modals/AddNewField";
import FieldConfig from "./modals/FieldConfig";
import AddNewItemType from "./modals/AddNewItemType";
import { languageManager, useGlobalState } from "../../services";
import {
  getContentTypes,
  deleteContentType,
  removeContentTypeField
} from "./../../Api/contentType-api";

const ItemTypes = props => {
  const currentLang = languageManager.getCurrentLanguage().name;

  const [{ contentTypes }, dispatch] = useGlobalState();

  useEffect(() => {
    getContentTypes()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENT_TYPE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED")
          }
        });
      })
      .call();
  }, []);

  const { name: pageTitle, desc: pageDescription } = props.component;
  // variables and handlers
  const [showFieldConfig, toggleShowFieldConfig] = useState(false);
  const [upsertFieldModal, toggleUpsertFieldModal] = useState(false);
  const [upsertItemTypeModal, toggleUpserItemTypeModal] = useState(false);
  const [selectedContentType, setItemType] = useState({});
  const [updateMode, setUpdateMode] = useState();
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState();
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
        if (
          selectedContentType.sys &&
          selected.sys.id === selectedContentType.sys.id
        )
          toggleRightContent(false);
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("CONTENT_TYPE_REMOVE_ON_OK")
          }
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_ON_SERVER_ERROR"
            )
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_ON_BAD_REQUEST"
            )
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_UN_AUTHORIZED"
            )
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENT_TYPE_REMOVE__NOT_FOUND")
          }
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
    setFields([...item.fields]);
    //dispatch({ type: "SET_FIELDS", value: [...item.fields] });
  }
  function closeAddFieldModal(result) {
    toggleUpsertFieldModal(false);
    if (result) {
      const f = fields;
      f.push(result.field);
      setFields(f);
      //dispatch({ type: "SET_FIELDS", value: f });
      if (result.showConfig) {
        setSelectedField(result.field);
        toggleShowFieldConfig(true);
      }
    }
  }
  function addNewField() {
    toggleUpsertFieldModal(prevModal => !prevModal);
  }
  function handleRemoveField(field) {
    removeContentTypeField()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_FIELD_ON_OK"
            )
          }
        });
        const f = [...fields].filter(item => item.sys.id !== field.sys.id);
        setFields(f);
        //dispatch({ type: "SET_FIELDS", value: f });
        dispatch({
          type: "SET_CONTENT_TYPES",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_FIELD_ON_SERVER_ERROR"
            )
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_FIELD_ON_BAD_REQUEST"
            )
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_FIELD_UN_AUTHORIZED"
            )
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_REMOVE_FIELD_NOT_FOUND"
            )
          }
        });
      })
      .call(selectedContentType.sys.id, field.sys.id);
  }
  function closeFieldConfigModal(updatedField) {
    toggleShowFieldConfig(false);
    if (updatedField) {
      const newFields = fields.map(item => {
        if (item.sys.id === updatedField.sys.id) return updatedField;

        return item;
      });
      setFields(newFields);
    }
  }
  function showAdvanceConfig(field) {
    setSelectedField(field);
    toggleShowFieldConfig(true);
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
                        key={field.sys.id}
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
                                : field.type === "keyValue"
                                ? "icon-combo-box"
                                : "icon-file-text"
                      }
                    />
                        </div>
                        <div className="fieldItem-name">{field.name}</div>
                        <div className="fieldItem-title">
                          {field.title[currentLang]}
                        </div>

                        <div className="fieldItem-actions">
                          <button
                            className="btn btn-link"
                            size="xs"
                            onClick={() => showAdvanceConfig(field)}
                          >
                            Settings
                          </button>
                          {field.isBase === undefined || !field.isBase ? (
                            <>
                              <button
                                className="btn btn-link"
                                size="xs"
                                onClick={() => handleRemoveField(field)}
                              >
                                <i className="icon-bin" />
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
          onCloseModal={result => closeAddFieldModal(result)}
        />
      )}
      {showFieldConfig && (
        <FieldConfig
          selectedContentType={selectedContentType}
          selectedField={selectedField}
          isOpen={showFieldConfig}
          onCloseModal={closeFieldConfigModal}
        />
      )}
    </>
  );
};

export default ItemTypes;


// {
//   "sys": {
//     "id": "3",
//       "issuer": {
//       "fullName": "Saeed Padyab",
//         "image": ""
//     },
//     "issueDate": "19/01/2019 20:18"
//   },
//   "name": "userName",
//     "title": {
//     "fa": "نام کاربری",
//       "en": "UserName"
//   },
//   "description": {
//     "fa": "نام کاربری الزامی می باشد",
//       "en": "Username is required"
//   },
//   "type": "string",
//     "isBase": true,
//       "isSystemField": true,
//         "isRequired": true
// },
// {
//   "sys": {
//     "id": "4",
//       "issuer": {
//       "fullName": "Saeed Padyab",
//         "image": ""
//     },
//     "issueDate": "19/01/2019 20:18"
//   },
//   "name": "password",
//     "title": {
//     "fa": "رمز عبور",
//       "en": "Password"
//   },
//   "description": {
//     "fa": "رمز عبور باید حداقل 6رقم باشد و ترکیبی از اعداد و نشانه ها و حروف کوچک وبزرگ",
//       "en": "Password must be at least 6 character and includes capital letter and symbol and number"
//   },
//   "type": "string",
//     "isBase": true,
//       "isSystemField": true,
//         "isRequired": true
// },
// {
//   "sys": {
//     "id": "5",
//       "issuer": {
//       "fullName": "Saeed Padyab",
//         "image": ""
//     },
//     "issueDate": "19/01/2019 20:18"
//   },
//   "name": "roles",
//     "title": {
//     "fa": "نقش ها",
//       "en": "Roles"
//   },
//   "description": {
//     "fa": "",
//       "en": "Roles of this user"
//   },
//   "type": "keyValue",
//     "isSystemField": true,
//       "isBase": true,
//         "isRequired": true,
//           "isList": true
// },
// {
//   "sys": {
//     "id": "6",
//       "issuer": {
//       "fullName": "Saeed Padyab",
//         "image": ""
//     },
//     "issueDate": "19/01/2019 20:18"
//   },
//   "name": "status",
//     "title": {
//     "fa": "وضعیت",
//       "en": "Status"
//   },
//   "description": {
//     "fa": "وضعیت این کاربر",
//       "en": "Status of this user"
//   },
//   "type": "keyValue",
//     "options": [
//       { "value": "active", "selected": true },
//       { "value": "deactive" }
//     ],
//       "isList": false,
//         "isSystemField": true,
//           "isBase": true,
//             "isRequired": true
// },