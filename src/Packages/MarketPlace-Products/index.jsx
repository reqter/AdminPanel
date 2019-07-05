import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Categories, ContentTypes } from "./components";
import { useLocale } from "./../../hooks";
import { useGlobalState } from "./../../services";
import {
  getRequests_catgeories_list,
  filterRequestsByCategory,
  getRequestDetail,
} from "./../../Api/content-delivery-api";
import "./styles.scss";
import List from "./../MarketPlace-Products-List";
import Detail from "./../MarketPlace-Products-Detail";

const MarketPlace_Products = props => {
  const [{ mp_categories, spinner }, dispatch] = useGlobalState();
  const { appLocale, currentLang } = useLocale();

  const [filters, setFilters] = useState([]);

  const [searchInput, setSearchText] = useState();
  const [selectedCategory, setCategory] = useState();
  const [selectedContentType, setContentType] = useState();
  useEffect(() => {
    if (!spinner) {
      dispatch({
        type: "TOGGLE_SPINNER",
        value: true,
      });
      const categoryId = props.match.params.categoryId;
      if (categoryId !== "view") {
        if (categoryId === undefined || categoryId.length === 0) {
          _getRequests_catgeories_list(currentLang);
          if (selectedCategory) {
            removeFilter({ type: "category" });
          }
        } else {
          _filterRequestsByCategory(currentLang, categoryId, true);
        }
      } else {
        const link = props.location.pathname.split("/").pop();
        _getRequestDetail(currentLang, link, true);
        if (categoryId === undefined || categoryId.length === 0) {
          if (selectedCategory) {
            removeFilter({ type: "category" });
          }
        }
      }
    }
  }, [currentLang]);
  useEffect(() => {
    dispatch({
      type: "TOGGLE_SPINNER",
      value: true,
    });
    const categoryId = props.match.params.categoryId;
    if (categoryId !== "view") {
      if (categoryId === undefined || categoryId.length === 0) {
        _getRequests_catgeories_list(currentLang);
        if (selectedCategory) {
          removeFilter({ type: "category" });
        }
      } else {
        _filterRequestsByCategory(
          currentLang,
          categoryId,
          !mp_categories || mp_categories.length === 0 ? true : false
        );
      }
    } else {
      const link = props.location.pathname.split("/").pop();
      _getRequestDetail(
        currentLang,
        link,
        !mp_categories || mp_categories.length === 0 ? true : false
      );
      if (categoryId === undefined || categoryId.length === 0) {
        if (selectedCategory) {
          removeFilter({ type: "category" });
        }
      }
    }
  }, [props.match.params.categoryId]);

  function _getRequests_catgeories_list(lang) {
    getRequests_catgeories_list()
      .onOk(result => {
        dispatch({
          type: "SET_REQUESTS_CATEGORIES",
          value: result,
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .onRequestError(result => {})
      .unKnownError(result => {})
      .call(lang);
  }
  function _filterRequestsByCategory(lang, link, loadCategory) {
    filterRequestsByCategory()
      .onOk(result => {
        dispatch({
          type: "SET_REQUEST_LIST",
          value: result,
        });
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .onRequestError(result => {})
      .unKnownError(result => {})
      .call(lang, link, loadCategory);
  }

  function _getRequestDetail(lang, link, loadCategory) {
    getRequestDetail()
      .onOk(result => {
        if (result.data.request) {
          const r = result.data.request;
          if (r.attachments && r.attachments.length > 0) {
            const att = r.attachments.map(a => {
              a.id = Math.random();
              return a;
            });
            result.data.request.attachments = att;
          }
          dispatch({
            type: "SET_REQUEST_DETAIL",
            value: result,
          });
        }
      })
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .onRequestError(result => {})
      .unKnownError(result => {})
      .call(lang, link, loadCategory);
  }

  function handleBackClicked() {
    props.history.goBack();
  }

  function handleSearchValueChanged(e) {
    setSearchText(e.target.value);
  }
  function handleSearchClicked(category) {
    let f = filters.filter(item => item.type !== "text");
    f.push({ title: searchInput, type: "text" });
    setFilters(f);
  }
  let n = "";
  function getPathFromCategories(data, parentId) {
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      if (c._id === parentId) {
        n = "/" + c.name[currentLang] + n;
        if (c.parentId) return getPathFromCategories(mp_categories, c.parentId);
        else return n;
      }
      if (c.items) return getPathFromCategories(c.items, parentId);
    }
  }
  function handleCategorySelect(category) {
    //props.history.goBack();
    let f = filters.filter(item => item.type !== "category");
    f.push({ title: category["name"], type: "category" });
    setCategory(category);
    setFilters(f);

    // const treePath = getPathFromCategories(mp_categories, category.parentId);
  }
  function handleContentTypeSelect(contentType) {
    let f = filters.filter(item => item.type !== "contentType");
    f.push({ title: contentType["title"][currentLang], type: "contentType" });
    setContentType(contentType);
    setFilters(f);
  }

  function removeFilter(filter) {
    const f = filters.filter(item => item.type !== filter.type);
    setFilters(f);
    if (filter.type === "category") {
      setCategory();
      props.history.push("/market");
    }
    if (filter.type === "contentType") setContentType();
    if (filter.type === "text") setSearchText();
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
          <Categories
            onCatgorySelect={handleCategorySelect}
            filters={filters}
          />
          {/* <ContentTypes
            onContentTypeSelect={handleContentTypeSelect}
            filters={filters}
          /> */}
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
              path="/market/:categoryId?"
              render={props => (
                <div className="mp-products__list">
                  <div className="mp-products__list__header">
                    <div className="mp-products__list__header__filters">
                      {filters && filters.length > 0 ? (
                        filters.map(f => (
                          <div className="filters" key={f.type}>
                            <span className="filters__title">
                              {f.title[currentLang]}
                            </span>
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
                    {/* <div>Latest</div> */}
                  </div>
                  <List {...props} />
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
