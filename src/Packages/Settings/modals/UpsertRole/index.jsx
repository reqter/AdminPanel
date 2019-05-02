import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import { updateSpace } from "./../../../../Api/space-api";
import { CircleSpinner } from "../../../../components";


const currentLang = languageManager.getCurrentLanguage().name

const UpdateRole = props => {
  const [{ spaceInfo }, dispatch] = useGlobalState();

  const updateMode = props.selectedRole === undefined ? undefined : true;
  const selectedRole =
    props.selectedRole === undefined ? undefined : props.selectedRole;

  const [name, setName] = useState(selectedRole ? selectedRole.name : "");
  const [title, setTitle] = useState(
    selectedRole ? selectedRole.title[currentLang] : ""
  );
  const [allowEdit, toggleAllowEdit] = useState(
    selectedRole ? selectedRole.allowEdit : false
  );
  const [readOnly, toggleReadOnly] = useState(
    selectedRole ? selectedRole.readOnly : false
  );

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
  function onSubmit(e) {
    e.preventDefault();
    const s = { ...spaceInfo };
    if (updateMode) {
      for (let i = 0; i < s.roles.length; i++) {
        const role = s.roles[i];
        if (role.name === selectedRole.name) {
          role.name = name;
          role.title = {
            en: title,
          };
          role.allowEdit = allowEdit;
          role.readOnly = readOnly;
          break;
        }
      }
    } else {
      if (s.roles === undefined) {
        s.roles = [];
      }
      s.roles.push({
        name: name,
        title: {
          en: title,
        },
        allowEdit: allowEdit,
        readOnly: readOnly,
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
    //         languageManager.translate("PROFILE_CHANGE_PASS_ON_OK")
    //       );
    //     })
    //     .onServerError(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("PROFILE_CHANGE_PASS_ON_SERVER_ERROR")
    //       );
    //     })
    //     .onBadRequest(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("PROFILE_CHANGE_PASS_ON_BAD_REQUEST")
    //       );
    //     })
    //     .unAuthorized(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("PROFILE_CHANGE_PASS_UN_AUTHORIZED")
    //       );
    //     })
    //     .notFound(result => {
    //       toggleSpinner(false);
    //       showNotify(
    //         "error",
    //         languageManager.translate("PROFILE_CHANGE_PASS_NOT_FOUND")
    //       );
    //     })
    //     .call();
    // }
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{updateMode ? "Update Role" : "New Role"}</ModalHeader>
      <ModalBody>
        <div className="settings-modal-body">
          <form id="upserRoleForm" onSubmit={onSubmit}>
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
                  <input
                    type="checkbox"
                    id="readOnly"
                    checked={readOnly}
                    onChange={e => toggleReadOnly(e.target.checked)}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="readOnly">
                  {languageManager.translate("Allow Read")}
                </label>
                <label for="readOnly">
                  {languageManager.translate("Only read of contents")}
                </label>
              </div>
            </div>
            <div className="custom_checkbox">
              <div className="left">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    id="allowEdit"
                    checked={allowEdit}
                    onChange={e => toggleAllowEdit(e.target.checked)}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="right">
                <label for="allowEdit">
                  {languageManager.translate("Allow Edit")}
                </label>
                <label for="allowEdit">
                  {languageManager.translate("Editing all of api")}
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
          form="upserRoleForm"
          disabled={name.length > 0 && title.length > 0 ? false : true}
        >
          <CircleSpinner show={spinner} size="small" />
          <span> {updateMode ? "Update Role" : "Add Role"}</span>
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdateRole;
