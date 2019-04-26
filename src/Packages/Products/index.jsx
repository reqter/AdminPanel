import React, { useEffect, useState, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { useGlobalState, languageManager } from "./../../services";
import {
  getContents,
  filterContents,
  deleteContent,
} from "./../../Api/content-api";
import "./styles.scss";

import { Alert } from "./../../components";
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
        display: "block",
      },
      Cell: props => {
        return (
          <div className="p-number">
            <div className="p-number-value">{props.index + 1}</div>
          </div>
        );
      },
    },
    {
      width: 100,
      Header: () => <div className="p-header-td">Media</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "fields.thumbnail",
      Cell: props => {
        return (
          <div className="p-image">
            {props.value && props.value.length > 0 ? (
              getAssetUi(props.value[0][currentLang])
            ) : (
              <div className="p-thumbnail-file empty">
                {/* <i className="file-text" /> */}
                empty
              </div>
            )}
          </div>
        );
      },
    },
    {
      Header: () => <div className="p-header-td">Name</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "fields",
      Cell: props => (
        <div className="p-name">
          <span>{props.value["name"] && props.value["name"][currentLang]}</span>
          <span>
            {props.value["shortDesc"] && props.value["shortDesc"][currentLang]}
          </span>
        </div>
      ),
    },
    {
      Header: () => <div className="p-header-td">Issuer</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "sys",
      Cell: props => (
        <div className="p-issuer">
          <span>{props.value.issuer.fullName}</span>
          <span>{props.value.issueDate}</span>
        </div>
      ),
    },
    {
      Header: () => <div className="p-header-td">Content Type</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "contentType",
      Cell: props => {
        return (
          <div className="p-contentType">
            <span className="badge badge-light">
              {props.value ? props.value.title[currentLang] : ""}
            </span>
          </div>
        );
      },
    },
    {
      Header: () => <div className="p-header-td">Category</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "category",
      Cell: props => (
        <div className="p-contentType">
          <span className="badge badge-light">
            {props.value ? props.value.name[currentLang] : ""}
          </span>
        </div>
      ),
    },
    {
      Header: () => <div className="p-header-td">Status</div>,
      //show: false,
      headerStyle: {
        display: "block",
      },
      accessor: "status",
      Cell: props => (
        <div className="p-contentType">
          <span className="badge badge-primary">
            {languageManager.translate(props.value)}
          </span>
        </div>
      ),
    },
    {
      Header: "Actions",
      //show: false,
      headerStyle: {
        display: "block",
      },
      clickable: false,
      Cell: props => {
        return (
          <div className="p-actions">
            <button
              className="btn btn-light btn-sm"
              onClick={() => handleEditRow(props)}
            >
              Edit
            </button>
            {props.original.status !== "published" &&
              props.original.status !== "archived" && (
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => handleDeleteRow(props)}
                >
                  <i className="icon-bin" />
                </button>
              )}
          </div>
        );
      },
    },
  ];
  const { name: pageTitle, desc: pageDescription } = props.component;

  // variables
  const [{ contents, categories, contentTypes }, dispatch] = useGlobalState();

  const tableBox = useRef(null);

  const [leftContent, toggleLeftContent] = useState(false);
  const [alertData, setAlertData] = useState();

  const [searchText, setSearchText] = useState("");
  const [selectedContentType, setSelectedContentType] = useState({});
  const [selectedNode, setSelectedNode] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [columnsVisibility, toggleColumns] = useState(false);

  const [columns, setColumns] = useState(baseFieldColumnsConfig.slice());
  const [dataFilters, setFilters] = useState([]);

  useEffect(() => {
    getContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENTS_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENTS_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CONTENTS_UN_AUTHORIZED"),
          },
        });
      })
      .call();
  }, []);
  // methods
  const imgs = ["jpg", "jpeg", "gif", "bmp", "png"];
  const videos = ["mp4", "3gp", "ogg", "wmv", "flv", "avi"];
  const audios = ["wav", "mp3", "ogg"];
  function getAssetUi(url) {
    const ext = url
      .split("/")
      .pop()
      .split(".")
      .pop();
    if (imgs.indexOf(ext.toLowerCase()) !== -1)
      return <img className="p-image-value" src={url} alt="" />;
    else if (videos.indexOf(ext.toLowerCase()) !== -1)
      return (
        <div className="p-thumbnail-file">
          <i className="icon-video" />
        </div>
      );
    else if (audios.indexOf(ext.toLowerCase()) !== -1)
      return (
        <div className="p-thumbnail-file">
          <i className="icon-audio" />
        </div>
      );
    else
      return (
        <div className="p-thumbnail-file unknown">
          <i className="icon-file-text" />
          .file
        </div>
      );
  }
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
      pathname: "/contents/new",
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
    let contentTypeID = selectedContentType.sys
      ? selectedContentType.sys.id
      : undefined;
    let categoryID = selectedNode.sys ? selectedNode.sys.id : undefined;
    let status = selectedStatus.name;
    if (filter.type === "text") {
      text = undefined;
      setSearchText("");
    } else if (filter.type === "contentType") {
      contentTypeID = undefined;
      setSelectedContentType({});
    } else if (filter.type === "category") {
      categoryID = undefined;
      setSelectedNode({});
    } else if (filter.type === "status") {
      status = undefined;
      setSelectedStatus({});
    }
    filterData(text, contentTypeID, categoryID, status);
  }
  function handleSearchChanged() {
    let f = [...dataFilters].filter(item => item.type !== "text");
    if (searchText.length !== 0) f.push({ type: "text", title: searchText });
    setFilters(f);

    filterData(
      searchText,
      selectedContentType.sys ? selectedContentType.sys.id : undefined,
      selectedNode.sys ? selectedNode.sys.id : undefined,
      selectedStatus.name
    );
  }
  function handleContentTypeSelect(selected) {
    let f = dataFilters.filter(item => item.type !== "contentType");
    f.push(selected);
    setFilters(f);
    setSelectedContentType(selected);
    filterData(
      searchText,
      selected.sys.id,
      selectedNode.sys ? selectedNode.sys.id : undefined,
      selectedStatus.name
    );
  }

  function handleClickCategory(selected) {
    let f = dataFilters.filter(item => item.type !== "category");
    f.push(selected);
    setFilters(f);
    setSelectedNode(selected);

    filterData(
      searchText,
      selectedContentType.sys ? selectedContentType.sys.id : undefined,
      selected.sys.id,
      selectedStatus.name
    );
  }
  function handleStatusSelected(selected) {
    let f = dataFilters.filter(item => item.type !== "status");
    selected.type = "status";
    f.push(selected);
    setFilters(f);
    setSelectedStatus(selected);

    filterData(
      searchText,
      selectedContentType.sys ? selectedContentType.sys.id : undefined,
      selectedNode.sys ? selectedNode.sys.id : undefined,
      selected.name
    );
  }
  function filterData(text, contentTypeId, categoryId, status) {
    filterContents()
      .onOk(result => {
        dispatch({
          type: "SET_CONTENTS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENTS_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("CONTENTS_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("CONTENTS_UN_AUTHORIZED"),
          },
        });
      })
      .call(text, contentTypeId, categoryId, status);
  }
  function handleDeleteRow(row) {
    setAlertData({
      type: "error",
      title: "Remove Content",
      message: "Are you sure to remove ?",
      isAjaxCall: true,
      okTitle: "Remove",
      cancelTitle: "Don't remove",
      onOk: () =>
        deleteContent()
          .onOk(result => {
            setAlertData();
            dispatch({
              type: "SET_CONTENTS",
              value: result,
            });
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: languageManager.translate("CONTENTS_DELETE_ON_OK"),
              },
            });
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CONTENTS_DELETE_ON_SERVER_ERROR"
                ),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate(
                  "CONTENTS_DELETE_ON_BAD_REQUEST"
                ),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: languageManager.translate(
                  "CONTENTS_DELETE_UN_AUTHORIZED"
                ),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: languageManager.translate("CONTENTS_DELETE_NOT_FOUND"),
              },
            });
          })
          .call(row.original),
      onCancel: () => {
        setAlertData();
      },
    });
  }
  function handleEditRow(row) {
    props.history.push({
      pathname: `/contents/edit/${row.original.sys.id}`,
    });
  }
  function viewContent(row) {
    props.history.push({
      pathname: `/contents/view/${row.sys.id}`,
      viewMode: true,
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
                          {filter.type === "status"
                            ? languageManager.translate(filter.name)
                            : filter.title !== undefined
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
                onStatusSelected={selected => handleStatusSelected(selected)}
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
                  height: "100%", // This will force the table body to overflow and scroll, since there is not enough room
                }}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      if (handleOriginal) {
                        if (column.clickable === undefined)
                          viewContent(rowInfo.original);
                      }
                    },
                  };
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Products;
