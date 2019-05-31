import React, { useState, useEffect, useRef } from "react";
import { Categories, ContentTypes, List, ListDetail } from "./components";
import { useLocale } from "./../../hooks";
import "./styles.scss";

const MarketPlace_Products = props => {
  const [lang, setLang] = useState(true);
  const { setLocale, appLocale } = useLocale();

  const [isListView, toggleIsListView] = useState(true);
  function handleClick() {
    setLocale(lang ? "fa" : "en");
    setLang(l => !l);
  }
  function handleProductClicked(data) {
    toggleIsListView(false);
  }
  function handleBackClicked() {
    toggleIsListView(true);
  }
  return (
    <div className="mp-page mp-products">
      <div className="mp-products__left">
        <div className="mp-products__search">
          <div className="mp-products__inputWrapper">
            <input
              type="serach"
              className="input"
              placeholder={appLocale["PRODUCTS_SEARCH_PLACEHOLDER"]}
            />
          </div>
          <div className="mp-products__iconWrapper">
            <span className="icon-search icon" />
          </div>
        </div>
        <Categories />
        <ContentTypes />
      </div>
      <div className="mp-products__right">
        {isListView ? (
          <List onListItemClicked={handleProductClicked} />
        ) : (
          <ListDetail onBackClicked={handleBackClicked} />
        )}
      </div>
    </div>
  );
};

export default MarketPlace_Products;
