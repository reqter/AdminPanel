import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import { updateSpace } from "../../../../Api/space-api";
import { CircleSpinner } from "../../../../components";

const UpsertLocale = props => {
  const [{ sysLocales, spaceInfo }, dispatch] = useGlobalState();
  const updateMode = props.selectedLocale !== undefined ? true : false;

  const selectedLocale =
    props.selectedLocale != undefined ? props.selectedLocale : undefined;
  const [locales, setLocales] = useState([]);

  const [localeName, setLocale] = useState();
  const [fallback, setFallback] = useState(
    selectedLocale ? selectedLocale.fallback : ""
  );
  const [includeReaponce, toggleInResponce] = useState(
    selectedLocale ? selectedLocale.includeInResponce : false
  );
  const [editable, toggleEditable] = useState(
    selectedLocale ? selectedLocale.editable : false
  );
  const [required, toggleRequired] = useState(
    selectedLocale ? selectedLocale.requiredFields : false
  );

  const [spinner, toggleSpinner] = useState(false);

  useEffect(() => {
    if (spaceInfo && spaceInfo.locales) {
      let d = [];
      for (let i = 0; i < sysLocales.length; i++) {
        const sysLocale = sysLocales[i];
        let finded = false;
        for (let j = 0; j < spaceInfo.locales.length; j++) {
          const spaceLocale = spaceInfo.locales[j];
          if (sysLocale.name === spaceLocale.locale) {
            finded = true;
            break;
          }
        }
        if (!finded) {
          d.push(sysLocale);
        }
      }
      setLocales(d);
    }
  }, []);

  function handleLocaleChanged(e) {
    setLocale(e.target.value);
  }
  function handleFallbackChanged(e) {
    setFallback(e.target.value);
  }
  function handleInReponceChanged(e) {
    toggleInResponce(e.target.checked);
  }
  function handleEditableChanged(e) {
    toggleEditable(e.target.checked);
  }
  function handleRequiredChanged(e) {
    toggleRequired(e.target.checked);
  }

  function showNotify(type, msg) {
    dispatch({
      type: "ADD_NOTIFY",
      value: {
        type: type,
        message: msg,
      },
    });
  }
  function closeModal() {
    props.onClose();
  }
  function onSubmit(e) {
    e.preventDefault();
    const s = { ...spaceInfo };
    if (updateMode) {
      for (let i = 0; i < s.locales.length; i++) {
        const locale = s.locales[i];
        if (locale.locale === selectedLocale.locale) {
          locale.fallback = fallback;
          locale.includeInResponce = includeReaponce;
          locale.editable = editable;
          locale.requiredFields = required;
          break;
        }
      }
    } else {
      if (s.locales === undefined) {
        s.locales = [];
      }
      s.locales.push({
        locale: localeName,
        fallback: fallback,
        includeInResponce: includeReaponce,
        editable: editable,
        requiredFields: required,
      });
    }
    dispatch({
      type: "SET_SPACEINFO",
      value: s,
    });
    closeModal();
    // if (!spinner) {
    //   toggleSpinner(true);
    //   updateSpace()
    //     .onOk(result => {

    //       closeModal();
    //       showNotify(
    //         "success",
    //         languageManager.translate("SETTINGS_ADD_LOCALE_ON_OK")
    //       );
    //     })
    //     .onServerError(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("SETTINGS_ADD_LOCALE_ON_SERVER_ERROR")
    //       );
    //     })
    //     .onBadRequest(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("SETTINGS_ADD_LOCALE_ON_BAD_REQUEST")
    //       );
    //     })
    //     .unAuthorized(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("SETTINGS_ADD_LOCALE_UN_AUTHORIZED")
    //       );
    //     })
    //     .notFound(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("SETTINGS_ADD_LOCALE_NOT_FOUND")
    //       );
    //     })
    //     .call();
    // }
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>
        {updateMode ? "Update Locale" : "New Locale"}
      </ModalHeader>
      <ModalBody>
        <div className="settings-modal-body">
          <form id="changePassForm" onSubmit={onSubmit}>
            {!updateMode && (
              <div className="form-group">
                <label>{languageManager.translate("Choose a locale")}</label>
                <select
                  className="form-control"
                  onChange={handleLocaleChanged}
                  value={localeName}
                >
                  <option value="" />
                  {locales.map(locale => (
                    <option key={locale.name} value={locale.name}>
                      {locale.title}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  {languageManager.translate("Choose a locale")}
                </small>
              </div>
            )}
            <div className="form-group">
              <label>{languageManager.translate("Fallback")}</label>
              <select
                className="form-control"
                onChange={handleFallbackChanged}
                value={fallback}
              >
                <option value="" />
                {locales.map(locale => (
                  <option key={locale.name} value={locale.name}>
                    {locale.title}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                {languageManager.translate(
                  "Selected locale will returned instead"
                )}
              </small>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    id="include"
                    checked={includeReaponce}
                    onChange={handleInReponceChanged}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="include">
                  {languageManager.translate("Include in responce")}
                </label>
                <label for="include">
                  {languageManager.translate(
                    "Including responce data for this locale"
                  )}
                </label>
              </div>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    id="editable"
                    checked={editable}
                    onChange={handleEditableChanged}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="editable">
                  {languageManager.translate("Editable")}
                </label>
                <label for="editable">
                  {languageManager.translate("This locale can be edited")}
                </label>
              </div>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    id="required"
                    checked={required}
                    onChange={handleRequiredChanged}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="required">
                  {languageManager.translate("Required Fields")}
                </label>
                <label for="required">
                  {languageManager.translate(
                    "This locale should be filled in entry data"
                  )}
                </label>
              </div>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={closeModal} className="btn btn-secondary">
          {languageManager.translate("CANCEL")}
        </button>
        <button
          type="submit"
          className="btn btn-primary ajax-button"
          form="changePassForm"
          disabled={
            (localeName === undefined || localeName.length === 0) && !updateMode
              ? true
              : false
          }
        >
          <CircleSpinner show={spinner} size="small" />
          <span>{updateMode ? "Update" : "Add"}</span>
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default UpsertLocale;
