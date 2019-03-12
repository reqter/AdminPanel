import React from "react";
import "./styles.scss";
const Quotes = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;

  return (
    <>
      <div className="c-wrapper">
        <div className="c-header">
          <div className="c-header-left">
            <span className="c-header-title">{pageTitle}</span>
            <span className="c-header-description">{pageDescription}</span>
          </div>
          <div className="c-header-right" />
        </div>
        <div className="c-content">
          <div className="c-content-left">
          </div>
          <div className="c-content-right" />
        </div>
      </div>
    </>
  );
};

export default Quotes;
