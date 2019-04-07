import React, { useEffect, useState, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { useGlobalState, languageManager } from "./../../services";
import {
  getContents,
  filterContents,
  deleteContent
} from "./../../Api/content-api";
import "./styles.scss";

import ContentTypes from "./FilterBox/contentTypes";
import Tree from "./FilterBox/categories";
import Status from "./FilterBox/status";

const Products = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  let baseFieldColumnsConfig = [
    {
      Header: "#",
      //show: false,
      width: 70,
      headerStyle: {
        display: "block"
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
      Header: () => <div className="p-header-td">Image</div>,
      //show: false,
      headerStyle: {
        display: "block"
      },
      accessor: "fields.thumbnail",
      Cell: props => {
        return (
          <div className="p-image">
            <img
              className="p-image-value"
              src={
                props.value
                  ? props.value[0][currentLang]
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"
              }
              alt=""
            />
          </div>
        );
      }
    },
    {
      Header: () => <div className="p-header-td">Name</div>,
      //show: false,
      headerStyle: {
        display: "block"
      },
      accessor: "fields",
      Cell: props => (
        <div className="p-name">
          <span>{props.value["name"][currentLang]}</span>
          <span>{props.value["shortDesc"][currentLang]}</span>
        </div>
      )
    },
    {
      Header: () => <div className="p-header-td">Issuer</div>,
      //show: false,
      headerStyle: {
        display: "block"
      },
      accessor: "sys",
      Cell: props => (
        <div className="p-issuer">
          <span>{props.value.issuer.fullName}</span>
          <span>{props.value.issueDate}</span>
        </div>
      )
    },
    {
      Header: () => <div className="p-header-td">Type</div>,
      //show: false,
      headerStyle: {
        display: "block"
      },
      accessor: "contentType",
      Cell: props => {
        return (
          <div className="p-contentType">
            <span className="badge badge-primary">
              {props.value.title[currentLang]}
            </span>
          </div>
        );
      }
    },
    {
      Header: () => <div className="p-header-td">Category</div>,
      //show: false,
      headerStyle: {
        display: "block"
      },
      accessor: "category",
      Cell: props => (
        <div className="p-contentType">
          <span className="badge badge-primary">
            {props.value.name[currentLang]}
          </span>
        </div>
      )
    },
    {
      Header: "Actions",
      //show: false,
      headerStyle: {
        display: "block"
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
  const { name: pageTitle, desc: pageDescription } = props.component;

  // variables
  const [{ contents, categories, contentTypes }, dispatch] = useGlobalState();

  const tableBox = useRef(null);

  const [leftContent, toggleLeftContent] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedNode, setSelectedNode] = useState({});
  const [selectedContentType, setSelectedContentType] = useState({});
  const [columnsVisibility, toggleColumns] = useState(false);

  const [columns, setColumns] = useState(baseFieldColumnsConfig.slice());
  const [dataFilters, setFilters] = useState([]);

  useEffect(() => {
    getContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call();
  }, []);
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
      pathname: "/contents/new"
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
    let f = dataFilters.filter(item => item.type !== filter.type);
    setFilters(f);
    let text = searchText;
    if (filter.type === "text") {
      text = undefined;
      setSearchText("");
    }

    filterContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call(
        text,
        selectedContentType.sys ? selectedContentType.sys.id : undefined,
        selectedNode.sys ? selectedNode.sys.id : undefined
      );
  }
  function handleSearchChanged() {
    let f = [...dataFilters].filter(item => item.type !== "text");
    if (searchText.length !== 0) f.push({ type: "text", title: searchText });
    setFilters(f);

    filterContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call(
        searchText,
        selectedContentType.sys ? selectedContentType.sys.id : undefined,
        selectedNode.sys ? selectedNode.sys.id : undefined
      );
  }
  function handleContentTypeSelect(selected) {
    let f = dataFilters.filter(item => item.type !== "contentType");
    f.push(selected);
    setFilters(f);

    setSelectedContentType(selected);
    filterContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call(
        searchText,
        selected.sys.id,
        selectedNode.sys ? selectedNode.sys.id : undefined
      );
  }
  function handleStatusSelect(selected) {}
  function handleClickCategory(selected) {
    let f = dataFilters.filter(item => item.type !== "category");
    f.push(selected);
    setFilters(f);

    setSelectedNode(selected);

    filterContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call(
        searchText,
        selectedContentType.sys ? selectedContentType.sys.id : undefined,
        selected.sys.id
      );

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
    deleteContent()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result
        });
      })
      .call(row.original);
  }
  function handleEditRow(row) {
    props.history.push({
      pathname: `/contents/edit/${row.original.sys.id}`
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
              <div
                className="input-group-prepend"
                onClick={handleSearchChanged}
              >
                <span className="input-group-text searchBtn">Search</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search name of content"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
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
              New Content
            </button>
          </div>
        </div>
        <div className="p-content">
          {leftContent && (
            <div className="p-content-left animated fadeIn faster">
              <div className="filterBox">
                <div className="filter-header">Selected Filters</div>
                <div className="filter-body">
                  <div className="selectedFilters">
                    {dataFilters.length === 0 && (
                      <div className="empty-dataFilter">
                        There is no selected filter
                      </div>
                    )}
                    {dataFilters.map(filter => (
                      <div key={filter.id} className="filterItem">
                        <span className="filterText">
                          {filter.title !== undefined
                            ? filter.title.en !== undefined
                              ? filter.title[currentLang]
                              : filter.title
                            : filter.name[currentLang]}
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
                filters={dataFilters}
                leftContent={leftContent}
                data={contentTypes}
                onContentTypeSelect={selected =>
                  handleContentTypeSelect(selected)
                }
              />
              <Tree
                filters={dataFilters}
                leftContent={leftContent}
                data={categories}
                onCategorySelect={selected => handleClickCategory(selected)}
              />
              <Status
                filters={dataFilters}
                leftContent={leftContent}
                onStatusSelect={selected => handleStatusSelect(selected)}
              />
            </div>
          )}
          <div className="p-content-right" ref={tableBox}>
            <div className="p-content-right-header">
              <div className="p-content-header-title">All Data</div>
            </div>
            <div className="p-content-right-body">
              <ReactTable
                data={contents}
                defaultPageSize={10}
                minRows={2}
                columns={columns}
                showPaginationTop={false}
                showPaginationBottom={false}
                style={{
                  border: "none",
                  overflow: "auto",
                  height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
