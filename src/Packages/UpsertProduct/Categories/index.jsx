import React, { useState } from "react";
import "./styles.scss";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Tree from "./tree";

const Categories = props => {
  function handleRowSelect(selected) {
    props.onCloseModal(selected);
  }

  function closeModal(params) {
    props.onCloseModal(undefined);
  }
  return (
    <Modal isOpen={true} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Choose a category</ModalHeader>
      <ModalBody className="up-categories">
        <Tree
          data={props.categoriesData}
          hasContentType={props.hasContentType}
          onRowSelect={selected => handleRowSelect(selected)}
        />
      </ModalBody>
    </Modal>
  );
};
export default Categories;
