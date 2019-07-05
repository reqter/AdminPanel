import React, { useState, useEffect } from "react";
import { utility } from "../../services";
import { useLocale } from "./../../hooks";

const ListItem = props => {
  const { currentLang } = useLocale();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (props.selectedFile) {
      if (props.selectedFile.id === props.file.id) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else setActive(false);
  }, [props.selectedFile]);

  function preview() {
    props.onPreview(props.file);
  }
  function getFileByType() {
    return props.file ? (
      utility.getRequestMediaThumbComponentByURL(
        props.file[currentLang],
        "unkownFile"
      )
    ) : (
      <div />
    );
  }

  return (
    <div className="attItems">
      <div
        className={"attItems__preview " + (isActive ? "--active" : "")}
        onClick={preview}
      >
        {getFileByType()}
      </div>
      {isActive && (
        <div className="attItems__selected">
          <i className="icon-checkmark" />
        </div>
      )}
      {/* <div className="listItem-name">{props.file.name || "File name"}</div> */}
    </div>
  );
};

export default ListItem;
