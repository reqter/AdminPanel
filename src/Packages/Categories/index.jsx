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
  Input,
} from "reactstrap";
import "./styles.scss";
import Tree from "./tree";
import AddNewItemType from "./modals/AddItemType";
import { languageManager, useGlobalState, utility } from "../../services";
import {
  getCategories,
  deleteCategory,
  addCategory,
  updateCategory,
  removeContentTypeFromCategory,
} from "./../../Api/category-api";
import { AssetBrowser, Alert } from "./../../components";

function useInput(defaultValue = "") {
  const [input, setInput] = useState(defaultValue);
  function onChange(value) {
    setInput(value);
  }
  return [input, onChange];
}

const Categories = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ categories }, dispatch] = useGlobalState();

  useEffect(() => {
    getCategories()
      .onOk(result => {
        dispatch({
          type: "SET_CATEGORIES",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CATEGORY_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CATEGORY_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CATEGORY_UN_AUTHORIZED"),
          },
        });
      })
      .call();
  }, []);

  // variables and handlers
  const nameInput = useRef(null);
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
  const [image, setImage] = useState();
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [alertData, setAlertData] = useState();

  useEffect(() => {
    if (upsertCategoryModal) {
      nameInput.current.focus();
    }
  }, [upsertCategoryModal]);

  function translate(key) {
    return languageManager.translate(key);
  }
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
    setImage();
  }
  function closeRightContent() {
    toggleRightContent(false);
  }

  function newChildCategory(item) {
    setModal(prevModal => !prevModal);
    setManageCategory(true);
    setSelectedCategory(item);
    setUpdateMode(false);
    setModalHeader(
      languageManager.translate("CATEGORIES_MODAL_HEADER_TITLE_NEW")
    );
    setModalUpsertBtnText(
      languageManager.translate("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_NEW")
    );
  }
  function editCategory(item) {
    setModal(prevModal => !prevModal);
    setSelectedCategory(item);
    setImage(item.image);
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
          sys: {
            id: Math.random(),
            issuer: {
              fullName: "Saeed Padyab",
              image: "",
            },
            issueDate: "19/01/2019 20:18",
          },
          image: image,
          parentId: selectedCategory.sys.id,
          name: utility.applyeLangs(name),
          description: utility.applyeLangs(description),
          type: "category",
        };
        addCategory()
          .onOk(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate("CATEGORY_ADD_ON_OK"),
              },
            });
            handleNameChanged("");
            handleDesciptionChanged("");
            setImage();
            dispatch({
              type: "SET_CATEGORIES",
              value: result,
            });
          })
          .onServerError(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_ADD_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_ADD_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "CATEGORY_ADD_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate("CATEGORY_ADD_NOT_FOUND"),
              },
            });
          })
          .call(obj);
      } else {
        let newCategory = {};
        for (const key in selectedCategory) {
          newCategory[key] = selectedCategory[key];
        }
        newCategory["name"] = utility.applyeLangs(name);
        newCategory["description"] = utility.applyeLangs(description);
        newCategory["image"] = image;
        updateCategory()
          .onOk(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate("CATEGORY_UPDATE_ON_OK"),
              },
            });
            dispatch({
              type: "SET_CATEGORIES",
              value: result,
            });
            closeAddCategoryModal();
            setImage();
          })
          .onServerError(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_UPDATE_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_UPDATE_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "CATEGORY_UPDATE_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate("CATEGORY_UPDATE_NOT_FOUND"),
              },
            });
          })
          .call(newCategory);
      }
    } else {
      const obj = {
        sys: {
          id: Math.random(),
          issuer: {
            fullName: "Saeed Padyab",
            image: "",
          },
          issueDate: "19/01/2019 20:18",
        },
        image: image,
        name: utility.applyeLangs(name),
        description: utility.applyeLangs(description),
        type: "category",
      };
      addCategory()
        .onOk(result => {
          setImage();
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("CATEGORY_ADD_ON_OK"),
            },
          });
          dispatch({
            type: "SET_CATEGORIES",
            value: result,
          });
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_ADD_ON_SERVER_ERROR"
              ),
            },
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("CATEGORY_ADD_ON_BAD_REQUEST"),
            },
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate("CATEGORY_ADD_UN_AUTHORIZED"),
            },
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate("CATEGORY_ADD_NOT_FOUND"),
            },
          });
        })
        .call(obj);
      initModalForm();
    }
  }

  function removeCategoryItem(selected) {
    setAlertData({
      type: "error",
      title: translate("CATEGORY_REMOVE_ALERT_TITLE"),
      message: translate("CATEGORY_REMOVE_ALERT_MESSAGE"),
      isAjaxCall: true,
      onOk: () =>
        deleteCategory()
          .onOk(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate("CATEGORY_REMOVE_ON_OK"),
              },
            });
            dispatch({
              type: "SET_CATEGORIES",
              value: result,
            });
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate("CATEGORY_REMOVE_NOT_FOUND"),
              },
            });
          })
          .call(selected),
      onCancel: () => {
        setAlertData();
      },
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
  function closeAddItemTypeModal() {
    toggleUpsertItemTypeModal(false);
  }
  function addNewItemType() {
    toggleUpsertItemTypeModal(prevModal => !prevModal);
  }
  function removeContentType(item) {
    setAlertData({
      type: "error",
      title: translate("CATEGORY_REMOVE_CONTENT_TYPE_ALERT_TITLE"),
      message: translate("CATEGORY_REMOVE_CONTENT_TYPE_ALERT_MESSAGE"),
      isAjaxCall: true,
      onOk: () =>
        removeContentTypeFromCategory()
          .onOk(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_CONTENT_TYPE_ON_OK"
                ),
              },
            });
            handleRemoveContenType(result, item);
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_CONTENT_TYPE_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_CONTENT_TYPE_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_CONTENT_TYPE_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CATEGORY_REMOVE_CONTENT_TYPE_NOT_FOUND"
                ),
              },
            });
          })
          .call(selectedCategory.sys.id, item.sys.id),
      onCancel: () => {
        setAlertData();
      },
    });
  }
  function handleRemoveContenType(result, itemType) {
    const m = itemTypes.filter(item => item.sys.id !== itemType.sys.id);
    setItemTypes(m);
    dispatch({
      type: "SET_CATEGORIES",
      value: result,
    });
  }
  function handleAddContenType(result, itemType) {
    let m = [...itemTypes];
    m.push(itemType);
    setItemTypes(m);
    dispatch({
      type: "SET_CATEGORIES",
      value: result,
    });
  }
  function removeImage() {
    setImage();
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      setImage(asset.url);
    }
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
                      <div className="fieldItem" key={item.sys.id}>
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
                          onClick={() => removeContentType(item)}
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
                  ref={nameInput}
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
            <div className="up-uploader">
              <span className="title">
                {languageManager.translate("CONTENT_TYPE_MODAL_IMAGES_TITLE")}
              </span>
              <span className="description">
                {languageManager.translate("CONTENT_TYPE_MODAL_IMAGES_DESC")}
              </span>

              <div className="files">
                {image && (
                  <div className="files-uploaded">
                    <div className="files-uploaded-icon" onClick={removeImage}>
                      <i className="icon-bin" />
                    </div>
                    <img src={image[currentLang]} alt="" />
                  </div>
                )}
                <div className="files-input" onClick={openAssetBrowser}>
                  <i className="icon-camera" />
                </div>
              </div>
            </div>
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
          selectedCategory={selectedCategory}
          itemTypes={itemTypes}
          isOpen={upsertItemTypeModal}
          onCloseModal={closeAddItemTypeModal}
          onAddContentType={handleAddContenType}
          onRemoveContentType={handleRemoveContenType}
        />
      )}
      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={"image"}
        />
      )}
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Categories;
