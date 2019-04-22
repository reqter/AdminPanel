import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import { AssetFile, Alert } from "./../../components";
import {
  getAssets,
  deleteAsset,
  filterAssets,
  publish,
  unPublish,
  archive,
  unArchive,
} from "./../../Api/asset-api";

const filters = [
  {
    id: "0",
    name: "all",
    icon: "icon-folder",
  },
  {
    id: "1",
    name: "image",
    icon: "icon-images",
  },
  {
    id: "2",
    name: "video",
    icon: "icon-video",
  },
  {
    id: "3",
    name: "audio",
    icon: "icon-audio",
  },
  {
    id: "4",
    name: "pdf",
    icon: "icon-pdf",
  },
  {
    id: "5",
    name: "spreadsheet",
    icon: "icon-spreadsheet",
  },
];

const Assets = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ assets, status }, dispatch] = useGlobalState();

  useEffect(() => {
    getAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_GET_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call();
  }, []);

  const { name: pageTitle, desc: pageDescription } = props.component;
  const [selectedFileType, setFileType] = useState(filters[0]);
  const [selectedStatus, setStatus] = useState({});
  const [showAlert, toggleAlert] = useState(false);
  const [alertData, setAlertData] = useState();

  function translate(key) {
    return languageManager.translate(key);
  }
  function getTypeFilters(item) {
    return {
      all: item.name === "all" ? true : false,
      image: item.name === "image" ? true : false,
      video: item.name === "video" ? true : false,
      audio: item.name === "audio" ? true : false,
      pdf: item.name === "pdf" ? true : false,
      spreadsheet: item.name === "spreadsheet" ? true : false,
    };
  }
  function handleFileTypeClick(selected) {
    setFileType(selected);
    const typeFilters = getTypeFilters(selected);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_GET_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call(
        typeFilters.all,
        typeFilters.image,
        typeFilters.video,
        typeFilters.audio,
        typeFilters.pdf,
        typeFilters.spreadsheet,
        selectedStatus.name
      );
  }
  function handleStatusClick(selected) {
    setStatus(selected);
    const typeFilters = getTypeFilters(selectedFileType);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_GET_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_GET_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {})
      .call(
        typeFilters.all,
        typeFilters.image,
        typeFilters.video,
        typeFilters.audio,
        typeFilters.pdf,
        typeFilters.spreadsheet,
        selected.name
      );
  }
  function openUploader() {
    props.history.push("/addAsset");
  }
  function openUploaderForEdit(file) {
    props.history.push(`/editAsset/${file.sys.id}`);
  }
  function showRemoveAlert(item) {
    setAlertData({
      type: "error",
      title: "Remove Asset",
      message: "Are you sure to remove ?",
      isAjaxCall: true,
      okTitle: "Remove",
      cancelTitle: "Don't remove",
      onOk: () => removeAsset(item),
      onCancel: () => {
        setAlertData();
      },
    });
  }
  function removeAsset(item) {
    deleteAsset()
      .onOk(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: languageManager.translate("ASSET_DELETE_ON_OK"),
          },
        });
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_DELETE_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: languageManager.translate("ASSET_DELETE_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_DELETE_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: languageManager.translate("ASSET_DELETE_NOT_FOUND"),
          },
        });
      })
      .call(item);
  }
  function archive(file) {
    archive()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }
  function unArchive(file) {
    unArchive()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }
  function publish(file) {
    publish()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }
  function unPublish(file) {
    unPublish()
      .onOk(result => {})
      .onServerError(result => {})
      .onBadRequest(result => {})
      .unAuthorized(result => {})
      .notFound(result => {})
      .call(file.id);
  }

  return (
    <>
      <div className="as-wrapper">
        <div className="as-header">
          <div className="as-header-left">
            <span className="as-header-title">{pageTitle}</span>
            <span className="as-header-description">{pageDescription}</span>
          </div>
          <div className="as-header-right" />
        </div>
        <div className="as-content">
          <div className="as-content-left">
            <div className="left-text">{translate("ASSET_FILTER_TITLE")}</div>
            <div className="left-btnContent">
              <button className="btn btn-primary" onClick={openUploader}>
                {translate("ASSET_FILTER_BTN_TEXT")}
              </button>
            </div>
            <div className="filterContent">
              <div className="left-filters">
                <div className="title">
                  {translate("ASSET_FILTER_BY_TYPE_TITLE")}
                </div>
                {filters.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleFileTypeClick(f)}
                    style={{
                      color:
                        f.id === selectedFileType.id
                          ? "rgb(56,132,255)"
                          : "black",
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{translate(f.name)}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display:
                          f.id === selectedFileType.id ? "block" : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="left-filters">
                <div className="title">
                  {translate("ASSET_FILTER_BY_STATUS_TITLE")}
                </div>
                {status.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleStatusClick(f)}
                    style={{
                      color:
                        f.id === selectedStatus.id
                          ? "rgb(56,132,255)"
                          : "black",
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{translate(f.name)}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display: f.id === selectedStatus.id ? "block" : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="as-content-right">
            <div className="header">
              {translate("ASSET_TABLE_HEADER_ALL_ASSETS")}
            </div>
            <div className="rightTable">
              <table className="table">
                <thead className="table__head">
                  <tr>
                    <th>#</th>
                    <th>{translate("ASSET_TABLE_HEAD_PREVIEW")}</th>
                    <th>{translate("ASSET_TABLE_HEAD_NAME")}</th>
                    <th>{translate("ASSET_TABLE_HEAD_BY")}</th>
                    <th>{translate("ASSET_TABLE_HEAD_STATUS")}</th>
                    <th>{translate("ASSET_TABLE_HEAD_ACTIONS")}</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((file, index) => (
                    <tr key={index}>
                      <td>
                        <div className="as-table-number">
                          <div className="as-table-number-value">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-image">
                          {file.fileType.toLowerCase().includes("image") ? (
                            <img src={file.url[currentLang]} alt="" />
                          ) : file.fileType.toLowerCase().includes("video") ? (
                            <i className="icon-video" />
                          ) : file.fileType.toLowerCase().includes("audio") ? (
                            <i className="icon-audio" />
                          ) : file.fileType.toLowerCase().includes("pdf") ? (
                            <i className="icon-pdf" />
                          ) : file.fileType
                              .toLowerCase()
                              .includes("spreadsheet") ? (
                            <i className="icon-spreadsheet" />
                          ) : (
                            <AssetFile file={file} class="assetFile" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="as-table-name">
                          <span className="name">
                            {file.title[currentLang]}
                          </span>
                          <span>{file.fileType}</span>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-by">
                          <span>{file.sys.issuer.fullName}</span>
                          <span>{file.sys.issueDate}</span>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-status">
                          <span className="adge badge-primary">
                            {languageManager.translate(file.status)}
                          </span>
                        </div>
                      </td>
                      <td>
                        {file.status === "draft" ? (
                          <button className="btn btn-light btn-sm">
                            {translate("ARCHIVE")}
                          </button>
                        ) : file.status === "changed" ? (
                          <button className="btn btn-light btn-sm">
                            {translate("PUBLISH")}
                          </button>
                        ) : file.status === "archived" ? (
                          <button className="btn btn-light btn-sm">
                            {translate("UN_ARCHIVE")}
                          </button>
                        ) : file.status === "published" ? (
                          <button className="btn btn-light btn-sm">
                            {translate("UN_PUBLISH")}
                          </button>
                        ) : (
                          ""
                        )}
                        {file.status !== "published" &&
                          file.status !== "archived" && (
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => showRemoveAlert(file)}
                            >
                              <i className="icon-bin" />
                            </button>
                          )}
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => openUploaderForEdit(file)}
                        >
                          <i className="icon-pencil" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Assets;
