import React from "react";
import languageManager from "./../languageManager";

const imgs = ["jpg", "jpeg", "gif", "bmp", "png"];
const videos = ["mp4", "3gp", "ogg", "wmv", "flv", "avi"];
const audios = ["wav", "mp3", "ogg"];

export default {
  applyeLangs(value) {
    const langs = languageManager.getAllLanguages();
    const data = {};
    for (const key in langs) {
      data[key] = value;
    }
    return data;
  },
  getAssetIconByURL(url, customClass) {
    const ext = url
      .split("/")
      .pop()
      .split(".")
      .pop();
    const cls = "unkownFileType " + customClass;

    if (!ext) {
      return (
        <div className={cls}>
          <i className="icon-file-text un-icon" />
          <span className="un-text">uknown</span>
        </div>
      );
    } else {
      if (imgs.indexOf(ext.toLowerCase()) !== -1)
        return <img src={url} alt="" />;
      else if (videos.indexOf(ext.toLowerCase()) !== -1)
        return <i className="icon-video" />;
      else if (audios.indexOf(ext.toLowerCase()) !== -1)
        return <i className="icon-audio" />;
      else
        return (
          <div className={cls}>
            <i className="icon-file-text un-icon" />
            <span className="un-text">.{ext}</span>
          </div>
        );
    }
  }
};
