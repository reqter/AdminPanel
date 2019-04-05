import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/es/Modal";
import String from "./../String";
import FileUploader from "./../FileUploader";
import { languageManager, utility, useGlobalState } from "./../../services";
import "./styles.scss";

import { filterAssets, getAssets, addAsset } from "./../../Api/asset-api";

const fields = [
  {
    id: "1",
    name: "name",
    title: {
      en: "Name",
      fa: "Name"
    },
    description: {
      fa: "name of each product",
      en: "name of each product"
    },
    type: "string",
    isBase: true,
    isTranslate: true,
    isRequired: true
  },
  {
    id: "2",
    name: "shortDesc",
    title: {
      fa: "Short Description",
      en: "Short Description"
    },
    description: {
      fa: "",
      en: ""
    },
    type: "string",
    isBase: true,
    isTranslate: true
  },
  {
    id: "3",
    name: "url",
    title: {
      fa: "Your File",
      en: "Your File"
    },
    description: {
      fa: "",
      en: "Click on file selector top choose your file"
    },
    type: "fileUploader",
    mediaType: "file",
    isBase: true,
    isTranslate: true,
    isRequired: true
  }
];

const AssetBrowser = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ assets }, dispatch] = useGlobalState();
  const [isOpen, toggleModal] = useState(props.isOpen);
  const [tab, changeTab] = useState(1);
  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (tab === 1) {
      getAssetFiles();
    }
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, [props.isOpen, tab]);
  function closeModal() {
    props.onCloseModal();
  }
  function getAssetFiles() {
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(props.mediaType, undefined);
  }
  function chooseFile(file) {
    props.onCloseModal(file);
  }
  function upsertItem(choose) {
    const obj = {
      sys: {
        id: Math.random().toString(),
        issuer: {
          fullName: "Saeed Padyab",
          image: ""
        },
        issueDate: "19/01/2019 20:18"
      },
      name: formData.name,
      shorDesc: formData.shortDesc,
      status: "draft",
      url: formData.url,
      fileType: formData.fileType
    };
    addAsset()
      .onOk(result => {
        if (choose) {
          chooseFile(obj);
        } else {
          setResetForm(false);
          setResetForm(true);
          setFormData({});
          setFormValidation();
        }
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ASSET_ADD_ON_SERVER_ERROR"
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
              "UPSERT_ASSET_ADD_ON_BAD_REQUEST"
            )
          }
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("UPSERT_ASSET_ADD_UN_AUTHORIZED")
          }
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("UPSERT_ASSET_ADD_NOT_FOUND")
          }
        });
      })
      .call(obj);
  }

  //#region second tab
  function setNameToFormValidation(name) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        [name]: null,
        ...prevFormValidation
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    // add value to form
    let f = {
      ...formData
    };
    const { name: key } = field;
    if (value === undefined) {
      delete f[key];
      if (key === "url" && field.isBase) delete f["fileType"];
    } else {
      if (key === "url" && field.isBase) {
        f[key] = {
          en: value["en"],
          fa: value["fa"]
        };
        f.fileType = value.fileType;
      } else f[key] = value;
    }
    setFormData(f);

    // check validation
    let obj = {
      ...formValidation
    };
    if (isValid && obj) {
      delete obj[key];
      if (Object.keys(obj).length === 0) {
        setFormValidation(undefined);
      } else {
        setFormValidation(obj);
      }
    } else {
      if (obj === undefined) {
        obj = {};
      }
      obj[key] = null;
      setFormValidation(obj);
    }
  }
  //#endregion second tab

  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <div className="modal_header_tab">
        <div className="left">
          <div
            className="tabItem"
            style={{
              background: tab === 1 ? "white" : "whitesmoke"
            }}
            onClick={() => changeTab(1)}
          >
            Media
          </div>
          <div
            className="tabItem"
            style={{
              background: tab === 2 ? "white" : "whitesmoke"
            }}
            onClick={() => changeTab(2)}
          >
            Upload New File
          </div>
        </div>
        <div className="right" onClick={closeModal}>
          <i className="icon-cross" />
        </div>
      </div>

      <div className="asset_browser">
        {tab === 1 && (
          <div className="firstTab animated fadeIn">
            {assets.map(file => (
              <div
                key={file.sys.id}
                className="assetItem"
                onClick={() => chooseFile(file)}
              >
                <div className="top">
                  {file.fileType &&
                    (file.fileType.toLowerCase().includes("image") ? (
                      <img src={file.url[currentLang]} alt="" />
                    ) : file.fileType.toLowerCase().includes("video") ? (
                      <i className="icon-video icon" />
                    ) : file.fileType.toLowerCase().includes("audio") ? (
                      <i className="icon-audio icon" />
                    ) : file.fileType.toLowerCase().includes("pdf") ? (
                      <i className="icon-pdf icon" />
                    ) : file.fileType.toLowerCase().includes("spreadsheet") ? (
                      <i className="icon-spreadsheet icon" />
                    ) : (
                      <i className="icon-folder icon" />
                    ))}
                </div>
                <div className="bottom">
                  <span>{file.name[currentLang]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div className="secondTab  animated fadeIn">
            <div className="newUpload">
              <String
                reset={resetForm}
                field={fields[0]}
                formData={formData}
                init={setNameToFormValidation}
                onChangeValue={handleOnChangeValue}
              />
              <String
                reset={resetForm}
                field={fields[1]}
                formData={formData}
                init={setNameToFormValidation}
                onChangeValue={handleOnChangeValue}
              />
              <FileUploader
                reset={resetForm}
                formData={formData}
                field={fields[2]}
                init={setNameToFormValidation}
                onChangeValue={handleOnChangeValue}
              />
            </div>
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => upsertItem(false)}
                disabled={
                  !(
                    Object.keys(formData).length > 0 &&
                    formValidation === undefined
                  )
                }
              >
                Save & New
              </button>
              <button
                className="btn btn-primary"
                onClick={() => upsertItem(true)}
                disabled={
                  !(
                    Object.keys(formData).length > 0 &&
                    formValidation === undefined
                  )
                }
              >
                Save & Choose
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssetBrowser;
