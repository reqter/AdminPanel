import React, { useState, useEffect, useRef } from "react";
import "cropperjs/dist/cropper.css";
import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import ImageEditorModal from "./ImageEditorModal";
import { uploadAssetFile } from "./../../Api/asset-api";
import SVGIcon from "./svg";
import CircleSpinner from "./../CircleSpinner";
import AssetFile from "./../AssetFile";

const FileUploaderInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const dropRef = useRef(null);

  const [{}, dispatch] = useGlobalState();
  const [editorModal, toggleEditorModal] = useState(false);
  const { field, formData } = props;
  const [droppableBox, toggleDroppableBox] = useState(true);
  const [dropZoneViewBox, toggleDropZoneViewBox] = useState(false);
  const [dropZoneFile, setDropZoneFile] = useState({});

  const [isUploading, toggleIsUploading] = useState(false);
  const [progressPercentage, setPercentage] = useState("0");
  const [selectedFile, setSelectedFile] = useState();

  const [files, setFiles] = useState([]);

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
      setSelectedFile(file);
      toggleIsUploading(true);
      uploadFile(file);
      // if (field.mediaType===undefined || field.mediaType.length===0 || field.mediaType[0]==="all") {
      //   setSelectedFile(file);
      //   toggleIsUploading(true);
      //   uploadFile(file);
      // }else {

      // }
      // if (file.type.includes("image")) {
      //  // uploadAvatar(file);
      // }
      e.dataTransfer.clearData();
    }
  }

  function handleChange(event) {
    if (!isUploading) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        setSelectedFile(file);
        toggleIsUploading(true);
        uploadFile(file);
        // if (file.type.includes("image")) {
        //   toggleEditorModal(true);
        // } else {
        //   toggleIsUploading(true);
        //   uploadFile(file);
        // }
      }
    }
  }
  function uploadFile(file) {
    uploadAssetFile()
      .onOk(result => {
        const { file } = result;
        addToList(file);
        toggleIsUploading(false);
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
      .onProgress(result => {
        setPercentage(result);
      })
      .call(file);
  }
  function removeFile(f) {
    if (field.isList === true) {
      const fs = files.filter(file => file.id !== f.id);
      setFiles(fs);
    } else {
      setFiles([]);
      setDropZoneFile();
      toggleDroppableBox(true);
      toggleDropZoneViewBox(false);
    }
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
  }, [files]);

  function addToList(file) {
    const obj = {
      id: Math.random(),
      url: {
        [currentLang]: process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL + file.url,
      },
    };
    const newFiles = [...files, obj];
    setFiles(newFiles);

    if (field.isList !== undefined && field.isList) {
      const newFiles = [...files, obj];
      setFiles(newFiles);
    } else {
      let fs = [];
      fs[0] = obj;
      setFiles(fs);

      setDropZoneFile(obj);
      toggleDroppableBox(false);
      toggleDropZoneViewBox(true);
    }
  }
  function onCloseEditor(result) {
    toggleEditorModal(false);
    if (result) {
      addToList(result);
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
              {utility.getAssetIconByURL(
                dropZoneFile["url"][currentLang],
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
              Uploading {progressPercentage + "%"}
            </div>
          )}
          {dropZoneViewBox &&
            (field.isList === undefined || field.isList === false) && (
              <button
                type="button"
                className="btn btn-sm btn-secondary btn-remove"
                onClick={removeFile}
              >
                <i className="icon-bin" />
              </button>
            )}
        </div>
      </div>
      {field.isList === true && (
        <div className="isList-files">
          {files.map(file => (
            <div className="isListItem">
              {utility.getAssetIconByURL(file["url"][currentLang])}
              <div
                className="isListItem-remove"
                onClick={() => removeFile(file)}
              >
                <i className="icon-bin" />
              </div>
            </div>
          ))}
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
