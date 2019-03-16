import React, { useState } from "react";
import "./styles.scss";

const MediaInput = props => {
  const { field } = props;
  const [images, setImages] = useState([]);
  function handleChange(event) {
    const obj = {
      id: Math.random(),
      url: URL.createObjectURL(event.target.files[0])
    };
    if (field.isList !== undefined && field.isList) {
      let imgs = [...images];
      imgs.push(obj);
      setImages(imgs);
    } else {
      let imgs = [...images];
      imgs[0] = obj;
      setImages(imgs);
    }
  }

  function removeImage(image) {
    const imgs = images.filter(img => img.id !== image.id);
    setImages(imgs);
  }
  return (
    <div className="up-uploader">
      <span className="title">{field.title}</span>
      <span className="description">{field.description}</span>

      <div className="files">
        {images.map(image => (
          <div className="files-uploaded">
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
