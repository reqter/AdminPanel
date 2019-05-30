import React, { useState, useEffect, useRef } from "react";
import { SideBar, List } from "./components";
import { useLocale } from "./../../hooks";
import "./styles.scss";

const MarketPlace_Products = props => {
  
  const [lang, setLang] = useState(true);
  const { setLocale } = useLocale();

  function handleClick() {
    setLocale(lang ? "fa" : "en");
    setLang(l => !l);
  }
  return (
    <>
      <button className="btn btn-primary" onClick={handleClick}>
        Change Language
      </button>
    </>
  );
};

export default MarketPlace_Products;
