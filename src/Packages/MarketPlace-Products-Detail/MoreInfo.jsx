import React, { useState, useEffect } from "react";
import { utility } from "../../services";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const MoreInfo = props => {
  const html = "<div>Example HTML string</div>";

  function handleCloseMoreInfo() {
    if (props.onClose) {
      props.onClose();
    }
  }
  return (
    <div className="moreInfo">
      <spn
        className="icon-cross moreInfo__close"
        onClick={handleCloseMoreInfo}
      />
      <div className="moreInfo__content animated fadeIn faster">
        {/* <img
          src="https://www.setaswall.com/wp-content/uploads/2017/03/Green-Nature-Grass-Bokeh-Blurred-Wallpaper-1920x1200.jpg"
          alt=""
        /> */}
        {ReactHtmlParser(html)}
      </div>
    </div>
  );
};

export default MoreInfo;
