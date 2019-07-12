import React, { useState, useRef, useEffect } from "react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalFooter from "reactstrap/lib/ModalFooter";
//
import { useGlobalState,useLocale } from "./../../../../hooks";
import { changePassword } from "./../../../../Api/account-api";
import { CircleSpinner } from "../../../../components";
const UpdatePassword = props => {
  const [{}, dispatch] = useGlobalState();
  const { appLocale, t, currentLang } = useLocale();

  const oldPassRef = useRef(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [spinner, toggleSpinner] = useState(false);
  useEffect(() => {
    oldPassRef.current.focus();
  }, []);
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
    if (!spinner) {
      toggleSpinner(true);
      changePassword()
        .onOk(result => {
          closeModal();
          showNotify(
            "success",
            t("PROFILE_CHANGE_PASS_ON_OK")
          );
        })
        .onServerError(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            t("PROFILE_CHANGE_PASS_ON_SERVER_ERROR")
          );
        })
        .onBadRequest(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            t("PROFILE_CHANGE_PASS_ON_BAD_REQUEST")
          );
        })
        .unAuthorized(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            t("PROFILE_CHANGE_PASS_UN_AUTHORIZED")
          );
        })
        .notFound(result => {
          toggleSpinner(false);
          showNotify(
            "error",
            t("PROFILE_CHANGE_PASS_NOT_FOUND")
          );
        })
        .call(oldPass, newPass);
    }
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>New Password</ModalHeader>
      <ModalBody>
        <div className="c-category-modal-body">
          <form id="changePassForm" onSubmit={onSubmit}>
            <div className="form-group">
              <label>{t("Old Password")}</label>
              <input
                ref={oldPassRef}
                type="password"
                className="form-control"
                placeholder={t("old password")}
                required
                value={oldPass}
                onChange={e => {
                  setOldPass(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                {t("enter your old password")}
              </small>
            </div>
            <div className="form-group">
              <label>{t("New Password")}</label>
              <input
                type="password"
                className="form-control"
                placeholder={t("new password")}
                required
                value={newPass}
                onChange={e => {
                  setNewPass(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                {t(
                  "password must be at least 6 charcter"
                )}
              </small>
            </div>
            <div className="form-group">
              <label>{t("Confirm Password")}</label>
              <input
                type="password"
                className="form-control"
                placeholder={t("confirm your password")}
                required
                value={confirmPass}
                onChange={e => {
                  setConfirmPass(e.target.value);
                }}
              />
              <small className="form-text text-muted">
                {t(
                  "password must be at least 6 charcter"
                )}
              </small>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={closeModal} className="btn btn-secondary">
          {t("CANCEL")}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          form="changePassForm"
          disabled={
            oldPass === undefined ||
            oldPass.length === 0 ||
            newPass === undefined ||
            newPass.length === 0 ||
            confirmPass === undefined ||
            confirmPass.length === 0 ||
            confirmPass !== newPass
              ? true
              : false
          }
        >
          <CircleSpinner show={spinner} size="small" />
          {!spinner && <span>Change</span>}
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdatePassword;
