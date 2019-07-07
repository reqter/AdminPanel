import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import CircleSpinner from "./../CircleSpinner";
import "./styles.scss";
import { useLocale } from "./../../hooks";

const PopupAlert = props => {
  const { appLocale, t, currentLang } = useLocale();
  const okBtn = useRef(null);
  const { data } = props;
  const [spinner, toggleSpinner] = useState(false);

  useEffect(() => {
    if (okBtn.current) {
      okBtn.current.focus();
    }
  });

  function closeModal() {
    data.onCancel();
    if (spinner) toggleSpinner(false);
  }
  function okClicked() {
    if (!spinner) {
      if (data.isAjaxCall) toggleSpinner(true);
      setTimeout(() => {
        data.onOk();
      }, 500);
    }
  }
  return data === undefined ? null : (
    <Modal isOpen={true} toggle={closeModal}>
      <ModalBody>
        <div className="popup">
          <span className="icon-cross closeIcon" onClick={closeModal} />
          <div className="popup-icon">
            <i
              className={
                "icon-" +
                (data.type === "warning"
                  ? "warning warning"
                  : data.type === "error"
                  ? "shield error"
                  : "info info")
              }
            />
          </div>
          <div className="popup-messsages">
            <span className="popup-title">{data.title}</span>
            <span className="popup-messsage">{data.message}</span>
          </div>
          <div className="popup-ations">
            <button className="btn btn-light" onClick={closeModal}>
              {data.cancelTitle || t("DONT_REMOVE")}
            </button>
            <button
              className={
                "btn btn-" +
                (data.type === "warning"
                  ? "primary"
                  : data.type === "error"
                  ? "primary"
                  : "primary")
              }
              onClick={okClicked}
              ref={okBtn}
            >
              {spinner && <CircleSpinner show={spinner} size="small" />}
              {!spinner && (data.okTitle || t("REMOVE"))}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default PopupAlert;
