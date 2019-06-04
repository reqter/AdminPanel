import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Categories, ContentTypes } from "./components";
import { useLocale } from "./../../hooks";
import "./styles.scss";
import List from "./../MarketPlace-Products-List";
import Detail from "./../MarketPlace-Products-Detail";

const MarketPlace_Products = props => {
  const [lang, setLang] = useState(true);
  const { setLocale, appLocale, currentLang } = useLocale();

  const [isListView, toggleIsListView] = useState(true);
  const [filters, setFilters] = useState([]);

  const [searchInput, setSearchText] = useState();
  const [selectedCategory, setCategory] = useState();
  const [selectedContentType, setContentType] = useState();

  function handleClick() {
    setLocale(lang ? "fa" : "en");
    setLang(l => !l);
  }
  function handleProductClicked(data) {
    toggleIsListView(false);
  }
  function handleRequestButtonClicked() {
    props.history.push("/market/view/12");
  }
  function handleBackClicked() {
    props.history.goBack();
  }

  function handleSearchValueChanged(e) {
    setSearchText(e.target.value);
  }
  function handleSearchClicked(category) {
    //props.history.goBack();
    let f = filters.filter(item => item.type !== "text");
    f.push({ title: searchInput, type: "text" });
    setFilters(f);
  }
  function handleCategorySelect(category) {
    //props.history.goBack();
    let f = filters.filter(item => item.type !== "category");
    f.push({ title: category["name"][currentLang], type: "category" });
    setCategory(category);
    setFilters(f);
    props.history.push("/market/news/sport");
  }
  function handleContentTypeSelect(contentType) {
    props.history.goBack();
    let f = filters.filter(item => item.type !== "contentType");
    f.push({ title: contentType["title"][currentLang], type: "contentType" });
    setContentType(contentType);
    setFilters(f);
  }

  function removeFilter(filter) {
    const f = filters.filter(item => item.type !== filter.type);
    setFilters(f);
  }

  return (
    <div className="mp-page mp-products">
      <div className="mp-products__content">
        <div className="mp-products__left">
          <div className="mp-products__search">
            <div className="mp-products__inputWrapper">
              <input
                type="serach"
                className="input"
                placeholder={appLocale["PRODUCTS_SEARCH_PLACEHOLDER"]}
                value={searchInput}
                onChange={handleSearchValueChanged}
              />
            </div>
            <div
              className="mp-products__iconWrapper"
              onClick={handleSearchClicked}
            >
              <span className="icon-search icon" />
            </div>
          </div>
          <Categories onCatgorySelect={handleCategorySelect} />
          <ContentTypes onContentTypeSelect={handleContentTypeSelect} />
        </div>
        <div className="mp-products__right">
          <Switch>
            <Route
              path="/market/view/:link"
              exact
              render={props => (
                <div className="mp-products__detail">
                  <div className="mp-products__detail__header">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleBackClicked}
                    >
                      {appLocale["BACK"]}
                    </button>
                  </div>
                  <Detail {...props} onBackClicked={handleBackClicked} />
                </div>
              )}
            />
            <Route
              path="/market"
              render={props => (
                <div className="mp-products__list">
                  <div className="mp-products__list__header">
                    <div className="mp-products__list__header__filters">
                      {filters && filters.length > 0 ? (
                        filters.map(f => (
                          <div className="filters" key={f.type}>
                            <span className="filters__title">{f.title}</span>
                            <i
                              className="icon-cross filters__icon"
                              onClick={() => removeFilter(f)}
                            />
                          </div>
                        ))
                      ) : (
                        <span>{appLocale["PRODUCTS_FILTERS_EMPTY"]}</span>
                      )}
                    </div>
                    <div>Latest</div>
                  </div>
                  <List
                    {...props}
                    onListItemClicked={handleProductClicked}
                    onRequestButtonClicked={handleRequestButtonClicked}
                  />
                </div>
              )}
            />
          </Switch>
          {/* <Redirect to="/products" /> */}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace_Products;
