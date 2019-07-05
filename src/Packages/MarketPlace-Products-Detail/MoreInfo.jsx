import React, { useState, useEffect } from "react";
import { utility } from "../../services";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { RichText } from "./../../components";
import { useLocale } from "./../../hooks";

const MoreInfo = props => {
  const { currentLang } = useLocale();
  const html = props.longDesc ? props.longDesc[currentLang] : "<div></div>";

  function handleCloseMoreInfo() {
    if (props.onClose) {
      props.onClose();
    }
  }
  return (
    <div className="moreInfo" onClick={handleCloseMoreInfo}>
      <spn
        className="icon-cross moreInfo__close"
        
      />
      <div
        className="moreInfo__content animated fadeIn faster"
        onClick={e => e.stopPropagation()}
      >
        {/* <img
          src="https://www.setaswall.com/wp-content/uploads/2017/03/Green-Nature-Grass-Bokeh-Blurred-Wallpaper-1920x1200.jpg"
          alt=""
        /> */}
        {/* {ReactHtmlParser(html)} */}
        <RichText
          viewMode={true}
          field={{ name: "longDesc" }}
          formData={{ longDesc: html }}
          init={() => {}}
          onChangeValue={() => {}}
        />
      </div>
    </div>
  );
};

export default MoreInfo;
