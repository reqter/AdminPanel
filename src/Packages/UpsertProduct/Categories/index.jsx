import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Tree from "./tree";
import { useGlobalState, languageManager } from "../../../services";
import { getCategories } from "./../../../Api/content-api";

const Categories = props => {
  const [{ categories }, dispatch] = useGlobalState();

  useEffect(() => {
    getCategories()
      .onOk(result => {
        dispatch({
          type: "SET_CATEGORIES",
          value: result
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CATEGORY_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CATEGORY_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CATEGORY_UN_AUTHORIZED")
          }
        });
      })
      .call();
  });
  function handleRowSelect(selected) {
    props.onCloseModal(selected);
  }

  function closeModal(params) {
    props.onCloseModal(undefined);
  }
  return (
    <Modal isOpen={true} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>Choose a category</ModalHeader>
      <ModalBody className="up-categories">
        {categories.length > 0 && (
          <Tree
            data={categories}
            onRowSelect={selected => handleRowSelect(selected)}
          />
        )}
      </ModalBody>
    </Modal>
  );
};
export default Categories;
