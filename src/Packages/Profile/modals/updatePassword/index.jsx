import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager } from "../../../../services";
const UpdatePassword = props => {
  const oldPass = useRef(null);

  useEffect(() => {
    oldPass.current.focus();
  });

  function closeModal() {
    props.onClose();
  }

  return (
    <Modal isOpen={props.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>New Password</ModalHeader>
      <ModalBody>
        <div className="c-category-modal-body">
          <form>
            <div className="form-group">
              <label>{languageManager.translate("Old Password")}</label>
              <input
                ref={oldPass}
                type="text"
                className="form-control"
                placeholder={languageManager.translate("old password")}
                required
                autoFocus
              />
              <small className="form-text text-muted">
                {languageManager.translate("enter your old password")}
              </small>
            </div>
            <div className="form-group">
              <label>{languageManager.translate("New Password")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={languageManager.translate("new password")}
                required
              />
              <small className="form-text text-muted">
                {languageManager.translate(
                  "password must be at least 6 charcter"
                )}
              </small>
            </div>
            <div className="form-group">
              <label>{languageManager.translate("Confirm Password")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={languageManager.translate("confirm your password")}
                required
              />
              <small className="form-text text-muted">
                {languageManager.translate(
                  "password must be at least 6 charcter"
                )}
              </small>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={closeModal} className="btn btn-secondary">
          {languageManager.translate("CANCEL")}
        </button>
        <button type="submit" className="btn btn-primary">
          Change
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdatePassword;
