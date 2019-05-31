import React, { useState, useEffect, useRef } from "react";

export default function ListItem(props) {
  const { data } = props;
  function handleClick() {
      props.onItemClicked(data);
  }
  return (
    <div className="product" onClick={handleClick}>
      <div className="product__thumb">
        <img src={data.img} alt="" />
      </div>
      <div className="product__detail">
        <div className="product__name">Car Renting</div>
        <div className="product__action">
          <button className="btn btn-secondary btn-sm">
            <i className="icon-quote" />
          </button>
        </div>
      </div>
    </div>
  );
}
