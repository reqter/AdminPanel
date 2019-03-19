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
import "./styles.scss";
import Tree from "./tree";
import AddNewItemType from "./modals/AddItemType";
import { languageManager, useGlobalState, utility } from "../../services";

function useInput(defaultValue = "") {
  const [input, setInput] = useState(defaultValue);
  function onChange(value) {
    setInput(value);
  }
  return [input, onChange];
}

const Categories = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories, contentTypes }, dispatch] = useGlobalState();

  const { name: pageTitle, desc: pageDescription } = props.component;

  // variables and handlers
  const newCategoryNameInput = useRef(null);
  const [upsertCategoryModal, setModal] = useState(false);
  const [upsertItemTypeModal, toggleUpsertItemTypeModal] = useState(false);

  const [name, handleNameChanged] = useInput("");
  const [description, handleDesciptionChanged] = useInput("");

  const [selectedCategory, setSelectedCategory] = useState();
  const [itemTypes, setItemTypes] = useState([]);
  const [updateMode, setUpdateMode] = useState();
  const [modalHeaderTitle, setModalHeader] = useState("");
  const [modalUpsertBtn, setModalUpsertBtnText] = useState("");
  const [rightContent, toggleRightContent] = useState(false);
  const [isManageCategory, setManageCategory] = useState(false);

  function initModalForm() {
    handleNameChanged("");
    handleDesciptionChanged("");
  }
  function toggleModal() {
    setModalHeader(
      languageManager.translate("CATEGORIES_MODAL_HEADER_TITLE_NEW")
    );
    setModalUpsertBtnText(
      languageManager.translate("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_NEW")
    );
    setModal(prevModal => !prevModal);
    initModalForm();
  }

  function closeAddCategoryModal() {
    toggleModal();
    setManageCategory(false);
  }
  function closeRightContent() {
    toggleRightContent(false);
  }
  function updateNodeInList(list, node, newValue) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === node.id) {
        list[i] = newValue;
      }
      if (list[i].children) updateNodeInList(list[i].children, node, newValue);
    }
  }
  function deleteNodeInList(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === node.id) {
        list.splice(i, 1);
        return;
      }
      if (list[i].children) deleteNodeInList(list[i].children, node);
    }
  }
  function newChildCategory(item) {
    setModal(prevModal => !prevModal);
    setSelectedCategory(item);
    setUpdateMode(false);
    setModalHeader(
      languageManager.translate("CATEGORIES_MODAL_HEADER_TITLE_NEW")
    );
    setModalUpsertBtnText(
      languageManager.translate("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_NEW")
    );
    setTimeout(() => {
      newCategoryNameInput.current.focus();
    }, 1);
    setManageCategory(true);
  }
  function editCategory(item) {
    setModal(prevModal => !prevModal);
    setSelectedCategory(item);
    setUpdateMode(true);

    handleNameChanged(item.name[currentLang]);
    handleDesciptionChanged(item.description[currentLang]);

    setModalHeader(
      languageManager.translate("CATEGORIES_MODAL_HEADER_TITLE_EDIT")
    );
    setModalUpsertBtnText(
      languageManager.translate("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_EDIT")
    );
    setManageCategory(true);
  }
  function upsertCategory() {
    if (isManageCategory) {
      if (!updateMode) {
        const obj = {
          parentId: selectedCategory.id,
          id: Math.random().toString(),
          name: utility.applyeLangs(name),
          description: utility.applyeLangs(description),
          type: "category"
        };

        if (!selectedCategory.children) selectedCategory.children = [];
        selectedCategory.children.push(obj);
        const d = [...categories];
        dispatch({
          type: "SET_CATEGORIES",
          value: d
        });

        handleNameChanged("");
        handleDesciptionChanged("");
      } else {
        let newCategory = {};
        for (const key in selectedCategory) {
          newCategory[key] = selectedCategory[key];
        }
        newCategory["name"] = utility.applyeLangs(name);
        newCategory["description"] = utility.applyeLangs(description);
        updateNodeInList(categories, selectedCategory, newCategory);
        dispatch({
          type: "SET_CATEGORIES",
          value: categories
        });
        closeAddCategoryModal();
      }
    } else {
      const obj = {
        id: Math.random(),
        name: utility.applyeLangs(name),
        description: utility.applyeLangs(description),
        type: "category"
      };
      let data = [...categories];
      data.push(obj);
      dispatch({
        type: "SET_CATEGORIES",
        value: data
      });
      initModalForm();
    }
  }

  function removeCategoryItem(selected) {
    deleteNodeInList(categories, selected);
    const data = [...categories];
    dispatch({
      type: "SET_CATEGORIES",
      value: data
    });
  }

  // field
  function showItemTypes(category) {
    if (!rightContent) toggleRightContent(true);
    setSelectedCategory(category);
    let m = [];
    if (category.itemTypes !== undefined) m = category.itemTypes;
    setItemTypes(m);
    setManageCategory(false);
  }
  function closeAddItemTypeModal(items) {
    toggleUpsertItemTypeModal(false);
    updateCategoryItemTypes(items);
  }
  function addNewItemType() {
    toggleUpsertItemTypeModal(prevModal => !prevModal);
  }
  function updateCategoryItemTypes(items) {
    setItemTypes(items);
    if (selectedCategory.itemTypes === undefined)
      selectedCategory.itemTypes = [];
    selectedCategory.itemTypes = items;
    updateNodeInList(categories, selectedCategory, selectedCategory); //
    dispatch({
      type: "SET_CATEGORIES",
      value: categories
    });
  }
  function handleRemoveItemType(itemType) {
    const m = itemTypes.filter(item => item.id !== itemType.id);
    setItemTypes(m);
    selectedCategory.itemTypes = m;
    updateNodeInList(categories, selectedCategory, selectedCategory); //
    dispatch({
      type: "SET_CATEGORIES",
      value: categories
    });
  }
  return (
    <>
      <div className="c-wrapper">
        <div className="c-header">
          <div className="c-header-left">
            <span className="c-header-title">{pageTitle}</span>
            <span className="c-header-description">{pageDescription}</span>
          </div>
          <div className="c-header-right">
            <button className="btn btn-primary" onClick={toggleModal}>
              {languageManager.translate("CATEGORIES_NEW_CATEGORY_BTN")}
            </button>
          </div>
        </div>
        <div className="c-content">
          <div className="c-content-left">
            <Tree
              rightContent={rightContent}
              data={categories}
              handleNewCategory={selected => newChildCategory(selected)}
              handleEditCategory={selected => editCategory(selected)}
              handleDeleteCategory={selected => removeCategoryItem(selected)}
              handleItemTypes={selected => showItemTypes(selected)}
            />
          </div>
          {rightContent && (
            <div className="c-content-right animated slideInRight faster">
              <div className="c-content-right-header">
                <span className="c-right-header-title">
                  {languageManager.translate(
                    "CATEGORIES_ITEM_TYPES_HEADER_TITLE"
                  )}
                </span>
                <span className="c-right-header-description">
                  {languageManager.translate(
                    "CATEGORIES_ITEM_TYPES_HEADER_DESC"
                  )}
                </span>
                <span
                  className="icon-cross closeIcon"
                  onClick={closeRightContent}
                />
              </div>
              <div className="c-content-right-body">
                <div className="fieldsContent">
                  {itemTypes &&
                    itemTypes.map(item => (
                      <div className="fieldItem" key={item.id}>
                        <div className="fieldItem-icon">
                          <i className="icon-more-h" />
                        </div>
                        <div className="fieldItem-type">
                          <i className="icon-item-type" />
                        </div>
                        <div className="fieldItem-name">
                          {item.title[currentLang]}
                        </div>
                        <div className="fieldItem-title">
                          {item.description[currentLang]}
                        </div>
                        <div
                          className="fieldItem-actions"
                          onClick={() => handleRemoveItemType(item)}
                        >
                          <button className="btn btn-link" size="xs">
                            <i className="icon-bin" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="btnNewFieldContent">
                  <button className="btn btn-primary" onClick={addNewItemType}>
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={upsertCategoryModal} toggle={closeAddCategoryModal}>
        <ModalHeader toggle={closeAddCategoryModal}>
          {modalHeaderTitle}
        </ModalHeader>
        <ModalBody>
          <div className="c-category-modal-body">
            <Form>
              <div className="form-group">
                <label>
                  {languageManager.translate("CATEGORIES_MODAL_NAME")}
                </label>
                <input
                  ref={newCategoryNameInput}
                  type="text"
                  className="form-control"
                  placeholder={languageManager.translate(
                    "CATEGORIES_MODAL_NAME_PLACEHOLDER"
                  )}
                  value={name}
                  required
                  onChange={e => handleNameChanged(e.target.value)}
                />
                <small className="form-text text-muted">
                  {languageManager.translate(
                    "CATEGORIES_MODAL_NAME_DESCRIPTION"
                  )}
                </small>
              </div>
              <FormGroup>
                <Label for="exampleEmail">
                  {languageManager.translate("CATEGORIES_MODAL_DESCRIPTION")}
                </Label>
                <Input
                  type="string"
                  placeholder={languageManager.translate(
                    "CATEGORIES_MODAL_DESCRIPTION_PLACEHOLDER"
                  )}
                  value={description}
                  onChange={e => handleDesciptionChanged(e.target.value)}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                  {languageManager.translate(
                    "CATEGORIES_MODAL_DESCRIPTION_DESC"
                  )}
                </small> */}
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={() => upsertCategory(selectedCategory)}
            disabled={name.length > 0 ? false : true}
          >
            {modalUpsertBtn}
          </Button>
          <Button color="secondary" onClick={closeAddCategoryModal}>
            {languageManager.translate("CANCEL")}
          </Button>
        </ModalFooter>
      </Modal>
      {upsertItemTypeModal && (
        <AddNewItemType
          data={contentTypes}
          itemTypes={itemTypes}
          selectedCategory={selectedCategory}
          isOpen={upsertItemTypeModal}
          onCloseModal={items => closeAddItemTypeModal(items)}
        />
      )}
    </>
  );
};

export default Categories;
