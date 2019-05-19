import React from "react";
import { languageManager } from "../../../../services";
import "./styles.scss";
const currentLang = languageManager.getCurrentLanguage().name;

const Gallery = props => {
  const { item } = props;
  return (
    <div className="view-gallery">
      <img src="https://www.wonderplugin.com/videos/demo-image0.jpg" alt="" />
    </div>
  );
};
export default Gallery;
