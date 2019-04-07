import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { languageManager, utility, useGlobalState } from "../../../../services";
import {
  addContentType,
  updateContentType
} from "./../../../../Api/contentType-api";
import AssetBrowser from "./../../../../components/AssetBrowser";
import "./styles.scss";

const templates = [
  {
    id: "1",
    name: "dataCollection",
    title: "Data Collection",
    description: "Create an item type with custom fields",
    icon: "icon-database",
    fields: [
      {
        sys: {
          id: "1",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
        sys: {
          id: "2",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
      }
    ],
    allowCustomFields: true
  },
  {
    id: "2",
    name: "content",
    title: "Content",
    description: "It contains a body field",
    icon: "icon-drawer2",
    allowCustomFields: true,
    fields: [
      {
        sys: {
          id: "1",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
        sys: {
          id: "2",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
        sys: {
          id: "3",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: "media",
        title: {
          fa: "رسانه",
          en: "Media"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "media",
        isBase: true,
        mediaType: "all",
        isTranslate: true
      },
      {
        sys: {
          id: "4",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: "body",
        title: {
          en: "Body",
          fa: "محتوا"
        },
        description: {
          en: "",
          fa: ""
        },
        type: "richText",
        isBase: true
      }
    ]
  },
  {
    id: "3",
    name: "gallery",
    title: "Gallery",
    description: "Making custom gallery collection",
    icon: "icon-images",
    fields: [
      {
        sys: {
          id: "1",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
        sys: {
          id: "2",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
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
        sys: {
          id: "3",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: "cover",
        title: {
          fa: "تصویر گالری",
          en: "Cover Image"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "media",
        mediaType: "image",
        isTranslate: true,
        isRequired: true,
        isList: false,
        isBase: true
      },
      {
        sys: {
          id: "4",
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: "gallery",
        title: {
          en: "Gallery",
          fa: "گالری"
        },
        description: {
          en: "",
          fa: ""
        },
        type: "media",
        mediaType: "all",
        isList: true,
        isBase: true
      }
    ],
    allowCustomFields: true
  }
];

const UpsertTemplate = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{}, dispatch] = useGlobalState();
  const { updateMode } = props;
  const submitBtnText = !updateMode
    ? languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_NEW")
    : languageManager.translate("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_EDIT");

  const selectedContentType = updateMode
    ? props.selectedContentType
    : undefined;
  const [isOpen, toggleModal] = useState(true);

  const [modalHeaderTitle, setModalHeader] = useState(
    !updateMode
      ? languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_NEW")
      : languageManager.translate("CONTENT_TYPE_MODAL_HEADER_TITLE_EDIT")
  );

  const [tab, changeTab] = useState(updateMode ? 2 : 1);
  const [newFieldHeaderTitle, setAddFieldHeaderTitle] = useState(
    languageManager.translate("CONTENT_TYPE_ADD_FIELD_TITLE")
  );
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
  const [images, setImages] = useState(
    selectedContentType
      ? selectedContentType.images
        ? makeImages(selectedContentType.images)
        : []
      : []
  );
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [versioning, toggleVersioning] = useState(
    selectedContentType ? selectedContentType.enableVersioning : false
  );

  useEffect(() => {
    return () => {
      if (!props.isOpen) toggleModal(false);
    };
  }, []);

  function closeModal() {
    props.onCloseModal();
  }
  function handleChooseTemplate(tmp) {
    changeTab(2);
    setTemplate(tmp);
    const title =
      languageManager.translate("CONTENT_TYPE_ADD_FIELD_CHOOSEN") +
      " " +
      tmp.name;
    setAddFieldHeaderTitle(title);
  }
  function backToTemplates() {
    const title = languageManager.translate("CONTENT_TYPE_ADD_FIELD_CHOOSEN");
    setAddFieldHeaderTitle(title);
    changeTab(1);
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
      obj["images"] = images;
      obj["enableVersioning"] = versioning;

      updateContentType()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("CONTENT_TYPE_UPDATE_ON_OK")
            }
          });
          dispatch({
            type: "SET_CONTENT_TYPES",
            value: result
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
                "CONTENT_TYPE_UPDATE_ON_BAD_REQUEST"
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
                "CONTENT_TYPE_UPDATE_UN_AUTHORIZED"
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
                "CONTENT_TYPE_UPDATE_NOT_FOUND"
              )
            }
          });
        })
        .call(obj);
    } else {
      let obj = {
        sys: {
          id: Math.random(),
          issuer: {
            fullName: "Saeed Padyab",
            image: ""
          },
          issueDate: "19/01/2019 20:18"
        },
        name: name,
        title: utility.applyeLangs(title),
        description: utility.applyeLangs(description),
        images: images,
        fields: [...selectedTemplate.fields],
        type: "contentType",
        template: selectedTemplate.name,
        allowCustomFields: selectedTemplate.allowCustomFields,
        enableVersioning: versioning
      };
      addContentType()
        .onOk(result => {
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "success",
              message: languageManager.translate("CONTENT_TYPE_ADD_ON_OK")
            }
          });
          dispatch({
            type: "SET_CONTENT_TYPES",
            value: result
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
                "CONTENT_TYPE_ADD_ON_BAD_REQUEST"
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
                "CONTENT_TYPE_ADD_UN_AUTHORIZED"
              )
            }
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
    const imgs = images.filter(item => item.id !== image.id);
    setImages(imgs);
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      let imgs = [...images];
      const obj = { ...asset.url, id: Math.random() };
      imgs.push(obj);
      setImages(imgs);
    }
  }
  function handleChangeVersion(e) {
    toggleVersioning(e.target.checked);
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>{modalHeaderTitle}</ModalHeader>
      <ModalBody>
        <div className="c-category-templates-body">
          {tab === 1 ? (
            <div className="fieldsTab">
              {templates.map(tmp => (
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
                          : "whitesmoke"
                    }}
                  >
                    <i className={tmp.icon || "icon-item-type"} />
                  </div>
                  <span className="title">{tmp.title}</span>
                  <span className="description">{tmp.description}</span>
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
              <div className="custom_checkbox">
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
                    Enable versioning of this item type
                  </label>
                  <label>This item type stores all updates as a version</label>
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
                  {images.map((url, index) => (
                    <div key={index} className="files-uploaded">
                      <div
                        className="files-uploaded-icon"
                        onClick={() => removeFile(url)}
                      >
                        <i className="icon-bin" />
                      </div>
                      <img src={url[currentLang]} alt="" />
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
          mediaType={"image"}
        />
      )}
    </Modal>
  );
};

export default UpsertTemplate;
