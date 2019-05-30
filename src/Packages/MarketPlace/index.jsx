import React, { useState, useEffect, useRef } from "react";
import { Header, SideBar, List } from "./components";
import { useTheme, useLayout, useLocale } from "../../hooks";
import themes from "../../themes";
import layouts from "../../Layouts";
import "./styles.scss";

const MarketPlace_Requests = props => {
  useTheme(themes[0]);
  useLayout(layouts[0]);
  const { setLocale } = useLocale();
  useEffect(() => {
    setLocale("en");
  }, []);
  return (
    <>
      <Header />
      <div className="mp-content">{props.routes && props.routes}</div>
    </>
  );
};

export default MarketPlace_Requests;
