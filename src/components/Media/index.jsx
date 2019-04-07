import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";
import { AssetBrowser } from "./../../components";

const MediaInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [resetInputLocaly, setResetLocaly] = useState(true);
  const [files, setFiles] = useState(() => {
    if (formData[field.name]) {
      // what is the type of data ? "Array" , "String" , "Object"
      if (Array.isArray(formData[field.name])) {
        if (formData[field.name].length === 0) return [];
        if (field.isList === true) {
          if (field.isTranslate) {
            if (typeof formData[field.name][0] === "string") {
              return formData[field.name].map(item => ({
                id: Math.random(),
                url: { [currentLang]: item }
              }));
            } else {
              return formData[field.name].map(item => ({
                id: Math.random(),
                url: item
              }));
            }
          }
        } else {
          if (field.isTranslate) {
            if (typeof formData[field.name][0] === "string") {
              return [
                {
                  id: Math.random(),
                  url: { [currentLang]: formData[field.name][0] }
                }
              ];
            } else {
              return [
                {
                  id: Math.random(),
                  url: formData[field.name][0]
                }
              ];
            }
          }
        }

        // رندر رو باید شرطی کنم ترجمه داریم یا نه . اگه نداریم عکس از زبان جاری بخونه . چون داخل همه ابجکت ها وجود داره
      } else if (typeof formData[field.name] === "object")
        //بر تو رشته و ابجکت باید تو رندر اگه ترجمه نداشتیم بگم که زبان جاری رو نشون بده برای عکس ها .
        // ترجمه داشتیم هرکس زبان خودش نداشتیم زبان جاری
        return [{ id: Math.random(), url: formData[field.name] }];
      else if (typeof formData[field.name] === "string") {
        return [
          { id: Math.random(), url: { [currentLang]: formData[field.name] } }
        ];
      }
    }
    return [];
  });

  if (props.init && field.isRequired === true && !props.reset) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  useEffect(() => {
    // set form value update time
    if (formData[field.name]) {
      if (field.isList) {
        setFiles(formData[field.name]);
      } else {
        if (field.isTranslate) {
          let fs = [];
          fs.push({
            id: Math.random(),
            url: formData[field.name][currentLang],
            fileType: formData["fileType"]
          });
          setFiles(fs);
        } else {
          let fs = [];
          fs.push({ url: formData[field.name] });
          setFiles(fs);
        }
      }
    } else {
      if (files.length > 0) {
        setFiles([]);
      }
    }

    // cheking form reset
    if (props.reset && resetInputLocaly) {
      setResetLocaly(false);
      setFiles([]);
    }

    // send value to form after updateing
    if (field.isList !== undefined && field.isList) {
      let result;

      if (field.isTranslate === true) {
        result = files.map(item => item.url);
      } else result = files.map(item => item.url[currentLang]);

      if (field.isRequired === true) {
        if (result === undefined || result.length === 0)
          props.onChangeValue(field, result, false);
        else props.onChangeValue(field, result, true);
      }
    } else {
      let result;
      if (field.isTranslate === true) {
        result = files[0] ? files[0].url : undefined;
      } else result = files[0] ? files[0]["url"][currentLang] : undefined;
      if (field.isRequired === true) {
        if (result === undefined) props.onChangeValue(field, result, false);
        else props.onChangeValue(field, result, true);
      }
    }
  }, [props.reset, files]);

  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      const obj = {
        id: Math.random(),
        url: asset.url
      };
      if (field.isList !== undefined && field.isList) {
        let fs = [...files];
        fs.push(obj);
        setFiles(fs);
      } else {
        let fs = [];
        fs.push(obj);
        setFiles(fs);
      }
    }
  }

  function removeFile(f) {
    const fs = files.filter(file => file.id !== f.id);
    setFiles(fs);

    if (field.isRequired) {
      if (field.isList !== undefined && field.isList) {
        if (fs.length === 0) props.onChangeValue(field, fs, false);
        else props.onChangeValue(field, fs, true);
      } else {
        if (fs.length === 0) {
          let img;
          if (field.isTranslate) {
            img = utility.applyeLangs("");
            props.onChangeValue(field, img, false);
          } else props.onChangeValue(field, "", false);
        }
      }
    } else {
      props.onChangeValue(field, fs, true);
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
                <img
                  src={file.url[currentLang] ? file.url[currentLang] : file.url}
                  alt=""
                />
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
          mediaType={undefined}
        />
      )}
    </>
  );
};

export default MediaInput;
