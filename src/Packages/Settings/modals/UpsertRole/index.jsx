import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import { changePassword } from "./../../../../Api/account-api";
import { CircleSpinner } from "../../../../components";
const UpdateRole = props => {
  const [{}, dispatch] = useGlobalState();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [allowEdit, toggleAllowEdit] = useState(false);
  const [readOnly, toggleReadOnly] = useState(true);

  const [spinner, toggleSpinner] = useState(false);
  useEffect(() => {}, []);

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
  function onSubmit() {
    if (!spinner) {
      toggleSpinner(true);
      changePassword()
        .onOk(result => {
          closeModal();
          showNotify(
            "success",
            languageManager.translate("PROFILE_CHANGE_PASS_ON_OK")
          );
        })
        .onServerError(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            languageManager.translate("PROFILE_CHANGE_PASS_ON_SERVER_ERROR")
          );
        })
        .onBadRequest(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            languageManager.translate("PROFILE_CHANGE_PASS_ON_BAD_REQUEST")
          );
        })
        .unAuthorized(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            languageManager.translate("PROFILE_CHANGE_PASS_UN_AUTHORIZED")
          );
        })
        .notFound(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            languageManager.translate("PROFILE_CHANGE_PASS_NOT_FOUND")
          );
        })
        .call();
    }
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>New Role</ModalHeader>
      <ModalBody>
        <div className="settings-modal-body">
          <form id="changePassForm" onSubmit={onSubmit}>
            <div className="form-group">
              <label>{languageManager.translate("Name")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={languageManager.translate("enter a name ")}
                required
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                {languageManager.translate("Name of role should be unique")}
              </small>
            </div>
            <div className="form-group">
              <label>{languageManager.translate("Title")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={languageManager.translate("enter a title")}
                required
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                {languageManager.translate("Diplay name of a role ")}
              </small>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input type="checkbox" id="localization" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="localization">
                  {languageManager.translate("Allow Edit")}
                </label>
                <label>{languageManager.translate("Editing all of api")}</label>
              </div>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input type="checkbox" id="localization" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="localization">
                  {languageManager.translate("Allow Read")}
                </label>
                <label>
                  {languageManager.translate("Only read of contents")}
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
        >
          <CircleSpinner show={spinner} size="small" />
          <span>Add Role</span>
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdateRole;
