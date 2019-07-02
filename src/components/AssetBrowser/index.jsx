import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/es/Modal";
import String from "./../String";
import FileUploader from "./../FileUploader";
import { AssetFile, CircleSpinner, Image } from "./../../components";
import { useGlobalState, useLocale } from "./../../hooks";
import "./styles.scss";

import { filterAssets, addAsset } from "./../../Api/asset-api";
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
    name: "description",
    title: {
      en: "Description",
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
      fa: "انتخاب فایل",
      en: "Your File",
    },
    description: {
      fa: "انتخاب فایل برای مثال تصویر، ویدیو، صدا، پی دی اف",
      en: "Choose your file for example image, video , voice, pdf",
    },
    type: "fileUploader",
    mediaType: "file",
    isBase: true,
    isTranslate: true,
    isRequired: true,
  },
];

const AssetBrowser = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [{ assets, spaceInfo }, dispatch] = useGlobalState();
  const [isOpen, toggleModal] = useState(props.isOpen);
  const [tab, changeTab] = useState(1);
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState({});
  const [formValidation, setFormValidation] = useState();
  const [isValidForm, toggleIsValidForm] = useState();
  const [spinner, toggleSpinner] = useState(false);
  const [closeSpinner, toggleCloseSpinner] = useState(false);

  useEffect(() => {
    getAssetFiles();
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, []);

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
    const fileType =
      props.mediaType === undefined ||
      props.mediaType.length === 0 ||
      props.mediaType.length === "all"
        ? undefined
        : props.mediaType;

    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_GET_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_GET_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: t("ASSET_GET_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call(spaceInfo.id, fileType, undefined);
  }
  function chooseFile(file) {
    props.onCloseModal(file);
  }

  function upsertItem(closePage) {
    if (!spinner) {
      if (closePage) {
        toggleCloseSpinner(true);
      } else {
        toggleSpinner(true);
      }

      const obj = {
        name: form.name,
        title: form.title,
        description: form.shortDesc,
        url: form.url,
        fileType: form.fileType,
      };
      addAsset()
        .onOk(result => {
          if (closePage) {
            toggleCloseSpinner(false);
          } else {
            toggleSpinner(false);
          }
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: t("UPSERT_ASSET_ADD_ON_OK"),
            },
          });
          if (closePage) {
            changeTab(1);
            getAssetFiles();
          } else {
            setFormData({});
            setForm({});
            const newObj = { ...formValidation };
            setFormValidation(newObj);
          }
        })
        .onServerError(result => {
          if (closePage) {
            toggleCloseSpinner(false);
          } else {
            toggleSpinner(false);
          }
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("UPSERT_ASSET_ADD_ON_SERVER_ERROR"),
            },
          });
        })
        .onBadRequest(result => {
          if (closePage) {
            toggleCloseSpinner(false);
          } else {
            toggleSpinner(false);
          }
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("UPSERT_ASSET_ADD_ON_BAD_REQUEST"),
            },
          });
        })
        .unAuthorized(result => {
          if (closePage) {
            toggleCloseSpinner(false);
          } else {
            toggleSpinner(false);
          }
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("UPSERT_ASSET_ADD_UN_AUTHORIZED"),
            },
          });
        })
        .notFound(result => {
          if (closePage) {
            toggleCloseSpinner(false);
          } else {
            toggleSpinner(false);
          }
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("UPSERT_ASSET_ADD_NOT_FOUND"),
            },
          });
        })
        .call(spaceInfo.id, obj);
    }
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
        f.fileType = value.fileType.split("/")[0];
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
            {t("ASSET_BROWSER_FIRST_TAB")}
          </div>
          <div
            className="tabItem"
            style={{
              background: tab === 2 ? "white" : "whitesmoke",
            }}
            onClick={() => changeTab(2)}
          >
            {t("ASSET_BROWSER_SECOND_TAB")}
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
                    <Image url={file.url[currentLang]} />
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
                  <div>
                    {file.title &&
                      file.title[currentLang] &&
                      file.title[currentLang]}
                  </div>
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
                className="btn btn-primary ajax-button"
                onClick={() => upsertItem(false)}
                disabled={!isValidForm}
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner && t("SAVE_AND_NEW")}
              </button>
              <button
                className="btn btn-primary ajax-button"
                onClick={() => upsertItem(true)}
                disabled={!isValidForm}
              >
                <CircleSpinner show={closeSpinner} size="small" />
                {!closeSpinner && t("SAVE_AND_BACK")}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssetBrowser;
