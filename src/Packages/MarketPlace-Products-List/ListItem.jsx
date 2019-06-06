import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import { useLocale } from "./../../hooks";

function ListItem(props) {
  const { match, location, history, data } = props;
  const { appLocale, currentLang } = useLocale();
  function handleClick() {
    // if (props.onItemClicked) props.onItemClicked(data);
    history.push("/market/view/" + data.sys.link);
  }
  function handleRequestClicked(e) {
    e.stopPropagation();
    //if (props.onRequestButtonClicked) props.onRequestButtonClicked(data);
    history.push("/newRequest/" + (data.sys ? data.sys.link : ""));
  }
  return (
    <div className="product" onClick={handleClick}>
      <div className="product__thumb">
        {data.thumbnail && data.thumbnail.length > 0 && (
          <img src={data.thumbnail[0][currentLang]} alt="" />
        )}
      </div>
      <div className="product__detail">
        <div className="product__name">
          {data &&
            data.title &&
            data.title[currentLang] &&
            data.title[currentLang]}
        </div>
        <div className="product__action">
          <button
            className="btn btn-warning btn-sm"
            onClick={handleRequestClicked}
            title={appLocale["PRODUCT_LIST_ITEN_ORDER_BTN_TITLE"]}
          >
            <i className="icon-order icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(ListItem);
