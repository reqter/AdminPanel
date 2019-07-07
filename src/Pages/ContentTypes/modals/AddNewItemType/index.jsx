import React, { useState, useEffect, useRef } from "react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { utility } from "../../../../services";
import { useLocale, useGlobalState } from "../../../../hooks";
import {
  getTemplates,
  addContentType,
  updateContentType,
} from "../../../../Api/contentType-api";
import { getPartners } from "../../../../Api/request-api";
import AssetBrowser from "../../../../components/AssetBrowser";
import "./styles.scss";
import { CircleSpinner } from "../../../../components";
import { Empty, Wrong } from "../../../../components/Commons/ErrorsComponent";

const UpsertTemplate = props => {
  const { appLocale, t, currentLang } = useLocale();
  const [{ spaceInfo }, dispatch] = useGlobalState();
  const nameInput = useRef(null);
  const { updateMode } = props;
  const submitBtnText = !updateMode
    ? t("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_NEW")
    : t("CONTENT_TYPE_MODAL_FOOTER_UPSERT_BTN_EDIT");

  const selectedContentType = updateMode
    ? props.selectedContentType
    : undefined;
  const [isOpen, toggleModal] = useState(true);

  const [tab, changeTab] = useState(updateMode ? 4 : 1);
  const [contentTypeTemplates, setContentTypeTemplates] = useState();
  const [selectedTemplate, setTemplate] = useState(
    updateMode ? props.selectedTemplate : undefined
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
  const [formTemplate, setFormTemplate] = useState();

  const [spinner, toggleSpinner] = useState(false);
  const [partnersSpinner, togglePartnersSpinner] = useState();
  const [error, setError] = useState();
  const [allPartners, setAllPartners] = useState();
  const [partners, setPartners] = useState();
  const [selectedPartner, setSelectedPartner] = useState();

  useEffect(() => {
    if (tab === 2) {
      togglePartnersSpinner(true);
      getPartners()
        .onOk(result => {
          if (result && result.length > 0) {
            setAllPartners(result || []);
            setPartners(result);
            if (props.selectedPartner) {
              for (let i = 0; i < result.length; i++) {
                const p = result[i];
                if (p._id === props.selectedPartner._id) {
                  setSelectedPartner(p);
                  break;
                }
              }
            }
          } else {
            setError({
              type: "length",
              title: t("UPSERT_FORM_PARTNERS_EMPTY_TITLE"),
              message: t("UPSERT_FORM_PARTNERS_EMPTY_MESSAGE"),
            });
          }
          togglePartnersSpinner(false);
        })
        .onServerError(result => {
          togglePartnersSpinner(false);
          setError({
            type: "error",
            title: t("INTERNAL_SERVER_ERROR"),
            message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
          });
        })
        .onBadRequest(result => {
          togglePartnersSpinner(false);
          setError({
            type: "error",
            title: t("BAD_REQUEST"),
            message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
          });
        })
        .unAuthorized(result => {
          togglePartnersSpinner(false);
        })
        .notFound(result => {
          togglePartnersSpinner(false);
          setError({
            type: "error",
            title: t("NOT_FOUND"),
            message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
          });
        })
        .unKnownError(result => {
          toggleSpinner(false);
          setError({
            type: "error",
            title: t("UNKNOWN_ERROR"),
            message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
          });
        })
        .onRequestError(result => {
          toggleSpinner(false);
          setError({
            type: "error",
            title: t("ON_REQUEST_ERROR"),
            message: t("UPSERT_FORM_PARTNERS_ERROR_MESSAGE"),
          });
        })
        .call();
    }
  }, [tab]);
  useEffect(() => {
    if (tab == 4) nameInput.current.focus();
  }, [tab]);

  function closeModal() {
    props.onCloseModal();
  }
  function handleChooseTemplate(tmp) {
    changeTab(4);
    setTemplate(tmp);
  }
  function backToTemplates() {
    if (!spinner) {
      changeTab(3);
      setTemplate({});
    }
  }
  function backToTemplateTypes() {
    changeTab(1);
  }
  function backToPartners() {
    changeTab(2);
    setSelectedPartner();
  }
  function _getContentTypeTemplates() {
    getTemplates()
      .onOk(result => {
        setContentTypeTemplates(result);
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("CONTENT_TYPE_TEMPLATES_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("CONTENT_TYPE_TEMPLATES_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: t("CONTENT_TYPE_TEMPLATES_UN_AUTHORIZED"),
          },
        });
      })
      .call();
  }
  function handleChooseFormTemplate(type) {
    setFormTemplate(type);
    if (type === "public") {
      changeTab(3);
      _getContentTypeTemplates();
    } else {
      changeTab(2);
    }
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
    if (!spinner) {
      toggleSpinner(true);

      if (updateMode) {
        let obj = {};
        for (const key in selectedContentType) {
          obj[key] = selectedContentType[key];
        }
        obj["name"] = name.toLowerCase();
        obj["title"] = utility.applyeLangs(title);
        obj["description"] = utility.applyeLangs(description);
        obj["media"] = media;

        updateContentType()
          .onOk(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("CONTENT_TYPE_UPDATE_ON_OK"),
              },
            });
            dispatch({
              type: "UPDATE_CONTENT_TYPE",
              value: result,
            });
            props.onCloseModal(obj);
          })
          .onServerError(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_UPDATE_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_UPDATE_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: t("CONTENT_TYPE_UPDATE_UN_AUTHORIZED"),
              },
            });
          })
          .notFound(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_UPDATE_NOT_FOUND"),
              },
            });
          })
          .call(spaceInfo.id, obj);
      } else {
        let obj = {
          name: name.toLowerCase(),
          title: utility.applyeLangs(title),
          description: utility.applyeLangs(description),
          media: media,
          fields: [...selectedTemplate.fields],
          template: selectedTemplate.name,
          allowCustomFields: selectedTemplate.allowCustomFields,
        };
        addContentType()
          .onOk(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("CONTENT_TYPE_ADD_ON_OK"),
              },
            });
            dispatch({
              type: "ADD_CONTENT_TYPE",
              value: result,
            });
            props.onCloseModal(obj);
          })
          .onServerError(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_ADD_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_ADD_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENT_TYPE_ADD_UN_AUTHORIZED"),
              },
            });
          })
          .call(spaceInfo.id, obj);
      }
    }
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

  function handleSearchChanged(e) {
    const key = e.which || e.key;
    if (key === 13) {
      const s = allPartners.filter(item =>
        item.company_name.includes(e.target.value)
      );
      setPartners(s);
    } else {
      if (e.target.value.length === 0) setPartners(allPartners);
    }
  }
  function handlePartnerClicked(p) {
    setSelectedPartner(p);
    changeTab(3);
    _getContentTypeTemplates();
  }
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>
        {updateMode &&
          t("EDIT") +
            " " +
            (selectedContentType
              ? selectedContentType.title[currentLang]
              : "")}
        {!updateMode && (
          <>
            <span>{t("CONTENT_TYPE_MODAL_HEADER_NEW")}</span>
            {tab === 4 && (
              <span style={{ fontSize: 13, margin: "0 5px" }}>
                ({selectedTemplate.title[currentLang]})
              </span>
            )}
          </>
        )}
      </ModalHeader>
      <ModalBody>
        <div className="c-category-templates-body">
          {tab === 1 && (
            <div className="templateTypes">
              <div className="templateTypes__header">
                {t("CONTENT_TYPE_MODAL_QUESTION_BANK_TYPES_TITLE")}
              </div>
              <div className="templateTypes__content">
                <div
                  className="box"
                  onClick={() => handleChooseFormTemplate("public")}
                >
                  <div className="box__header">
                    <i className="icon-item-type" />
                  </div>
                  <span className="box__title">
                    {t("CONTENT_TYPE_MODAL_QUESTION_BANK_PUBLIC")}
                  </span>
                  <span className="box__desc">
                    {t("CONTENT_TYPE_MODAL_QUESTION_BANK_PUBLIC_INFO")}
                  </span>
                </div>
                <div
                  className="box"
                  onClick={() => handleChooseFormTemplate("partner")}
                >
                  <div className="box__header">
                    <i className="icon-item-type" />
                  </div>
                  <span className="box__title">
                    {t("CONTENT_TYPE_MODAL_QUESTION_BANK_PARTNER")}
                  </span>
                  <span className="box__desc">
                    {t("CONTENT_TYPE_MODAL_QUESTION_BANK_PARTNER_INFO")}
                  </span>
                </div>
              </div>
            </div>
          )}
          {tab === 2 && (
            <div className="partners">
              <input
                type="text"
                className="form-control"
                placeholder={t("UPSERT_FORM_PARTNERS_SEARCH_PLACEHOLDER")}
                onKeyUp={handleSearchChanged}
              />
              <div className="partners__items">
                {partnersSpinner ? (
                  <div className="tabsSpinner">
                    <CircleSpinner show={partnersSpinner} size="large" />
                    <span>{t("UPSERT_FORM_PARTNERS_LOADING")}</span>
                  </div>
                ) : partners ? (
                  partners.map(p => (
                    <div
                      className={
                        "user " +
                        (selectedPartner && selectedPartner._id === p._id
                          ? "active"
                          : "")
                      }
                      key={p._id}
                      onClick={() => handlePartnerClicked(p)}
                    >
                      <div className="user__top">
                        <div className="user__avatar">
                          <img src={p.avatar} alt="" />
                        </div>
                      </div>
                      <div className="user__bottom">
                        {p.company_name
                          ? p.company_name
                          : p.first_name + " " + p.last_name}
                      </div>
                    </div>
                  ))
                ) : (
                  error && (
                    <div className="partner-errors">
                      {error && error.type === "length" ? (
                        <Empty />
                      ) : (
                        <Wrong width="200" height="200" />
                      )}
                      {error && <span className="title">{error.title}</span>}
                      {error && (
                        <span className="message">{error.message}</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {tab === 3 && (
            <div className="fieldsTab">
              {contentTypeTemplates &&
                contentTypeTemplates.map(tmp => (
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
          )}
          {tab === 4 && (
            <div style={{ padding: "2%", paddingBottom: 0 }}>
              <div className="row">
                <div className="form-group col">
                  <label>{t("CONTENT_TYPE_MODAL_NAME")}</label>
                  <input
                    ref={nameInput}
                    type="text"
                    className="form-control"
                    placeholder={t("CONTENT_TYPE_MODAL_NAME_PLACEHOLDER")}
                    value={name}
                    required
                    onChange={handleNameChanged}
                  />
                  <small className="form-text text-muted">
                    {t("CONTENT_TYPE_MODAL_NAME_DESCRIPTION")}
                  </small>
                </div>

                <div className="form-group col">
                  <label>{t("CONTENT_TYPE_ADD_TITLE")}</label>
                  <input
                    type="string"
                    className="form-control"
                    value={title}
                    placeholder={t("CONTENT_TYPE_ADD_TITLE_PLACEHOLDER")}
                    onChange={handleTitleChanged}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    {t("CONTENT_TYPE_ADD_TITLE_INFO")}
                  </small>
                </div>
              </div>

              <div className="form-group">
                <label>{t("CONTENT_TYPE_MODAL_DESCRIPTION")}</label>
                <input
                  type="string"
                  placeholder={t(
                    "CONTENT_TYPE_MODAL_DESCRIPTION_PLACEHOLDER"
                  )}
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChanged}
                />
              </div>
              <div className="up-uploader">
                <span className="title">
                  {t("CONTENT_TYPE_MODAL_IMAGES_TITLE")}
                </span>
                <span className="description">
                  {t("CONTENT_TYPE_MODAL_IMAGES_DESC")}
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
      {tab !== 1 && (
        <ModalFooter>
          {(tab === 2 || (tab === 3 && formTemplate === "public")) && (
            <button
              className="btn btn-secondary"
              onClick={backToTemplateTypes}
            >
              {t("CHANGE_TEMPLATE")}
            </button>
          )}
          {tab === 3 && formTemplate === "partner" && (
            <button className="btn btn-secondary" onClick={backToPartners}>
              {t("CHANGE_PARTNER")}
            </button>
          )}

          {tab === 4 && (
            <>
              <button
                className="btn btn-secondary"
                onClick={backToTemplates}
                style={{ margin: "0 5px" }}
              >
                {t("CHANGE_TEMPLATE")}
              </button>

              <button
                type="submit"
                className="btn btn-primary ajax-button"
                onClick={upsertItemType}
                disabled={
                  name.length > 0 && title.length > 0 && !name.includes(" ")
                    ? false
                    : true
                }
              >
                <CircleSpinner show={spinner} size="small" />
                {!spinner && submitBtnText}
              </button>
            </>
          )}
        </ModalFooter>
      )}
      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={["image"]}
        />
      )}
    </Modal>
  );
};

export default UpsertTemplate;
