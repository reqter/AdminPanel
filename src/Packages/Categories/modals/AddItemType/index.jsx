import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import {
  addContentTypeToCategory,
  removeContentTypeFromCategory,
  getContentTypes
} from "./../../../../Api/category-api";
import "./styles.scss";

const AddContentType = props => {
  const [{}, dispatch] = useGlobalState();
  const currentLang = languageManager.getCurrentLanguage().name;
  const { selectedCategory } = props;
  let items = props.itemTypes ? props.itemTypes : [];
  let data = props.data;
  const [allData, setData] = useState([]);
  const [isOpen, toggleModal] = useState(true);
  useEffect(() => {
    getContentTypes()
      .onOk(result => {
        let d = result.slice();
        for (let j = 0; j < items.length; j++) {
          for (let i = 0; i < d.length; i++) {
            if (items[j].id === d[i].id) {
              d[i].selected = true;
              break;
            }
          }
        }
        setData(d);
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENT_TYPE_ON_SERVER_ERROR")
          }
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST")
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED")
          }
        });
      })
      .call();

    return () => {
      allData.map(d => delete d.selected);
      if (!props.isOpen) toggleModal(false);
    };
  }, []);
  function closeModal(params) {
    props.onCloseModal(items);
  }
  function handleChooseItem(event, item) {
    if (event.target.checked) {
      addContentTypeToCategory()
        .onOk(result => {
          props.onAddContentType(result, item);
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_ADD_CONTENT_TYPE_ON_SERVER_ERROR"
              )
            }
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_ADD_CONTENT_TYPE_ON_BAD_REQUEST"
              )
            }
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "CATEGORY_ADD_CONTENT_TYPE_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_ADD_CONTENT_TYPE_NOT_FOUND"
              )
            }
          });
        })
        .call(selectedCategory.sys.id, item);
    } else {
      removeContentTypeFromCategory()
        .onOk(result => {
          props.onRemoveContentType(result, item);
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_REMOVE_CONTENT_TYPE_ON_SERVER_ERROR"
              )
            }
          });
        })
        .onBadRequest(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_REMOVE_CONTENT_TYPE_ON_BAD_REQUEST"
              )
            }
          });
        })
        .unAuthorized(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "CATEGORY_REMOVE_CONTENT_TYPE_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CATEGORY_REMOVE_CONTENT_TYPE_NOT_FOUND"
              )
            }
          });
        })
        .call(selectedCategory.sys.id, item.sys.id);
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
                <span className="itemType-title">
                  {item.title[currentLang]}
                </span>
                <span className="itemType-description">
                  {item.description[currentLang]}
                </span>
              </div>
            </div>
            <div className="itemTypeModal-right">
              <label className="switch">
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

export default AddContentType;
