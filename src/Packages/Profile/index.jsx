import React, { useState, useEffect, useRef } from "react";

import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";

const Categories = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;
  const currentLang = languageManager.getCurrentLanguage().name;

  useEffect(() => {}, []);

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
        <div className="c-content" />
      </div>
    </>
  );
};

export default Categories;
