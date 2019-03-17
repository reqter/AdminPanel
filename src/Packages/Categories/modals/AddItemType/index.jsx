import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { languageManager } from "../../../../services";
import "./styles.scss";

const AddNewField = props => {
  const category = props.selectedCategory;
  let items = props.itemTypes ? props.itemTypes : [];
  let data = props.data;
  const [allData, setData] = useState(makeData());
  const [isOpen, toggleModal] = useState(true);
  function makeData() {
    let d = data.slice();
    for (let j = 0; j < items.length; j++) {
      for (let i = 0; i < d.length; i++) {
        if (items[j].id === d[i].id) {
          d[i].selected = true;
          break;
        }
      }
    }
    return d;
  }
  useEffect(() => {
    return () => {
      data.map(d => delete d.selected);
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
          <label key={item.id} for={item.id} className="itemTypeModal">
            <div className="itemTypeModal-left">
              <div className="itemType-icon">
                <i className="icon-item-type" />
              </div>
              <div className="itemType-center">
                <span className="itemType-title">{item.title}</span>
                <span className="itemType-description">{item.description}</span>
              </div>
            </div>
            <div className="itemTypeModal-right">
              <label className="switch ">
                <input
                  type="checkbox"
                  className="primary"
                  onChange={e => handleChooseItem(e, item)}
                  checked={item.selected}
                  id={item.id}
                />
                <span className="slider" />
              </label>
              {/* <input
                id={item.id}
                type="checkbox"
                onChange={e => handleChooseItem(e, item)}
                checked={item.selected}
              /> */}
            </div>
          </label>
        ))}
      </ModalBody>
    </Modal>
  );
};

export default AddNewField;
