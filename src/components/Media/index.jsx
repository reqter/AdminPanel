import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";
import { AssetBrowser } from "./../../components";

const MediaInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [files, setFiles] = useState(() => {
    if (formData[field.name]) {
      if (field.isList) {
        return formData[field.name];
      } else {
        if (field.isTranslate) {
          let fs = [];
          fs.push({ url: formData[field.name][currentLang] });
          return fs;
        } else {
          let fs = [];
          fs.push({ url: formData[field.name][currentLang] });
          return fs;
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (
      props.init &&
      field.isRequired !== undefined &&
      field.isRequired &&
      !props.reset
    ) {
      if (formData[field.name] === undefined) props.init(field.name);
    }

    if (props.reset) {
      setFiles([]);
    }
  }, [props.reset]);

  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      const obj = {
        id: Math.random(),
        url: asset.url,
        name: asset.name,
        fileType: asset.fileType
      };
      if (field.isList !== undefined && field.isList) {
        let fs = [...files];
        fs.push(obj);
        setFiles(fs);
        props.onChangeValue(field.name, fs, true);
      } else {
        let fs = [...files];
        fs[0] = obj;
        setFiles(fs);
        props.onChangeValue(field.name, fs[0], true);
      }
    }
  }

  function removeFile(f) {
    const fs = files.filter(file => file.id !== f.id);
    setFiles(fs);

    if (field.isRequired) {
      if (field.isList !== undefined && field.isList) {
        if (fs.length === 0) props.onChangeValue(field.name, fs, false);
        else props.onChangeValue(field.name, fs, true);
      } else {
        if (fs.length === 0) {
          let img;
          if (field.isTranslate) {
            img = utility.applyeLangs("");
            props.onChangeValue(field.name, img, false);
          } else props.onChangeValue(field.name, "", false);
        }
      }
    } else {
      props.onChangeValue(field.name, fs, true);
    }
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  return (
    <>
      <div className="up-uploader">
        <span className="title">{field.title[currentLang]}</span>
        <span className="description">{field.description[currentLang]}</span>

        <div className="files">
          {files.map(file => (
            <div key={file.id} className="files-uploaded">
              <div
                className="files-uploaded-icon"
                onClick={() => removeFile(file)}
              >
                <i className="icon-bin" />
              </div>
              {field.mediaType === "file" ? (
                <div className="updatedFileType">
                  <i className="icon-file-plus-o" />
                </div>
              ) : field.mediaType === "image" ? (
                <img src={file.url[currentLang]} alt="" />
              ) : (
                <div className="updatedFileType">
                  <i className="icon-file-plus-o" />
                </div>
              )}
            </div>
          ))}
          <div className="files-input" onClick={openAssetBrowser}>
            {field.mediaType === "file" ? (
              <i className="icon-file-plus-o" />
            ) : field.mediaType === "image" ? (
              <i className="icon-camera" />
            ) : (
              <i className="icon-file-plus-o" />
            )}
          </div>
        </div>
      </div>
      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={field.mediaType}
        />
      )}
    </>
  );
};

export default MediaInput;
