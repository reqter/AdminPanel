import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, languageManager } from "./../../services";
import { getAssetById, addAsset, updateAsset } from "./../../Api/asset-api";
import {
  String,
  Number,
  DateTime,
  Location,
  Media,
  Boolean,
  KeyValue,
  RichText,
  FileUploader
} from "./../../components";

const fields = [
  {
    id: "1",
    name: "title",
    title: {
      en: "Title",
      fa: "عنوان"
    },
    description: {
      en: "this will be apear on assets",
      fa: "نام فایل برای نمایش در لیست"
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
      en: "Short Description",
      fa: "توضیحات"
    },
    description: {
      en: "Short description of your file",
      fa: "توضیح کوتاه برای فایل"
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

const UpsertFile = props => {
  const [{}, dispatch] = useGlobalState();
  // variables
  const [updateMode, toggleUpdateMode] = useState();
  const [tab, changeTab] = useState(); // tab1 ; form , tab2 : errors
  const [error, setError] = useState();
  const [formData, setFormData] = useState({});
  const [formValidation, setFormValidation] = useState();

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      if (props.match.params.id.length > 0) {
        getAssetItemById(props.match.params.id);
        toggleUpdateMode(true);
      } else {
        const obj = {
          type: "wrongUrl",
          message: languageManager.translate("UPSERT_ASSET_WRONG_URL")
        };
        // url is wrong
        changeTab(2);
        setError(obj);
      }
    } else {
      // creation mode
      toggleUpdateMode(false);
      changeTab(1);
    }
  }, [props.match.params.id]);

  // methods
  function getAssetItemById(id) {
    getAssetById()
      .onOk(result => {
        changeTab(1);
        setFormData(result);
      })
      .onServerError(result => {
        const obj = {
          type: "ON_SERVER_ERROR",
          message: languageManager.translate(
            "UPSERT_ASSET_GET_BY_ID_ON_SERVER_ERROR"
          )
        };
        changeTab(2);
        setError(obj);
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "UPSERT_ASSET_GET_BY_ID_ON_BAD_REQUEST"
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
              "UPSERT_ASSET_GET_BY_ID_UN_AUTHORIZED"
            )
          }
        });
      })
      .notFound(result => {
        const obj = {
          type: "NOT_FOUND",
          message: languageManager.translate("UPSERT_ASSET_GET_BY_ID_NOT_FOUND")
        };
        changeTab(2);
        setError(obj);
      })
      .call(id);
  }
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
    let f = { ...formData };
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
          fa: value["fa"]
        };
        f.fileType = value.fileType;
        f.name = value["name"];
        f["title"] = {
          en: value["name"],
          fa: value["name"]
        };
      } else f[key] = value;
    }
    setFormData(f);

    // check validation
    let obj = { ...formValidation };
    if (isValid && obj) {
      delete obj[key];
      if (key === "url" && field.isBase) delete obj["title"];
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

  function getFieldItem(field) {
    switch (field.type.toLowerCase()) {
      case "string":
        return (
          <String
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "number":
        return (
          <Number
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "datetime":
        return (
          <DateTime
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "location":
        return (
          <Location
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "media":
        return (
          <Media
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "fileuploader":
        return (
          <FileUploader
            formData={formData}
            field={field}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "boolean":
        return (
          <Boolean
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "keyvalue":
        return (
          <KeyValue
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      case "richtext":
        return (
          <RichText
            field={field}
            formData={formData}
            init={setNameToFormValidation}
            onChangeValue={handleOnChangeValue}
          />
        );
      default:
        break;
    }
  }
  function backToAssets() {
    props.history.push("/panel/assets");
  }

  function upsertItem(closePage) {
    if (updateMode) {
      updateAsset()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ASSET_UPDATE_ON_OK")
            }
          });
          if (closePage) {
            backToAssets();
          } else {
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
                "UPSERT_ASSET_UPDATE_ON_SERVER_ERROR"
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
                "UPSERT_ASSET_UPDATE_ON_BAD_REQUEST"
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
                "UPSERT_ASSET_UPDATE_UN_AUTHORIZED"
              )
            }
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: languageManager.translate(
                "UPSERT_ASSET_UPDATE_NOT_FOUND"
              )
            }
          });
        })
        .call(formData);
    } else {
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
        title: formData.title,
        shorDesc: formData.shortDesc,
        status: "draft",
        url: formData.url,
        fileType: formData.fileType
      };
      addAsset()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("UPSERT_ASSET_ADD_ON_OK")
            }
          });
          if (closePage) {
            backToAssets();
          } else {
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
              message: languageManager.translate(
                "UPSERT_ASSET_ADD_UN_AUTHORIZED"
              )
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
  }
  function refreshCurrentPage() {
    window.location.reload();
  }
  return (
    <div className="up-wrapper">
      <div className="up-header">
        <button className="btn btn-light" onClick={backToAssets}>
          <i className="icon-arrow-left2" />
          {languageManager.translate("BACK")}
        </button>
        <div className="tabItems">
          <div className="item active">
            {updateMode
              ? `1.${languageManager.translate(
                  "UPSERT_ASSET_HEADER_EDIT_TITLE"
                )}`
              : `1.${languageManager.translate(
                  "UPSERT_ASSET_HEADER_ADD_TITLE"
                )}`}
          </div>
        </div>
      </div>
      <div className="up-content">
        <main>
          {tab === 1 && (
            <>
              <div className="up-content-title">
                {updateMode
                  ? languageManager.translate("UPSERT_ASSET_HEADER_EDIT_TITLE")
                  : languageManager.translate("UPSERT_ASSET_HEADER_ADD_TITLE")}
              </div>
              <div className="up-formInputs animated fadeIn">
                {fields.map(field => (
                  <div key={field.id} className="rowItem">
                    {getFieldItem(field)}
                  </div>
                ))}
                <div className="actions">
                  {!updateMode && (
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
                  )}
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
                    {updateMode ? "Update & Close" : "Save & Close"}
                  </button>
                </div>
              </div>
            </>
          )}
          {tab === 2 && (
            <div className="up-formInputs animated fadeIn errorsBox">
              <div className="alert alert-danger">{error.message}</div>
              <div className="actions">
                <button className="btn btn-light" onClick={refreshCurrentPage}>
                  {languageManager.translate(
                    "UPSERT_ASSET_ERROR_BOX_REFRESH_BTN"
                  )}
                </button>
                <button className="btn btn-light" onClick={backToAssets}>
                  {languageManager.translate(
                    "UPSERT_ASSET_ERROR_BOX_MEDIA_BTN"
                  )}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UpsertFile;
