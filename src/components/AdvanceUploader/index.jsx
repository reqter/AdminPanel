import React, { useState, useEffect, useRef } from "react";
import "cropperjs/dist/cropper.css";
import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import ImageEditorModal from "./ImageEditorModal";
import { uploadAssetFile, addAsset } from "./../../Api/asset-api";
import SVGIcon from "./svg";
import CircleSpinner from "./../CircleSpinner";
import ListItem from "./ListItem";

const FileUploaderInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const dropRef = useRef(null);

  const [{ spaceInfo }, dispatch] = useGlobalState();
  const [editorModal, toggleEditorModal] = useState(false);
  const { field, formData } = props;
  const [droppableBox, toggleDroppableBox] = useState(true);
  const [dropZoneViewBox, toggleDropZoneViewBox] = useState(false);
  const [dropZoneFile, setDropZoneFile] = useState({});

  const [isUploading, toggleIsUploading] = useState(false);
  const [isListSpinner, toggleIsListSpinner] = useState({});
  const [singleFilePercentage, setSinglePercentage] = useState("0");
  const [progressPercentage, setPercentage] = useState({});
  const [selectedFile, setSelectedFile] = useState();

  const [files, setFiles] = useState([{}]);
  const [uploadedList, setUploadedList] = useState([]);

  useEffect(() => {
    if (formData[field.name] && formData[field.name].length > 0) {
      if (field.isRequired === true) props.init(field.name, true);

      const d = formData[field.name].map(item => {
        return {
          id: Math.random(),
          url: item,
        };
      });
      setFiles(d);
    } else {
      if (field.isRequired === true) props.init(field.name, false);
      if (files.length > 0) setFiles([]);
    }
  }, [formData]);

  useEffect(() => {
    if (dropRef.current) {
      let div = dropRef.current;

      div.addEventListener("dragenter", handleDragIn);
      div.addEventListener("dragleave", handleDragOut);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);
    }
  }, []);

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    //if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
    //  setDragging(true);
  }

  function handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    //  setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    // setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      checkFileByType(file);
      e.dataTransfer.clearData();
    }
  }

  function handleChange(event) {
    if (!isUploading) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        checkFileByType(file);
      }
    }
  }

  function checkFileByType(file) {
    if (
      !field.mediaType ||
      field.mediaType.length === 0 ||
      (field.mediaType.length === 1 && field.mediaType[0] === "all")
    ) {
      if (field.isList === true) preUploadIsListFile(file);
      else preUploadSingleFile(file);
    } else {
      const type = file.type.split("/")[0];
      if (field.mediaType.indexOf(type) !== -1) {
        if (field.isList === true) preUploadIsListFile(file);
        else preUploadSingleFile(file);
      } else {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate(
              `You just choose ${field.mediaType.join(" ")}`
            ),
          },
        });
      }
    }
  }
  function uploadFile(localFile) {
    uploadAssetFile()
      .onOk(result => {
        const { file } = result;
        const obj = {
          name: file.originalname,
          title: file.originalname,
          description: "",
          url: {
            [currentLang]:
              process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL + file.url,
          },
          fileType: file.mimetype,
        };
        addAsset()
          .onOk(result => {
            completeSingleUploading(localFile, file);
          })
          .onServerError(result => {
            toggleIsUploading(false);
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
            toggleIsUploading(false);
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
            toggleIsUploading(false);
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
            toggleIsUploading(false);
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "UPSERT_ASSET_ADD_NOT_FOUND"
                ),
              },
            });
          })
          .call(spaceInfo.id, obj);
      })
      .onServerError(result => {
        toggleIsUploading(false);
      })
      .onBadRequest(result => {
        toggleIsUploading(false);
      })
      .unAuthorized(result => {
        toggleIsUploading(false);
      })
      .onRequestError(result => {
        toggleIsUploading(false);
      })
      .unKnownError(result => {
        toggleIsUploading(false);
      })
      .onProgress(result => {
        setSinglePercentage(result);
      })
      .call(localFile);
  }
  function removeFile(f) {
    setUploadedList([]);
    toggleDropZoneViewBox(false);
    toggleDroppableBox(true);
    setDropZoneFile();
  }
  useEffect(() => {
    // send value to form after updateing
    let result = files.map(item => item.url);
    if (result.length === 0) result = [];
    if (field.isRequired === true) {
      if (result === undefined || result.length === 0)
        props.onChangeValue(field, result, false);
      else props.onChangeValue(field, result, true);
    } else {
      props.onChangeValue(field, result, true);
    }
    if (result.length === 0) {
      toggleDropZoneViewBox(false);
      toggleDroppableBox(true);
    }
  }, [uploadedList]);

  function preUploadIsListFile(file) {
    const obj = { id: Math.random(), data: file };
    setFiles(files => [...files, obj]);
  }

  function preUploadSingleFile(file) {
    toggleIsUploading(true);
    uploadFile(file);
  }
  function completeSingleUploading(localFile, uploadedFile) {
    toggleIsUploading(false);
    const obj = {
      id: Math.random(),
      url: {
        [currentLang]:
          process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL + uploadedFile.url,
      },
    };
    let fs = [];
    fs[0] = obj;
    setUploadedList(fs);

    setDropZoneFile({ data: localFile });
    toggleDroppableBox(false);
    toggleDropZoneViewBox(true);
  }

  // is list functions
  function handleUploadEnd(file) {
    file.url = {
      [currentLang]: process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL + file.url,
    };
    setUploadedList(list => [...list, file]);
  }

  function handlePreview(file) {
    setDropZoneFile(file);
    toggleDroppableBox(false);
    toggleDropZoneViewBox(true);
  }
  function handleRemove(file) {
    const f = uploadedList.filter(item => item.id !== file.id);
    setUploadedList(f);
    const ff = files.filter(item => item.id !== file.id);
    setFiles(ff);
  }
  function handleCancelUploading(file) {}

  function onCloseEditor(result) {
    toggleEditorModal(false);
    if (result) {
      //  addToList(result);
    }
  }
  return (
    <>
      <div className="ad-uploader">
        <span className="title">{field.title[currentLang]}</span>
        <span className="description">{field.description[currentLang]}</span>
        <div className="dropBox" ref={dropRef}>
          {dropZoneViewBox && (
            <div className="dropbox-uploadedFile">
              {utility.getMediaLocalFilePreview(
                dropZoneFile.data,
                "unknowIcon"
              )}
            </div>
          )}

          {droppableBox && (
            <div className="dropbox-content">
              <SVGIcon />
              <span>
                Drag and drop a file hear or{" "}
                <div className="dropbox-browser">
                  <a href="">open browser...</a>
                  <input type="file" onChange={handleChange} />
                </div>
              </span>
            </div>
          )}
          {isUploading && (
            <div className="dropbox-spinner">
              <CircleSpinner show={isUploading} size="large" />
              Uploading {singleFilePercentage + "%"}
            </div>
          )}
          {dropZoneViewBox && (!field.isList || field.isList === false) && (
            <button
              type="button"
              className="btn btn-sm btn-secondary btn-remove"
              onClick={() => removeFile(dropZoneFile)}
            >
              <i className="icon-bin" />
            </button>
          )}
        </div>
      </div>
      {field.isList === true && (
        <div className="isList-files">
          {files.map(file => (
            <ListItem
              key={file.id}
              file={file}
              selectedFile={dropZoneFile}
              onUploadEnded={handleUploadEnd}
              onPreview={handlePreview}
              onRemove={handleRemove}
              onCancelUploading={handleCancelUploading}
            />
          ))}
          <div className="isListItem-new">
            <i className="icon-plus" />
            <input type="file" onChange={handleChange} />
          </div>
        </div>
      )}
      {editorModal && (
        <ImageEditorModal
          image={selectedFile}
          isOpen={editorModal}
          onClose={onCloseEditor}
        />
      )}
    </>
  );
};

export default FileUploaderInput;
