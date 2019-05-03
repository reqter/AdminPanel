import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import { CircleSpinner, AssetBrowser } from "../../../../components";
import { addApiKey, updateApiKey } from "./../../../../Api/apiKey-api";

const currentLang = languageManager.getCurrentLanguage().name;

const UpsertApiKey = props => {
  const [{ spaceInfo }, dispatch] = useGlobalState();

  const nameRef = useRef(null);

  const updateMode = props.selectedApiKey === undefined ? undefined : true;
  const selectedApiKey =
    props.selectedApiKey === undefined ? undefined : props.selectedApiKey;

  const [tab, changeTab] = useState(1);
  const [name, setName] = useState(selectedApiKey ? selectedApiKey.name : "");
  const [description, setDescription] = useState(
    selectedApiKey ? selectedApiKey.description : ""
  );
  const [homePage, setHomePage] = useState(
    selectedApiKey ? selectedApiKey.homePage : ""
  );
  const [category, setCategory] = useState(
    selectedApiKey ? selectedApiKey.category : ""
  );

  const [image, setImage] = useState(
    selectedApiKey ? selectedApiKey.icon : undefined
  );
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [spinner, toggleSpinner] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    nameRef.current.focus();
  }, []);

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
  function showNotify(type, msg) {
    dispatch({
      type: "ADD_NOTIFY",
      value: {
        type: type,
        message: msg,
      },
    });
  }
  function closeModal() {
    props.onClose();
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!spinner) {
      toggleSpinner(true);
      if (!updateMode) {
        addApiKey()
          .onOk(result => {
            changeTab(2);
            // showNotify(
            //   "success",
            //   languageManager.translate("PROFILE_CHANGE_PASS_ON_OK")
            // );
            dispatch({
              type: "ADD_API_KEY",
              value: result,
            });
            setResult(result);
          })
          .onServerError(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_ON_SERVER_ERROR")
            );
          })
          .onBadRequest(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_ON_BAD_REQUEST")
            );
          })
          .unAuthorized(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_UN_AUTHORIZED")
            );
          })
          .notFound(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_NOT_FOUND")
            );
          })
          .call({
            name: name,
            description: description,
            homePage: homePage,
            category: category,
            icon: image,
          });
      } else {
        let apikey = {
          ...props.selectedApiKey,
          name: name,
          description: description,
          homePage: homePage,
          category: category,
          icon: image,
        };

        updateApiKey()
          .onOk(result => {
            showNotify(
              "success",
              languageManager.translate("Apikey updated successfully.")
            );
            dispatch({
              type: "UPDATE_API_KEY",
              value: apikey,
            });
            closeModal();
          })
          .onServerError(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_ON_SERVER_ERROR")
            );
          })
          .onBadRequest(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_ON_BAD_REQUEST")
            );
          })
          .unAuthorized(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_UN_AUTHORIZED")
            );
          })
          .notFound(result => {
            toggleSpinner(false);
            showNotify(
              "error",
              languageManager.translate("PROFILE_CHANGE_PASS_NOT_FOUND")
            );
          })
          .call(apikey);
      }
    }
  }
  return (
    <>
      <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
        <ModalHeader toggle={closeModal}>
          {updateMode ? "Update Api Key" : "New Api Key"}
        </ModalHeader>
        <ModalBody>
          <div className="settings-modal-body">
            {tab === 1 && (
              <form id="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>{languageManager.translate("Name")}</label>
                  <input
                    ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate("enter a name ")}
                    required
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate("name of api key  is require")}
                  </small>
                </div>
                <div className="form-group">
                  <label>{languageManager.translate("Description")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate(
                      "enter a short description"
                    )}
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate("short description of api key")}
                  </small>
                </div>

                <div className="form-group">
                  <label>{languageManager.translate("Home Page")}</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder={languageManager.translate("enter a url")}
                    value={homePage}
                    onChange={e => {
                      setHomePage(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate("enter a url as home page")}
                  </small>
                </div>
                <div className="form-group">
                  <label>{languageManager.translate("Category")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={languageManager.translate("enter a category")}
                    required
                    value={category}
                    onChange={e => {
                      setCategory(e.target.value);
                    }}
                  />
                  <small className="form-text text-muted">
                    {languageManager.translate("category is require")}
                  </small>
                </div>
                <div className="up-uploader">
                  <span className="title">
                    {languageManager.translate("Icon")}
                  </span>
                  <span className="description">
                    {languageManager.translate("Set an icon for api key")}
                  </span>

                  <div className="files">
                    {image && (
                      <div className="files-uploaded">
                        <div
                          className="files-uploaded-icon"
                          onClick={removeImage}
                        >
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
              </form>
            )}
            {tab === 2 && (
              <>
                <div className="alert alert-success" role="alert">
                  {/* <h4 className="alert-heading">Success!</h4>
                  <hr /> */}
                  <p className="mb-0">
                    New api key was created successfully. you can copy them
                  </p>
                </div>
                <div className="form-group">
                  <label>{languageManager.translate("Api Key")}</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={result.clientId}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Copy</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>{languageManager.translate("Api Secret")}</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={result.clientSecret}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Copy</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={closeModal} className="btn btn-secondary">
            {languageManager.translate("CANCEL")}
          </button>
          {tab === 1 && (
            <button
              type="submit"
              className="btn btn-primary ajax-button"
              form="form"
              disabled={name.length > 0 && category.length > 0 ? false : true}
            >
              <CircleSpinner show={spinner} size="small" />
              <span> {updateMode ? "Update" : "Create"}</span>
            </button>
          )}
        </ModalFooter>
      </Modal>
      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={"image"}
        />
      )}
    </>
  );
};
export default UpsertApiKey;
