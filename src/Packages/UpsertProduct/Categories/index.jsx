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
    name: "Sport",
    description: "Lorem ipsum dolor sit amet, consectetur",
    type: "category",
    children: [
      {
        id: "2",
        parentId: "1",
        name: "Football",
        description: "Lorem ipsum dolor sit amet, consectetur",
        type: "category",
        children: [
          {
            id: "3",
            parentId: "2",
            name: "Football",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category",
            children: [
              {
                id: "111",
                name: "Car",
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
              },

              {
                id: "711",
                name: "Home",
                description: "Lorem ipsum dolor sit amet, consectetur",
                type: "contentType"
              }
            ]
          },
          {
            id: "4",
            parentId: "2",
            name: "Beach",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category"
          },
          {
            id: "5",
            parentId: "2",
            name: "Footsall",
            description: "Lorem ipsum dolor sit amet, consectetur",
            type: "category"
          }
        ]
      },
      {
        id: "6",
        parentId: "1",
        name: "Wresling",
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
  // variables
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  function handleNameChanged(e) {}
  function handleTitleChanged(e) {}
  function handleDescriptionChanged(e) {}
  function handleSelectCategory(selected) {}

  function closeModal(params) {
    props.onCloseModal();
  }
  return (
    <Modal isOpen={true} toggle={closeModal}>
      <ModalHeader toggle={closeModal} >
        Choose a category
      </ModalHeader>
      <ModalBody className="up-categories">
        
        <Tree data={categories_data} onSelectCategory={selected => handleSelectCategory(selected)}/>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};
export default Categories;
