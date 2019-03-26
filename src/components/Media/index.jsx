import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";

const MediaInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (props.init && field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
    if (formData[field.name]) {
      if (field.isList) {
        setFiles(formData[field.name]);
      } else {
        if (field.isTranslate) {
          let fs = [];
          fs.push({ url: formData[field.name][currentLang] });
          setFiles(fs);
        } else {
          let fs = [];
          fs.push({ url: formData[field.name][currentLang] });
          setFiles(fs);
        }
      }
    }
  }, []);

  function handleChange(event) {
    const obj = {
      id: Math.random(),
      url: URL.createObjectURL(event.target.files[0]),
      name: event.target.files[0].name,
      type: event.target.files[0].type
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

      let f;
      if (field.isTranslate) {
        f = utility.applyeLangs(fs[0].url);
      }
      props.onChangeValue(field.name, f, true);
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
  return (
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
              <img src={file.url} alt="" />
            ) : (
              <div className="updatedFileType">
                <i className="icon-file-plus-o" />
              </div>
            )}
          </div>
        ))}
        <div className="files-input">
          <input type="file" className="btn" onChange={handleChange} />
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
  );
};

export default MediaInput;
