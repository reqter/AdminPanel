import React, { useState } from "react";
import "./styles.scss";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { languageManager } from "./../../../services";
import Tree from "./tree";
let categories_data = [
  {
    id: "1",
    name: "Transportation",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category",
    children: [
      {
        id: "2",
        parentId: "1",
        name: "Vehicles",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "category",
        children: [
          {
            categoryId: "2",
            id: "111",
            name: "Trucks",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "contentType",
            fields: [
              {
                id: "34443",
                name: "brand",
                title: "Brand",
                type: "string",
                description: "Lorem ipsum dolor sit amet, consectetur"
              }
            ]
          }
        ]
      },
      {
        id: "6",
        parentId: "1",
        name: "Car",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "category"
      }
    ]
  },

  {
    id: "7",
    name: "Economic",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "8",
    name: "Political",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "9",
    name: "Accidents",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  },
  {
    id: "10",
    name: "Others",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category"
  }
];

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
          data={categories_data}
          hasContentType={props.hasContentType}
          onRowSelect={selected => handleRowSelect(selected)}
        />
      </ModalBody>
    </Modal>
  );
};
export default Categories;
