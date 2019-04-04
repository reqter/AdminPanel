import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, utility, useGlobalState } from "../../../../services";
import "./styles.scss";

const acceptedMediaTypes = ["Image", "Video", "Audio", "PDF", "Spreadsheet"];
const FieldConfig = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ contentTypes }, dispatch] = useGlobalState();
  const { selectedField } = props;

  const [isOpen, toggleModal] = useState(true);
  const [tab, changeTab] = useState(1);
  const [name, setName] = useState(selectedField.name);
  const [title, setTitle] = useState(selectedField.name);
  const [translation, toggleTranslation] = useState(selectedField.isTranslate);
  const [isRequired, toggleRequired] = useState(false);
  const [isUnique, toggleUnique] = useState(false);

  const [imageUploadMethod, setImageUploadMethod] = useState("oneFile");
  const [mediaTypeVisibility, toggleMediaType] = useState(false);
  const [mediaType, setMediaType] = useState(false);

  const [referenceContentTypeChk, toggleReferenceContentType] = useState(false);
  const [selectedContentTypeRef, setContentTypeRef] = useState({});

  const [helpText, setHelpText] = useState("");
  const [booleanTrueText, setBooleanTrueText] = useState("True");
  const [booleanFalseText, setBooleanFalseText] = useState("False");

  useEffect(() => {
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, []);
  function closeModal(params) {
    props.onCloseModal();
  }

  function handleChangeName(e) {}
  function handleChangeTitle(e) {}
  function handleChangeTranslation(e) {}
  function handleRequireCheckBox(e) {
    toggleRequired(e.target.checked);
  }
  function handleUniqueCheckBox(e) {
    toggleUnique(e.target.checked);
  }
  function handleImageUploadMethod(e) {
    setImageUploadMethod(e.target.value);
  }
  function handleReferenceChk(e) {
    toggleReferenceContentType(e.target.checked);
  }
  function handleHelpTextchanged(e) {
    setHelpText(e.target.value);
  }
  function handleBooleanTrueText(e) {
    setBooleanTrueText(e.target.value);
  }
  function handleBooleanFalseText(e) {
    setBooleanFalseText(e.target.value);
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <div className="fieldConfig">
        <div className="fieldConfig-header">
          <div className="left">
            <i
              className={
                selectedField.type === "string"
                  ? "icon-file-text icon"
                  : selectedField.type === "number"
                  ? "icon-number icon"
                  : selectedField.type === "dateTime"
                  ? "icon-calendar icon"
                  : selectedField.type === "location"
                  ? "icon-location icon"
                  : selectedField.type === "media"
                  ? "icon-images icon"
                  : selectedField.type === "jsonObject"
                  ? "icon-json-file icon"
                  : selectedField.type === "reference"
                  ? "icon-reference icon"
                  : selectedField.type === "boolean"
                  ? "icon-boolean icon"
                  : "icon-file-text icon"
              }
            />
            <span className="fieldName">{selectedField.name}</span>
            <span className="fieldType">{selectedField.type}</span>
          </div>
          <div className="right">
            <div
              className="tabItem"
              style={{
                background: tab === 1 ? "white" : "whitesmoke"
              }}
              onClick={() => changeTab(1)}
            >
              Settings
            </div>
            <div
              className="tabItem"
              style={{
                background: tab === 2 ? "white" : "whitesmoke"
              }}
              onClick={() => changeTab(2)}
            >
              Validations
            </div>
            <div
              className="tabItem"
              style={{
                background: tab === 3 ? "white" : "whitesmoke"
              }}
              onClick={() => changeTab(3)}
            >
              Appearance
            </div>
          </div>
        </div>
        <div className="body">
          {tab === 1 && (
            <div className="firstTab">
              <div className="row">
                <div className="form-group col">
                  <label>{languageManager.translate("Name")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate("Field name")}
                    value={name}
                    onChange={handleChangeName}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_NAME_INFO"
                    )}
                  </small>
                </div>
                <div className="form-group col">
                  <label>{languageManager.translate("Title")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate("Filed title")}
                    value={title}
                    onChange={handleChangeTitle}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate("Display name of the field")}
                  </small>
                </div>
              </div>
              <span
                style={{
                  marginTop: 10,
                  fontSize: 14
                }}
              >
                {languageManager.translate("Field Options")}
              </span>
              <div className="custom_checkbox">
                <div className="left">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      id="localization"
                      checked={translation}
                      onChange={handleChangeTranslation}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="right">
                  <label for="localization">
                    Enable localization of this field
                  </label>
                  <label>
                    All the content can be translated to English (United States)
                    and Persian (Farsi)
                  </label>
                </div>
              </div>
              {selectedField.type === "media" && (
                <>
                  <div className="custom_checkbox ">
                    <div className="left">
                      <label class="radio">
                        <input
                          type="radio"
                          value="oneFile"
                          checked={imageUploadMethod === "oneFile"}
                          name="uploadFileMethod"
                          onChange={handleImageUploadMethod}
                          id="oneFileRadio"
                        />
                        <span class="checkround" />
                      </label>
                    </div>
                    <div className="right">
                      <label for="oneFileRadio">One File</label>
                      <label>
                        Select this if there is only one thing to store For
                        example, a single photo or one PDF file
                      </label>
                    </div>
                  </div>
                  <div className="custom_checkbox">
                    <div className="left">
                      <label class="radio">
                        <input
                          type="radio"
                          value="manyFiles"
                          checked={imageUploadMethod === "manyFiles"}
                          name="uploadFileMethod"
                          onChange={handleImageUploadMethod}
                          id="manyFileRadio"
                        />
                        <span class="checkround" />
                      </label>
                    </div>
                    <div className="right">
                      <label for="manyFileRadio">Many Files</label>
                      <label>
                        Select this if there are several things to be stored For
                        example, several photos or PDF files
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {tab === 2 && (
            <div className="secondTab">
              <div className="custom_checkbox">
                <div className="left">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      id="isRequired"
                      checked={isRequired}
                      onChange={handleRequireCheckBox}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="right">
                  <label for="isRequired">Required field</label>
                  <label>
                    You won't be able to publish an entry if this field is empty
                  </label>
                </div>
              </div>
              <div className="custom_checkbox">
                <div className="left">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      id="isUnique"
                      checked={isUnique}
                      onChange={handleUniqueCheckBox}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="right">
                  <label for="isUnique">Unique field</label>
                  <label>
                    You won't be able to publish an entry if there is an
                    existing entry with identical content
                  </label>
                </div>
              </div>
              {selectedField.type === "media" && (
                <div className="custom_checkbox">
                  <div className="left">
                    <label className="checkBox">
                      <input
                        type="checkbox"
                        id="mediaType"
                        checked={mediaTypeVisibility}
                        onChange={() =>
                          toggleMediaType(prevState => !prevState)
                        }
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="right">
                    <label for="mediaType">
                      Accept only specified file types
                    </label>
                    <label>
                      Make this field only accept specified file types
                    </label>
                    {mediaTypeVisibility && (
                      <div className="validation-configs">
                        {acceptedMediaTypes.map((type, index) => (
                          <button
                            key={"btnType" + index}
                            className={
                              "btn btn-sm " +
                              (mediaType === type ? "btn-primary" : "btn-light")
                            }
                            onClick={() => setMediaType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedField.type === "media" && (
                <div className="custom_checkbox">
                  <div className="left">
                    <label className="checkBox">
                      <input
                        type="checkbox"
                        id="referenceChk"
                        checked={referenceContentTypeChk}
                        onChange={handleReferenceChk}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="right">
                    <label for="referenceChk">
                      Accept only specified entry type
                    </label>
                    <label>
                      Make this field only accept entries from specified content
                      type(s)
                    </label>
                    {referenceContentTypeChk && (
                      <div className="validation-configs">
                        {contentTypes.map((item, index) => (
                          <button
                            className={
                              "btn btn-sm " +
                              (selectedContentTypeRef.sys
                                ? selectedContentTypeRef.sys.id === item.sys.id
                                  ? "btn-primary"
                                  : "btn-light"
                                : "btn-light")
                            }
                            key={item.sys.id}
                            onClick={() => setContentTypeRef(item)}
                          >
                            {item.title[currentLang]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {tab === 3 && (
            <div className="thirdTab">
              <span className="thirdTab-title">
                Chooes how this field should be displayed
              </span>
              <div className="apearanceUiList">
                <div className="apearanceItem">
                  Default
                  <div className="activeItem">
                    <i className="icon-checkmark" />
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 30 }}>
                <div className="form-group">
                  <label>{languageManager.translate("Help Text")}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={helpText}
                    placeholder={languageManager.translate(
                      "Try to enter maximum 255 char"
                    )}
                    onChange={handleHelpTextchanged}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      "This help text will show up below the field"
                    )}
                  </small>
                </div>
                {selectedField.type === "media" && (
                  <>
                    <div className="form-group">
                      <label>
                        {languageManager.translate(
                          "True condition custom label"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={booleanTrueText}
                        onChange={handleBooleanTrueText}
                      />
                      <small className="form-text text-muted">
                        {languageManager.translate(
                          "Try to enter maximum 255 char"
                        )}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>
                        {languageManager.translate(
                          "False condition custom label"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={booleanFalseText}
                        onChange={handleBooleanFalseText}
                      />
                      <small className="form-text text-muted">
                        {languageManager.translate(
                          "Try to enter maximum 255 char"
                        )}
                      </small>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <ModalFooter>
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default FieldConfig;
