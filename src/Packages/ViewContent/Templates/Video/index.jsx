import React from "react";
import { languageManager } from "../../../../services";
import "./styles.scss";
const currentLang = languageManager.getCurrentLanguage().name;

const Video = props => {
  const { item } = props;
  return (
    <div className="view-video">
      <video id="background-video"  controls>
        <source
          src={require("./../../../../assets/Rec0003.mp4")}
          type="video/mp4"
        />
      </video>
    </div>
  );
};
export default Video;
