import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/es/Modal";
import String from "./../String";
import FileUploader from "./../FileUploader";
import { AssetFile } from "./../../components";
import { languageManager, utility, useGlobalState } from "./../../services";
import "./styles.scss";

import { filterAssets, getAssets, addAsset } from "./../../Api/asset-api";
const fields = [
  {
    id: "1",
    name: "title",
    title: {
      en: "Title",
      fa: "عنوان",
    },
    description: {
      en: "this will be apear on assets",
      fa: "نام فایل برای نمایش در لیست",
    },
    type: "string",
    isBase: true,
    isTranslate: true,
    isRequired: true,
  },
  {
    id: "2",
    name: "shortDesc",
    title: {
      en: "Short Description",
      fa: "توضیحات",
    },
    description: {
      en: "Short description of your file",
      fa: "توضیح کوتاه برای فایل",
    },
    type: "string",
    isBase: true,
    isTranslate: true,
  },
  {
    id: "3",
    name: "url",
    title: {
      fa: "Your File",
      en: "Your File",
    },
    description: {
      fa: "",
      en: "Click on file selector top choose your file",
    },
    type: "fileUploader",
    fileType: "image",
    isBase: true,
    isTranslate: true,
    isRequired: true,
  },
];

const AssetBrowser = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ assets }, dispatch] = useGlobalState();
  const [isOpen, toggleModal] = useState(props.isOpen);
  const [tab, changeTab] = useState(1);
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [isValidForm, toggleIsValidForm] = useState();

  useEffect(() => {
    if (tab === 1) {
      getAssetFiles();
    }
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, [props.isOpen, tab]);

  useEffect(() => {
    if (Object.keys(form).length > 0 && checkFormValidation()) {
      toggleIsValidForm(true);
    } else toggleIsValidForm(false);
  }, [formValidation]);

  function checkFormValidation() {
    for (const key in formValidation) {
      if (formValidation[key] === false) return false;
    }
    return true;
  }

  function closeModal() {
    props.onCloseModal();
  }
  function getAssetFiles() {
    const all =
      props.mediaType === undefined ||
      props.mediaType.length === 0 ||
      props.mediaType.includes("file")
        ? true
        : false;
    const image = props.mediaType.includes("image") ? true : false;
    const video = props.mediaType.includes("video") ? true : false;
    const audio = props.mediaType.includes("audio") ? true : false;
    const pdf = props.mediaType.includes("pdf") ? true : false;
    const spreadsheet =
      props.mediaType.includes("spreadsheet") !== -1 ? true : false;

    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(all, image, video, audio, pdf, spreadsheet, undefined);
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
          image: "",
        },
        issueDate: "19/01/2019 20:18",
      },
      name: form.name,
      title: form.title,
      shorDesc: form.shortDesc,
      status: "draft",
      url: form.url,
      fileType: form.fileType,
    };
    addAsset()
      .onOk(result => {
        if (choose) {
          //chooseFile(obj);
          changeTab(1);
        } else {
          setFormData({});
          setForm({});
          const newObj = { ...formValidation };
          setFormValidation(newObj);
        }
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ASSET_ADD_ON_SERVER_ERROR"
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
              "UPSERT_ASSET_ADD_ON_BAD_REQUEST"
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
              "UPSERT_ASSET_ADD_UN_AUTHORIZED"
            ),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("UPSERT_ASSET_ADD_NOT_FOUND"),
          },
        });
      })
      .call(obj);
  }

  //#region second tab
  function setNameToFormValidation(name, value) {
    if (!formValidation || formValidation[name] !== null) {
      setFormValidation(prevFormValidation => ({
        [name]: value,
        ...prevFormValidation,
      }));
    }
  }
  function handleOnChangeValue(field, value, isValid) {
    // add value to form
    let f = {
      ...form,
    };
    const { name: key } = field;
    if (value === undefined) {
      delete f[key];
      if (key === "url" && field.isBase) {
        delete f["fileType"];
        delete f["name"];
        delete f["title"];
      }
    } else {
      if (key === "url" && field.isBase) {
        f[key] = {
          en: value["en"],
          fa: value["fa"],
        };
        f.fileType = value.fileType;
        f.name = value["name"];
        f["title"] = {
          en: value["name"],
          fa: value["name"],
        };
      } else f[key] = value;
    }
    setForm(f);

    // check validation
    setFormValidation(prevFormValidation => ({
      ...prevFormValidation,
      [key]: isValid,
    }));
    // let obj = {
    //   ...formValidation
    // };
    // if (isValid && obj) {
    //   delete obj[key];
    //   if (key === "url" && field.isBase) delete obj["title"];
    //   if (Object.keys(obj).length === 0) {
    //     setFormValidation(undefined);
    //   } else {
    //     setFormValidation(obj);
    //   }
    // } else {
    //   if (obj === undefined) {
    //     obj = {};
    //   }
    //   obj[key] = null;
    //   setFormValidation(obj);
    // }
  }
  //#endregion second tab

  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <div className="modal_header_tab">
        <div className="left">
          <div
            className="tabItem"
            style={{
              background: tab === 1 ? "white" : "whitesmoke",
            }}
            onClick={() => changeTab(1)}
          >
            Media
          </div>
          <div
            className="tabItem"
            style={{
              background: tab === 2 ? "white" : "whitesmoke",
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
                  {file.fileType.toLowerCase().includes("image") ? (
                    <img src={file.url[currentLang]} alt="" />
                  ) : file.fileType.toLowerCase().includes("video") ? (
                    <i className="icon-video" />
                  ) : file.fileType.toLowerCase().includes("audio") ? (
                    <i className="icon-audio" />
                  ) : file.fileType.toLowerCase().includes("pdf") ? (
                    <i className="icon-pdf" />
                  ) : file.fileType.toLowerCase().includes("spreadsheet") ? (
                    <i className="icon-spreadsheet" />
                  ) : (
                    <AssetFile file={file} />
                  )}
                </div>
                <div className="bottom">
                  <div>{file.title[currentLang]}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div className="secondTab animated fadeIn">
            <div className="newUpload">
              <String
                field={fields[0]}
                formData={formData}
                init={setNameToFormValidation}
                onChangeValue={handleOnChangeValue}
              />
              <String
                field={fields[1]}
                formData={formData}
                init={setNameToFormValidation}
                onChangeValue={handleOnChangeValue}
              />
              <FileUploader
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
                disabled={!isValidForm}
              >
                Save & New
              </button>
              <button
                className="btn btn-primary"
                onClick={() => upsertItem(true)}
                disabled={!isValidForm}
              >
                Save & Back
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssetBrowser;
