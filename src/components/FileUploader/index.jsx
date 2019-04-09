import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";

const FileUploaderInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [resetInputLocaly, setResetLocaly] = useState(true);
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

  if (
    props.init &&
    field.isRequired !== undefined &&
    field.isRequired 
  ) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  useEffect(() => {
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
  }, [formData]);

  function handleChange(event) {
    let obj = {
      id: Math.random().toString(),
      url: URL.createObjectURL(event.target.files[0]),
      name: event.target.files[0].name,
      fileType: event.target.files[0].type
    };
    if (field.isList !== undefined && field.isList) {
      let fs = [...files];
      fs.push(obj);
      setFiles(fs);
      props.onChangeValue(field, fs, true);
    } else {
      let fs = [];
      fs.push(obj);
      setFiles(fs);

      let f, l;
      if (field.isTranslate) {
        l = utility.applyeLangs(fs[0].url);
        f = { ...fs[0], ...l };
      }
      props.onChangeValue(field, f, true);
    }
  }

  function removeFile(f) {
    const fs = files.filter(file => file.id !== f.id);
    setFiles(fs);

    if (field.isRequired) {
      if (field.isList !== undefined && field.isList) {
        if (fs.length === 0) props.onChangeValue(field.name, fs, false);
        else props.onChangeValue(field, fs, true);
      } else {
        if (fs.length === 0) {
          if (field.isTranslate) {
            props.onChangeValue(field, undefined, false);
          } else props.onChangeValue(field, undefined, false);
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
            <div className="updatedFileType">
              {file.fileType &&
                (file.fileType.toLowerCase().includes("image") ? (
                  <img src={file.url} alt="" />
                ) : file.fileType.toLowerCase().includes("video") ? (
                  <i className="icon-video" />
                ) : file.fileType.toLowerCase().includes("audio") ? (
                  <i className="icon-audio" />
                ) : file.fileType.toLowerCase().includes("pdf") ? (
                  <i className="icon-pdf" />
                ) : file.fileType.toLowerCase().includes("spreadsheet") ? (
                  <i className="icon-spreadsheet" />
                ) : (
                  <i className="icon-folder" />
                ))}
            </div>
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

export default FileUploaderInput;
