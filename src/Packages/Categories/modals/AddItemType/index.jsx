import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { languageManager } from "../../../../services";
import "./styles.scss";

let data = [
  {
    id: "1",
    name: "Car",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },

  {
    id: "7",
    name: "Home",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "8",
    name: "Football",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "9",
    name: "Appliance",
    description: "Lorem ipsum dolor sit amet, consectetur"
  },
  {
    id: "10",
    name: "Flower",
    description: "Lorem ipsum dolor sit amet, consectetur"
  }
];

const AddNewField = props => {
  const category = props.selectedCategory;
  const [allData, setData] = useState(data);
  let items = props.itemTypes;
  const [isOpen, toggleModal] = useState(true);
  useEffect(() => {
    let d = [];
    for (let j = 0; j < items.length; j++) {
      for (let i = 0; i < allData.length; i++) {
        if (items[j].id === allData[i].id) {
          allData[i].selected = true;
          break;
        }
      }
    }
    d = [...allData];
    setData(d);
    return () => {
      d = undefined;
      if (!props.isOpen) toggleModal(false);
    };
  });
  function closeModal(params) {
    props.onCloseModal(items);
  }
  function handleChooseItem(event, item) {
    if (event.target.checked) {
      items.push(item);
    } else {
      const arr = items.filter(i => i.id !== item.id);
      items = arr;
    }
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>
        {languageManager.translate("CATEGORY_ITEM_TYPE_MODAL_HEADER_TITLE")}
      </ModalHeader>
      <ModalBody>
        {allData.map(item => (
          <div key={item.id}>
            {item.name}
            <input
              type="checkbox"
              onChange={e => handleChooseItem(e, item)}
              checked={item.selected}
            />
          </div>
        ))}
      </ModalBody>
    </Modal>
  );
};

export default AddNewField;
