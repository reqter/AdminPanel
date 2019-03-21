import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../../../services";

const MediaInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.init && field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
    if (formData[field.name]) {
      if (field.isList) {
        setImages(formData[field.name]);
      } else {
        if (field.isTranslate) {
          let imgs = [];
          imgs.push({ url: formData[field.name][currentLang] });
          setImages(imgs);
        } else {
          let imgs = [];
          imgs.push({ url: formData[field.name][currentLang] });
          setImages(imgs);
        }
      }
    }
  }, []);

  function handleChange(event) {
    const obj = {
      id: Math.random(),
      url: URL.createObjectURL(event.target.files[0])
    };
    if (field.isList !== undefined && field.isList) {
      let imgs = [...images];
      imgs.push(obj);
      setImages(imgs);
      props.onChangeValue(field.name, imgs, true);
    } else {
      let imgs = [...images];
      imgs[0] = obj;
      setImages(imgs);

      let img;
      if (field.isTranslate) {
        img = utility.applyeLangs(imgs[0].url);
      }
      props.onChangeValue(field.name, img, true);
    }
  }

  function removeImage(image) {
    const imgs = images.filter(img => img.id !== image.id);
    setImages(imgs);

    if (field.isRequired) {
      if (field.isList !== undefined && field.isList) {
        if (imgs.length === 0) props.onChangeValue(field.name, imgs, false);
        else props.onChangeValue(field.name, imgs, true);
      } else {
        if (imgs.length === 0) {
          let img;
          if (field.isTranslate) {
            img = utility.applyeLangs("");
            props.onChangeValue(field.name, img, false);
          } else props.onChangeValue(field.name, "", false);
        }
      }
    } else {
      props.onChangeValue(field.name, imgs, true);
    }
  }
  return (
    <div className="up-uploader">
      <span className="title">{field.title[currentLang]}</span>
      <span className="description">{field.description[currentLang]}</span>

      <div className="files">
        {images.map(image => (
          <div key={image.id} className="files-uploaded">
            <div
              className="files-uploaded-icon"
              onClick={() => removeImage(image)}
            >
              <i className="icon-bin" />
            </div>
            <img src={image.url} alt="" />
          </div>
        ))}
        <div className="files-input">
          <input type="file" className="btn" onChange={handleChange} />
          <i className="icon-camera" />
        </div>
      </div>
    </div>
  );
};

export default MediaInput;
