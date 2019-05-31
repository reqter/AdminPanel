import React, { useState, useEffect, useRef } from "react";
import { useTheme, useLayout, useLocale } from "../../../../hooks";
import "./styles.scss";

const MarketPlace_List = props => {
  const { appLocale } = useLocale();
  function handleBackClicked() {
    props.onBackClicked();
  }
  return (
    <div className="mp-products__detail">
      <div className="mp-products__detail__header">
        <button className="btn btn-light btn-sm" onClick={handleBackClicked}>
          Back
        </button>
      </div>
      <div className="mp-products__detail__content">
        <div className="detail">
          <div className="detail__left animated zoomIn faster">
            <img src="http://www.zakcars.com/images/zakcars1.jpg" alt="" />
          </div>
          <div className="detail__right">
            <h3 className=" animated fadeIn faster">Car Renting</h3>
            <span className=" animated fadeIn faster">
              lorem ipusm ha got many character to say hello guys , with no
              money attribute from anybody
            </span>
            <div className="detail__actions animated fadeIn faster">
              <button className="btn btn-primary">Buy</button>
              <button className="btn btn-light">Detail info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace_List;
