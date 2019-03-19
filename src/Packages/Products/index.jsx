import React, { useEffect, useState, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { useGlobalState, languageManager } from "./../../services";
import "./styles.scss";

import ContentTypes from "./FilterBox/contentTypes";
import Tree from "./FilterBox/categories";

const Products = props => {
  let baseFieldColumnsConfig = [
    {
      Header: "#",
      //show: false,
      width: 70,
      headerStyle: {
        display: "none"
      },
      Cell: props => {
        return (
          <div className="p-number">
            <div className="p-number-value">{props.index + 1}</div>
          </div>
        );
      }
    },
    {
      width: 100,
      Header: "Image",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "fields.thumbnail",
      Cell: props => (
        <div className="p-image">
          <img
            className="p-image-value"
            src={
              props.value
                ? props.value[languageManager.getCurrentLanguage().name]
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"
            }
            alt=""
          />
        </div>
      )
    },
    {
      Header: "Name",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "fields.name",
      Cell: props => (
        <div className="p-name">
          {props.value
            ? props.value[languageManager.getCurrentLanguage().name]
            : ""}
        </div>
      )
    },
    {
      Header: "Description",
      //show: false,
      headerStyle: {
        display: "none"
      },
      accessor: "fields.description",
      Cell: props => (
        <div className="p-description">
          {props.value
            ? props.value[languageManager.getCurrentLanguage().name]
            : ""}
        </div>
      )
    },

    {
      Header: "Actions",
      //show: false,
      headerStyle: {
        display: "none"
      },
      Cell: props => (
        <div className="p-actions">
          <button
            className="btn btn-light"
            onClick={() => handleEditRow(props)}
          >
            Edit
          </button>
          <button
            className="btn btn-light"
            onClick={() => handleDeleteRow(props)}
          >
            <i className="icon-bin" />
          </button>
        </div>
      )
    }
  ];

  // variables
  const [{ contents, categories, contentTypes }, dispatch] = useGlobalState();

  const tableBox = useRef(null);
  const { name: pageTitle, desc: pageDescription } = props.component;

  const [listContent, toggleListContent] = useState(true);
  const [leftContent, toggleLeftContent] = useState(false);

  const [selectedNode, setSelectedNode] = useState();
  const [selectedContentType, setSelectedContentType] = useState();
  const [columnsVisibility, toggleColumns] = useState(false);

  const [columns, setColumns] = useState(baseFieldColumnsConfig.slice());
  const [dataFilters, setFilters] = useState([]);

  // methods
  function initColumns() {
    if (columnsVisibility) {
      const cols = baseFieldColumnsConfig.map(col => {
        let item = col;
        item.headerStyle.display = "none";
        return item;
      });
      setColumns(cols);
      toggleColumns(true);
    }
  }

  function toggleFilterBox() {
    toggleLeftContent(prevState => !prevState);
  }
  function openNewItemBox(contentType) {
    props.history.push({
      pathname: "/addNew"
      // search: "?sort=name",
      //hash: "#the-hash",
      //params: { contentType, hasContentType }
    });
  }
  function makeTableFieldView(type, props) {
    switch (type) {
      case "string":
        return <div className="p-string">{props.value}</div>;
      default:
        return <div className="p-string">{props.value}</div>;
    }
  }

  function removeFilter(filter) {
    let f = dataFilters.filter(item => item.id !== filter.id);
    setFilters(f);
  }
  function handleContentTypeSelect(selected) {
    setSelectedContentType(selected);
    let f = [...dataFilters].filter(item => item.type !== "contentType");
    f.push(selected);
    setFilters(f);
  }
  function handleClickCategoryContent(selected) {
    setSelectedNode(selected);
    let f = [...dataFilters].filter(item => item.type !== "category");
    f.push(selected);
    setFilters(f);
    // if (selected.type === "category") {
    //   initColumns();
    // } else {
    //   if (selected.fields) {
    //     toggleColumns(true); // columns are visible or not

    //     const cols = columns.slice();
    //     let c_arr = cols.map(col => {
    //       let item = col;
    //       item.headerStyle.display = "flex";
    //       return item;
    //     });
    //     const fields = selected.fields;
    //     for (let i = 0; i < fields.length; i++) {
    //       const field = selected.fields[i];
    //       const obj = {
    //         Header: field.title,
    //         //show: false,
    //         headerStyle: {
    //           display: "block"
    //         },
    //         accessor: field.name,
    //         Cell: props => {
    //           return makeTableFieldView(field.type, props);
    //         }
    //       };
    //       c_arr.push(obj);
    //     }
    //     setColumns(c_arr);
    //   } else {
    //     initColumns();
    //   }
    // }
  }
  function handleDeleteRow(row) {
    const item = row.original;
    const d = [...contents].filter(c => c.sys.id !== item.sys.id);
    dispatch({
      type: "SET_CONTENTS",
      value: d
    });
  }
  function handleEditRow(row) {
    props.history.push({
      pathname: "/editItem",
      // search: "?sort=name",
      //hash: "#the-hash",
      params: { selectedItem: row.original }
    });
  }
  return (
    <>
      <div className="p-wrapper">
        <div className="p-header">
          <div className="p-header-left">
            <span className="p-header-title">{pageTitle}</span>
            <span className="p-header-description">{pageDescription}</span>
          </div>
          <div className="p-header-right">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="icon-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search in all data"
              />
            </div>
            {/* <button className="btn btn-primary">
              <i className="icon-folder" />
            </button>
            <button className="btn btn-primary">
              <i className="icon-list" />
            </button> */}
            <button className="btn btn-primary" onClick={toggleFilterBox}>
              <i className="icon-filter" />
            </button>
            <button className="btn btn-primary" onClick={openNewItemBox}>
              New Item
            </button>
          </div>
        </div>
        <div className="p-content">
          {listContent && (
            <>
              {leftContent && (
                <>
                  <div className="p-content-left animated fadeIn faster">
                    <div className="filterBox">
                      <div className="filter-header">Selected Filters</div>
                      <div className="filter-body">
                        <div className="selectedFilters">
                          {dataFilters.map(filter => (
                            <div key={filter.id} className="filterItem">
                              <span className="filterText">
                                {filter.title || filter.name}
                              </span>
                              <span
                                className="icon-cross icon"
                                onClick={() => removeFilter(filter)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ContentTypes
                      leftContent={leftContent}
                      data={contentTypes}
                      onContentTypeSelect={selected =>
                        handleContentTypeSelect(selected)
                      }
                    />
                    <Tree
                      leftContent={leftContent}
                      data={categories}
                      onCategorySelect={selected =>
                        handleClickCategoryContent(selected)
                      }
                    />
                  </div>
                </>
              )}
              <div className="p-content-right" ref={tableBox}>
                <div className="p-content-right-header">
                  <div className="p-content-header-title">All Data</div>
                </div>
                <div className="p-content-right-body">
                  <ReactTable
                    data={contents}
                    defaultPageSize={10}
                    minRows={0}
                    columns={columns}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    style={{
                      overflowX: "auto",
                      height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
