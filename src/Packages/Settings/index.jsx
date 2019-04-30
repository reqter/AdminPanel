import React, { useState, useEffect, useRef } from "react";

import "./styles.scss";
import { languageManager, useGlobalState, utility } from "../../services";
import { CircleSpinner } from "../../components";


const Settings = props => {
  const { name: pageTitle, desc: pageDescription } = props.component;

  const [{ userInfo }, dispatch] = useGlobalState();

  return (
    <>
      <div className="se-wrapper">
        <div className="se-header">
          <div className="se-header-left">
            <span className="se-header-title">{pageTitle}</span>
            <span className="se-header-description">{pageDescription}</span>
          </div>
          <div className="se-header-right" />
        </div>
        <div className="se-content" />
      </div>
    </>
  );
};

export default Settings;
