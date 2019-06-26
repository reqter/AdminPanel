import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useGlobalState, useLocale } from "./../../hooks";
import {
  AssetFile,
  Alert,
  CircleSpinner,
  DateFormater,
} from "../../components";
import {
  getAssets,
  deleteAsset,
  filterAssets,
  publish,
  unPublish,
  archive,
  unArchive,
} from "../../Api/asset-api";

const filters = [
  {
    id: "0",
    name: "all",
    title: {
      en: "All Assets",
      fa: "همه",
    },
    icon: "icon-folder",
  },
  {
    id: "1",
    name: "image",
    title: {
      en: "Image",
      fa: "تصاویر",
    },
    icon: "icon-images",
  },
  {
    id: "2",
    name: "video",
    title: {
      en: "Video",
      fa: "ویدیو",
    },
    icon: "icon-video",
  },
  {
    id: "3",
    name: "audio",
    title: {
      en: "Audio",
      fa: "فایل صوتی",
    },
    icon: "icon-audio",
  },
  {
    id: "4",
    name: "application/pdf",
    title: {
      en: "PDF",
      fa: "پی دی اف",
    },
    icon: "icon-pdf",
  },
];

const Assets = props => {
  let didCancel = false;
  const { appLocale, t, currentLang } = useLocale();
  const [{ assets, status, spaceInfo }, dispatch] = useGlobalState();
  const [spinner, toggleSpinner] = useState(true);

  useEffect(() => {
    getAssets()
      .onOk(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "SET_ASSETS",
            value: result,
          });
        }
      })
      .onServerError(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("ASSET_GET_ON_SERVER_ERROR"),
            },
          });
        }
      })
      .onBadRequest(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "error",
              message: t("ASSET_GET_ON_BAD_REQUEST"),
            },
          });
        }
      })
      .unAuthorized(result => {
        if (!didCancel) {
          props.history.replace("/login");
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("ASSET_GET_UN_AUTHORIZED"),
            },
          });
        }
      })
      .notFound(result => {
        if (!didCancel) {
          toggleSpinner(false);
        }
      })
      .call(spaceInfo.id);

    return () => {
      didCancel = true;
    };
  }, []);

  const { name: pageTitle, desc: pageDescription } = props.component;
  const [selectedFileType, setFileType] = useState(filters[0]);
  const [selectedStatus, setStatus] = useState({});
  const [alertData, setAlertData] = useState();

  function doFilter(fileType, status) {
    toggleSpinner(true);
    filterAssets()
      .onOk(result => {
        toggleSpinner(false);
        dispatch({
          type: "SET_ASSETS",
          value: result,
        });
      })
      .onServerError(result => {
        toggleSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_GET_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        toggleSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_GET_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        toggleSpinner(false);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: t("ASSET_GET_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        toggleSpinner(false);
      })
      .call(spaceInfo.id, fileType === "all" ? undefined : [fileType], [
        status,
      ]);
  }
  function handleFileTypeClick(selected) {
    setFileType(selected);
    doFilter(selected.name, selectedStatus.name);
  }
  function handleStatusClick(selected) {
    setStatus(selected);
    doFilter(selectedFileType.name, selected.name);
  }
  function openUploader() {
    props.history.push("/addAsset");
  }
  function openUploaderForEdit(file) {
    props.history.push(`/editAsset/${file._id}`);
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
    const deletedItem = item;
    deleteAsset()
      .onOk(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("ASSET_DELETE_ON_OK"),
          },
        });
        dispatch({
          type: "DELETE_ASSET",
          value: deletedItem,
        });
      })
      .onServerError(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_DELETE_ON_SERVER_ERROR"),
          },
        });
      })
      .onBadRequest(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_DELETE_ON_BAD_REQUEST"),
          },
        });
      })
      .unAuthorized(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "warning",
            message: t("ASSET_DELETE_UN_AUTHORIZED"),
          },
        });
      })
      .notFound(result => {
        setAlertData();
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("ASSET_DELETE_NOT_FOUND"),
          },
        });
      })
      .call(spaceInfo ? spaceInfo.id : undefined, item._id);
  }
  function archiveAsset(file) {
    archive()
      .onOk(result => {
        doFilter(selectedFileType.name, selectedStatus.name);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The asset is archived"),
          },
        });
        dispatch({
          type: "ARCHIVE_ASSET",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Internal server error"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Bad request"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Un Authorized"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Asset not found"),
          },
        });
      })
      .call(spaceInfo.id, file._id);
  }
  function unArchiveAsset(file) {
    unArchive()
      .onOk(result => {
        doFilter(selectedFileType.name, selectedStatus.name);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The asset is unarchived"),
          },
        });
        dispatch({
          type: "UN_ARCHIVE_ASSET",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Internal server error"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Bad request"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Un Authorized"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Asset not found"),
          },
        });
      })
      .call(spaceInfo.id, file._id);
  }
  function publishAsset(file) {
    publish()
      .onOk(result => {
        doFilter(selectedFileType.name, selectedStatus.name);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The asset is published"),
          },
        });
        dispatch({
          type: "PUBLISH_ASSET",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Internal server error"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Bad request"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Un Authorized"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Asset not found"),
          },
        });
      })
      .call(spaceInfo.id, file._id);
  }
  function unPublishAsset(file) {
    unPublish()
      .onOk(result => {
        doFilter(selectedFileType.name, selectedStatus.name);
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The asset is unpublished"),
          },
        });
        dispatch({
          type: "UN_PUBLISH_ASSET",
          value: result,
        });
      })
      .onServerError(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Internal server error"),
          },
        });
      })
      .onBadRequest(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Bad request"),
          },
        });
      })
      .unAuthorized(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Un Authorized"),
          },
        });
      })
      .notFound(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "error",
            message: t("Asset not found"),
          },
        });
      })
      .call(spaceInfo.id, file._id);
  }

  return (
    <>
      <div className="as-wrapper">
        <div className="as-header">
          <div className="as-header-left">
            <span className="as-header-title">{t(pageTitle)}</span>
            <span className="as-header-description">{t(pageDescription)}</span>
          </div>
          <div className="as-header-right" />
        </div>
        <div className="as-content">
          <div className="as-content-left">
            <div className="left-text">{t("ASSET_FILTER_TITLE")}</div>
            <div className="left-btnContent">
              <button className="btn btn-primary" onClick={openUploader}>
                {t("ASSET_FILTER_BTN_TEXT")}
              </button>
            </div>
            <div className="filterContent">
              <div className="left-filters">
                <div className="title">{t("ASSET_FILTER_BY_TYPE_TITLE")}</div>
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
                    <span className="name">{f.title[currentLang]}</span>
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
                <div className="title">{t("ASSET_FILTER_BY_STATUS_TITLE")}</div>
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
                    <span className="name">{t(f.name)}</span>
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
              {t("ASSET_TABLE_HEADER_ALL_ASSETS")}&nbsp;&nbsp;
              <CircleSpinner show={spinner} size="small" />
            </div>
            <div className="content">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("ASSET_TABLE_HEAD_PREVIEW")}</th>
                    <th>{t("ASSET_TABLE_HEAD_NAME")}</th>
                    <th>{t("ASSET_TABLE_HEAD_BY")}</th>
                    <th>{t("ASSET_TABLE_HEAD_STATUS")}</th>
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
                            {file.title
                              ? file.title[currentLang]
                                ? file.title[currentLang]
                                : file.title
                              : ""}
                          </span>
                          <span>{file.fileType}</span>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-by">
                          <span>
                            {file.sys.issuer && file.sys.issuer.fullName}
                          </span>
                          <DateFormater date={file.sys.issueDate} />
                        </div>
                      </td>
                      <td>
                        <div className="as-table-status">
                          <span className="adge badge-primary">
                            {t(file.status)}
                          </span>
                        </div>
                      </td>
                      <td>
                        {file.status === "draft" ? (
                          <>
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => publishAsset(file)}
                            >
                              {t("PUBLISH")}
                            </button>
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => archiveAsset(file)}
                            >
                              {t("ARCHIVE")}
                            </button>
                          </>
                        ) : file.status === "changed" ? (
                          <>
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => publishAsset(file)}
                            >
                              {t("PUBLISH")}
                            </button>
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => archiveAsset(file)}
                            >
                              {t("ARCHIVE")}
                            </button>
                          </>
                        ) : file.status === "archived" ? (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => unArchiveAsset(file)}
                          >
                            {t("UN_ARCHIVE")}
                          </button>
                        ) : file.status === "published" ? (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => unPublishAsset(file)}
                          >
                            {t("UN_PUBLISH")}
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
