import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { languageManager, utility, useGlobalState } from "../../../../services";
import {
  getTemplates,
  addContentType,
  updateContentType,
} from "./../../../../Api/contentType-api";
import AssetBrowser from "./../../../../components/AssetBrowser";
import "./styles.scss";

const UpsertTemplate = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ contentTypeTemlates }, dispatch] = useGlobalState();
  const nameInput = useRef(null);

  const { updateMode } = props;
  const submitBtnText = !updateMode
    ? languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_NEW")
    : languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_EDIT");

  const selectedContentType = updateMode
    ? props.selectedContentType
    : undefined;
  const [isOpen, toggleModal] = useState(true);

  const [tab, changeTab] = useState(updateMode ? 2 : 1);
  const [selectedTemplate, setTemplate] = useState(
    updateMode ? props.selectedTemplate : {}
  );
  const [name, setName] = useState(
    selectedContentType ? selectedContentType.name : ""
  );
  const [title, setTitle] = useState(
    selectedContentType ? selectedContentType.title[currentLang] : ""
  );
  const [description, setDescription] = useState(
    selectedContentType ? selectedContentType.description[currentLang] : ""
  );
  const [media, setMedia] = useState(
    selectedContentType
      ? selectedContentType.media
        ? makeImages(selectedContentType.media)
        : []
      : []
  );
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [versioning, toggleVersioning] = useState(
    selectedContentType ? selectedContentType.enableVersioning : false
  );
  const [accessRight, toggleAccessRight] = useState(
    selectedContentType ? selectedContentType.enableAccessRight : false
  );

  useEffect(() => {
    getTemplates()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENT_TEMPLATES",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              "CONTENT_TYPE_TEMPLATES_ON_SERVER_ERROR"
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
              "CONTENT_TYPE_TEMPLATES_ON_BAD_REQUEST"
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
              "CONTENT_TYPE_TEMPLATES_UN_AUTHORIZED"
            ),
          },
        });
      })
      .call();
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, []);
  useEffect(() => {
    if (tab === 2) {
      nameInput.current.focus();
    }
  }, [tab]);

  function closeModal() {
    props.onCloseModal();
  }
  function handleChooseTemplate(tmp) {
    changeTab(2);
    setTemplate(tmp);
  }
  function backToTemplates() {
    changeTab(1);
    setTemplate({});
  }
  function handleNameChanged(e) {
    setName(e.target.value);
  }
  function handleTitleChanged(e) {
    setTitle(e.target.value);
  }
  function handleDescriptionChanged(e) {
    setDescription(e.target.value);
  }

  function makeImages(imgs) {
    let result = [...imgs];
    const newArr = result.map(img => {
      let item = { ...img };
      item.id = Math.random();
      return item;
    });
    return newArr;
  }
  function upsertItemType() {
    if (updateMode) {
      let obj = {};
      for (const key in selectedContentType) {
        obj[key] = selectedContentType[key];
      }
      obj["name"] = name;
      obj["title"] = utility.applyeLangs(title);
      obj["description"] = utility.applyeLangs(description);
      obj["media"] = media;
      obj["enableVersioning"] = versioning;
      obj["enableAccessRight"] = accessRight;
      if (!accessRight) delete obj["visibleTo"];

      updateContentType()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("CONTENT_TYPE_UPDATE_ON_OK"),
            },
          });
          dispatch({
            type: "SET_CONTENT_TYPES",
            value: result,
          });
          props.onCloseModal(obj);
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CONTENT_TYPE_UPDATE_ON_SERVER_ERROR"
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
                "CONTENT_TYPE_UPDATE_ON_BAD_REQUEST"
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
                "CONTENT_TYPE_UPDATE_UN_AUTHORIZED"
              ),
            },
          });
        })
        .notFound(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CONTENT_TYPE_UPDATE_NOT_FOUND"
              ),
            },
          });
        })
        .call(obj);
    } else {
      let obj = {
        sys: {
          id: Math.random(),
          issuer: {
            fullName: "Saeed Padyab",
            image: "",
          },
          issueDate: "19/01/2019 20:18",
        },
        name: name,
        title: utility.applyeLangs(title),
        description: utility.applyeLangs(description),
        media: media,
        fields: [...selectedTemplate.fields],
        type: "contentType",
        template: selectedTemplate.name,
        allowCustomFields: selectedTemplate.allowCustomFields,
        enableVersioning: versioning,
        enableAccessRight: accessRight,
      };
      addContentType()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("CONTENT_TYPE_ADD_ON_OK"),
            },
          });
          dispatch({
            type: "SET_CONTENT_TYPES",
            value: result,
          });
          props.onCloseModal(obj);
        })
        .onServerError(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: languageManager.translate(
                "CONTENT_TYPE_ADD_ON_SERVER_ERROR"
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
                "CONTENT_TYPE_ADD_ON_BAD_REQUEST"
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
                "CONTENT_TYPE_ADD_UN_AUTHORIZED"
              ),
            },
          });
        })
        .call(obj);
    }

    // const obj = {
    //   selectedTemplate: selectedTemplate,
    //   name: name,
    //   title: utility.applyeLangs(title),
    //   description: utility.applyeLangs(description)
    // };
  }
  function removeFile(image) {
    const m = media.filter(item => item.id !== image.id);
    setMedia(m);
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      let imgs = [...media];
      const obj = { ...asset.url, id: Math.random() };
      imgs.push(obj);
      setMedia(imgs);
    }
  }
  function handleChangeVersion(e) {
    toggleVersioning(e.target.checked);
  }
  function handleAccessRightChanged(e) {
    toggleAccessRight(e.target.checked);
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>
        {!updateMode
          ? languageManager.translate("ADD_NEW") +
            " " +
            (selectedTemplate
              ? selectedTemplate.title
                ? selectedTemplate.title[currentLang]
                : languageManager.translate("CONTENT_TYPE")
              : languageManager.translate("CONTENT_TYPE"))
          : languageManager.translate("EDIT") +
            " " +
            (selectedContentType ? selectedContentType.title[currentLang] : "")}
      </ModalHeader>
      <ModalBody>
        <div className="c-category-templates-body">
          {tab === 1 ? (
            <div className="fieldsTab">
              {contentTypeTemlates.map(tmp => (
                <div
                  key={tmp.id}
                  className="add-field-types"
                  onClick={() => handleChooseTemplate(tmp)}
                >
                  <div
                    className="add-field-icon"
                    style={{
                      backgroundColor:
                        selectedContentType &&
                        selectedContentType.template === tmp.name
                          ? "lightgray"
                          : "whitesmoke",
                    }}
                  >
                    <i className={tmp.icon ? tmp.icon : "icon-item-type"} />
                  </div>
                  <span className="title">{tmp.title[currentLang]}</span>
                  <span className="description">
                    {tmp.description[currentLang]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "2%", paddingBottom: 0 }}>
              <div className="row">
                <div className="form-group col">
                  <label>
                    {languageManager.translate("CONTENT_TYPE_MODAL_NAME")}
                  </label>
                  <input
                    ref={nameInput}
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate(
                      "CONTENT_TYPE_MODAL_NAME_PLACEHOLDER"
                    )}
                    value={name}
                    required
                    onChange={handleNameChanged}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      "CONTENT_TYPE_MODAL_NAME_DESCRIPTION"
                    )}
                  </small>
                </div>

                <FormGroup className="col">
                  <Label>
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE"
                    )}
                  </Label>
                  <Input
                    type="string"
                    value={title}
                    placeholder={languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE_PLACEHOLDER"
                    )}
                    onChange={handleTitleChanged}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    {languageManager.translate(
                      "CONTENT_TYPE_ADD_FIELD_MODAL_TITLE_INFO"
                    )}
                  </small>
                </FormGroup>
              </div>

              <FormGroup>
                <Label>
                  {languageManager.translate("CONTENT_TYPE_MODAL_DESCRIPTION")}
                </Label>
                <Input
                  type="string"
                  placeholder={languageManager.translate(
                    "CONTENT_TYPE_MODAL_DESCRIPTION_PLACEHOLDER"
                  )}
                  value={description}
                  onChange={handleDescriptionChanged}
                />
              </FormGroup>
              <div className="row">
                <div className="custom_checkbox col">
                  <div className="left">
                    <label className="checkBox">
                      <input
                        type="checkbox"
                        id="version"
                        checked={versioning}
                        onChange={handleChangeVersion}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="right">
                    <label for="version">
                      Enable versioning of this content type
                    </label>
                    <label>
                      This item type stores all updates as a version
                    </label>
                  </div>
                </div>
                <div className="custom_checkbox col">
                  <div className="left">
                    <label className="checkBox">
                      <input
                        type="checkbox"
                        id="accessRight"
                        checked={accessRight}
                        onChange={handleAccessRightChanged}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="right">
                    <label for="accessRight">
                      Enable access right of this content type
                    </label>
                    <label for="accessRight">
                      You can set acceess rights on this contebt type
                    </label>
                  </div>
                </div>
              </div>
              <div className="up-uploader">
                <span className="title">
                  {languageManager.translate("CONTENT_TYPE_MODAL_IMAGES_TITLE")}
                </span>
                <span className="description">
                  {languageManager.translate("CONTENT_TYPE_MODAL_IMAGES_DESC")}
                </span>

                <div className="files">
                  {media.map((url, index) => (
                    <div key={index} className="files-uploaded">
                      <div
                        className="files-uploaded-icon"
                        onClick={() => removeFile(url)}
                      >
                        <i className="icon-bin" />
                      </div>
                      <div className="updatedFileType">
                        {utility.getAssetIconByURL(url[currentLang])}
                      </div>
                    </div>
                  ))}
                  <div className="files-input" onClick={openAssetBrowser}>
                    <i className="icon-camera" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalBody>
      {tab !== 1 ? (
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={upsertItemType}
            disabled={
              name.length > 0 && title.length > 0 && !name.includes(" ")
                ? false
                : true
            }
          >
            {submitBtnText}
          </Button>
          {!updateMode && (
            <Button color="secondary" onClick={backToTemplates}>
              {languageManager.translate("CONTENT_TYPE_MODAL_TEMPLATE_BTN")}
            </Button>
          )}
        </ModalFooter>
      ) : (
        undefined
      )}

      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={"image,video"}
        />
      )}
    </Modal>
  );
};

export default UpsertTemplate;
