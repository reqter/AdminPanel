import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalFooter from "reactstrap/lib/ModalFooter";
import "./styles.scss";
import Tree from "./tree";
import AddNewItemType from "./modals/AddItemType";
import { utility } from "../../services";
import { useGlobalState, useLocale } from "./../../hooks";
import {
  getCategories,
  deleteCategory,
  addCategory,
  updateCategory,
  removeContentTypeFromCategory,
} from "./../../Api/category-api";
import {
  AssetBrowser,
  Alert,
  RowSkeleton,
  CircleSpinner,
  Image,
} from "./../../components";

function useInput(defaultValue = "") {
  const [input, setInput] = useState(defaultValue);
  function onChange(value) {
    setInput(value);
  }
  return [input, onChange];
}

const Categories = props => {
  const { appLocale, t, currentLang } = useLocale();
  let didCancel = false;
  const { name: pageTitle, desc: pageDescription } = props.component;
  const [{ categories, spaceInfo }, dispatch] = useGlobalState();
  const [spinner, toggleSpinner] = useState(true);
  const [upsertSpinner, toggleUpsertSpinner] = useState(false);

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
    loadCategories();
    return () => {
      didCancel = true;
    };
  }, []);
  useEffect(() => {
    if (upsertCategoryModal) {
      nameInput.current.focus();
    }
  }, [upsertCategoryModal]);

  function loadCategories() {
    getCategories()
      .onOk(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "SET_CATEGORIES",
            value: result,
          });
        }
      })
      .onServerError(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("CATEGORY_ON_SERVER_ERROR"),
            },
          });
        }
      })
      .onBadRequest(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("CATEGORY_ON_BAD_REQUEST"),
            },
          });
        }
      })
      .unAuthorized(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("CATEGORY_UN_AUTHORIZED"),
            },
          });
        }
      })
      .call(spaceInfo.id);
  }
  function translate(key) {
    return t(key);
  }
  function initModalForm() {
    handleNameChanged("");
    handleDesciptionChanged("");
  }
  function toggleModal() {
    setModalHeader(t("CATEGORIES_MODAL_HEADER_TITLE_NEW"));
    setModalUpsertBtnText(t("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_NEW"));
    setModal(prevModal => !prevModal);
    initModalForm();
  }

  function closeAddCategoryModal() {
    toggleModal();
    setManageCategory(false);
    setImage();
    loadCategories();
  }
  function closeRightContent() {
    toggleRightContent(false);
  }

  function newChildCategory(item) {
    setModal(prevModal => !prevModal);
    setManageCategory(true);
    setSelectedCategory(item);
    setUpdateMode(false);
    setModalHeader(t("CATEGORIES_MODAL_HEADER_TITLE_NEW"));
    setModalUpsertBtnText(t("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_NEW"));
  }
  function editCategory(item) {
    setModal(prevModal => !prevModal);
    setSelectedCategory(item);
    setImage(item.image);
    setUpdateMode(true);

    handleNameChanged(item.name[currentLang]);
    handleDesciptionChanged(item.shortDesc ? item.shortDesc[currentLang] : "");

    setModalHeader(t("CATEGORIES_MODAL_HEADER_TITLE_EDIT"));
    setModalUpsertBtnText(t("CATEGORIES_MODAL_FOOTER_UPSERT_BTN_EDIT"));
    setManageCategory(true);
  }
  function addNodeInList(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === node.parentId) {
        if (list[i].items === undefined) {
          list[i].items = [];
        }
        list[i].items.push(node);
      }
      if (list[i].items) addNodeInList(list[i].items, node);
    }
  }

  function deleteNodeInList(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === node._id) {
        list.splice(i, 1);
        return;
      }
      if (list[i].items) deleteNodeInList(list[i].items, node);
    }
  }
  function updateNodeInList(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === node._id) {
        list[i] = node;
      }
      if (list[i].items) updateNodeInList(list[i].items, node);
    }
  }

  function upsertCategory() {
    if (!upsertSpinner) {
      toggleUpsertSpinner(true);

      if (isManageCategory) {
        if (!updateMode) {
          const obj = {
            image: image,
            parentId: selectedCategory._id,
            name: utility.applyeLangs(name),
            shortDesc: utility.applyeLangs(description),
          };
          addCategory()
            .onOk(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "success",
                  message: t("CATEGORY_ADD_ON_OK"),
                },
              });
              handleNameChanged("");
              handleDesciptionChanged("");
              setImage(undefined);
            })
            .onServerError(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_ADD_ON_SERVER_ERROR"),
                },
              });
            })
            .onBadRequest(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_ADD_ON_BAD_REQUEST"),
                },
              });
            })
            .unAuthorized(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "warning",
                  message: t("CATEGORY_ADD_UN_AUTHORIZED"),
                },
              });
            })
            .notFound(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_ADD_NOT_FOUND"),
                },
              });
            })
            .call(spaceInfo.id, obj);
        } else {
          let newCategory = {};
          for (const key in selectedCategory) {
            newCategory[key] = selectedCategory[key];
          }
          newCategory["name"] = utility.applyeLangs(name);
          newCategory["shortDesc"] = utility.applyeLangs(description);
          newCategory["image"] = image;
          updateCategory()
            .onOk(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "success",
                  message: t("CATEGORY_UPDATE_ON_OK"),
                },
              });
              closeAddCategoryModal();
              setImage(undefined);
            })
            .onServerError(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_UPDATE_ON_SERVER_ERROR"),
                },
              });
            })
            .onBadRequest(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_UPDATE_ON_BAD_REQUEST"),
                },
              });
            })
            .unAuthorized(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "warning",
                  message: t("CATEGORY_UPDATE_UN_AUTHORIZED"),
                },
              });
            })
            .notFound(result => {
              toggleUpsertSpinner(false);
              dispatch({
                type: "ADD_NOTIFY",
                value: {
                  type: "error",
                  message: t("CATEGORY_UPDATE_NOT_FOUND"),
                },
              });
            })
            .call(spaceInfo.id, newCategory);
        }
      } else {
        const obj = {
          name: utility.applyeLangs(name),
          shortDesc: utility.applyeLangs(description),
          image: image,
        };
        addCategory()
          .onOk(result => {
            toggleUpsertSpinner(false);
            setImage(undefined);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("CATEGORY_ADD_ON_OK"),
              },
            });
          })
          .onServerError(result => {
            toggleUpsertSpinner(false);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_ADD_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            toggleUpsertSpinner(false);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_ADD_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            toggleUpsertSpinner(false);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: t("CATEGORY_ADD_UN_AUTHORIZED"),
              },
            });
          })
          .notFound(result => {
            toggleUpsertSpinner(false);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_ADD_NOT_FOUND"),
              },
            });
          })
          .call(spaceInfo.id, obj);
        initModalForm();
      }
    }
  }

  function removeCategoryItem(selected) {
    setAlertData({
      type: "error",
      title: translate("CATEGORY_REMOVE_ALERT_TITLE"),
      message: translate("CATEGORY_REMOVE_ALERT_MESSAGE"),
      isAjaxCall: true,
      onOk: () => {
        deleteCategory()
          .onOk(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("CATEGORY_REMOVE_ON_OK"),
              },
            });
            loadCategories();
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_REMOVE_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_REMOVE_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: t("CATEGORY_REMOVE_UN_AUTHORIZED"),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_REMOVE_NOT_FOUND"),
              },
            });
          })
          .call(spaceInfo.id, selected._id);
      },
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
                message: t("CATEGORY_REMOVE_CONTENT_TYPE_ON_OK"),
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
                message: t("CATEGORY_REMOVE_CONTENT_TYPE_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_REMOVE_CONTENT_TYPE_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: t("CATEGORY_REMOVE_CONTENT_TYPE_UN_AUTHORIZED"),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CATEGORY_REMOVE_CONTENT_TYPE_NOT_FOUND"),
              },
            });
          })
          .call(selectedCategory._id, item._id),
      onCancel: () => {
        setAlertData();
      },
    });
  }
  function handleRemoveContenType(result, itemType) {
    const m = itemTypes.filter(item => item._id !== itemType._id);
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
            <span className="c-header-title">{t(pageTitle)}</span>
            <span className="c-header-description">{t(pageDescription)}</span>
          </div>
          <div className="c-header-right">
            <button className="btn btn-primary" onClick={toggleModal}>
              {t("CATEGORIES_NEW_CATEGORY_BTN")}
            </button>
          </div>
        </div>
        <div className="c-content">
          <div className="c-content-left">
            {spinner ? (
              <RowSkeleton />
            ) : !categories || categories.length === 0 ? (
              <div className="emptyContenType animated fadeIn">
                <i className="icon-empty-box-open icon" />
                <span className="title">Empty List!</span>
                <span className="info">
                  You have not created any category yet.
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={toggleModal}
                >
                  New Category
                </button>
              </div>
            ) : (
              <Tree
                rightContent={rightContent}
                data={categories}
                handleNewCategory={selected => newChildCategory(selected)}
                handleEditCategory={selected => editCategory(selected)}
                handleDeleteCategory={selected => removeCategoryItem(selected)}
                handleItemTypes={selected => showItemTypes(selected)}
              />
            )}
          </div>
          {rightContent && (
            <div className="c-content-right animated slideInRight faster">
              <div className="c-content-right-header">
                <span className="c-right-header-title">
                  {t("CATEGORIES_ITEM_TYPES_HEADER_TITLE")}
                </span>
                <span className="c-right-header-description">
                  {t("CATEGORIES_ITEM_TYPES_HEADER_DESC")}
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
                      <div className="fieldItem" key={item._id}>
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
            <form>
              <div className="form-group">
                <label>{t("CATEGORIES_MODAL_NAME")}</label>
                <input
                  ref={nameInput}
                  type="text"
                  className="form-control"
                  placeholder={t("CATEGORIES_MODAL_NAME_PLACEHOLDER")}
                  value={name}
                  required
                  onChange={e => handleNameChanged(e.target.value)}
                />
                <small className="form-text text-muted">
                  {t("CATEGORIES_MODAL_NAME_DESCRIPTION")}
                </small>
              </div>
              <div className="form-group">
                <label>{t("CATEGORIES_MODAL_DESCRIPTION")}</label>
                <input
                  type="string"
                  placeholder={t("CATEGORIES_MODAL_DESCRIPTION_PLACEHOLDER")}
                  className="form-control"
                  value={description}
                  onChange={e => handleDesciptionChanged(e.target.value)}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                  {t(
                    "CATEGORIES_MODAL_DESCRIPTION_DESC"
                  )}
                </small> */}
              </div>
            </form>
            <div className="up-uploader">
              <span className="title">
                {t("CONTENT_TYPE_MODAL_IMAGES_TITLE")}
              </span>
              <span className="description">
                {t("CONTENT_TYPE_MODAL_IMAGES_DESC")}
              </span>

              <div className="files">
                {image && (
                  <div className="files-uploaded">
                    <div className="files-uploaded-icon" onClick={removeImage}>
                      <i className="icon-bin" />
                    </div>
                    <Image url={image[currentLang]} />
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => upsertCategory(selectedCategory)}
            disabled={name.length > 0 ? false : true}
          >
            <CircleSpinner show={upsertSpinner} size="small" />
            {!upsertSpinner && modalUpsertBtn}
          </button>
          <button className="btn btn-secondary" onClick={closeAddCategoryModal}>
            {t("CANCEL")}
          </button>
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
          mediaType={["image"]}
        />
      )}
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Categories;
