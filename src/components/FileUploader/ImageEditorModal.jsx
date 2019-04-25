import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import ImageEditorRc from "./../ImageEditorRc";
import "./styles.scss";
const ImageEditorModal = props => {
  const cropper = useRef(null);
  const [imageURL, setImage] = useState(props.image);

  function rotateRight() {
    cropper.current.rotate(90);
  }
  function rotateLeft() {
    cropper.current.rotate(-90);
  }
  function reset() {
    cropper.current.reset();
  }
  function crop() {
    const croppedSize = cropper.current.getCropBoxData();
    const img = cropper.current
      .getCroppedCanvas({
        width: croppedSize.width,
        height: croppedSize.height,
      })
      .toDataURL("image/png");
    setImage(img);
  }
  function upload(e) {
    const croppedSize = cropper.current.getCropBoxData();
    cropper.current
      .getCroppedCanvas({
        width: croppedSize.width,
        height: croppedSize.width,
      })
      .toBlob(blob => {});
  }
  function closeModal() {
    props.onClose();
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
      <ModalBody>
        <div className="imageCropper">
          <div className="imageCropper-header">
            <button className="btn btn-sm btn-light" onClick={rotateRight}>
              Rotate Right
            </button>
            <button className="btn btn-sm btn-light" onClick={rotateLeft}>
              Rotate Left
            </button>
            <button className="btn btn-sm btn-light" onClick={reset}>
              Reset
            </button>
            <button className="btn btn-sm btn-light" onClick={crop}>
              Crop
            </button>
          </div>
          <div className="imageCropper-content">
            <ImageEditorRc
              ref={cropper}
              crossOrigin="true" // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
              src={imageURL}
              style={{ height: 400, width: "100%", flex: 1 }}
              // aspectRatio={16 / 9}
              className="imageEditorContainer"
              guides={false}
              rotatable={true}
              // aspectRatio={16 / 9}
              imageName="image name with extension to download"
              //  saveImage={saveImage} // it has to catch the returned data and do it whatever you want
              responseType="blob/base64"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="editor-actions">
          <div className="editor-actions-progress">
            <div class="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "56%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                56%
              </div>
            </div>
          </div>
          <div className="editor-actions-btns">
            <button className="btn btn-sm btn-secondary">Cancel</button>
            <button className="btn btn-sm btn-primary" onclick={upload}>
              Update
            </button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default ImageEditorModal;
