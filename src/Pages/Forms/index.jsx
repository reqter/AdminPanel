import React, { useEffect, useState, useRef } from "react";
import { useGlobalState, useLocale } from "../../hooks";
import {
  getRequests,
  filterRequests,
  deleteRequest,
  publish,
  unPublish,
  archive,
  unArchive,
} from "../../Api/request-api";
import "./styles.scss";

import { Alert, CircleSpinner, DateFormater, Image } from "../../components";
import { Empty } from "../../components/Commons/ErrorsComponent";
import ItemSkeleton from "./ItemSkeleton";

const Requests = props => {
  const { appLocale, t, currentLang } = useLocale();

  let didCancel = false;
  //#region controller

  let baseFieldColumnsConfig = [
    {
      Header: "#",
      //show: false,
      width: 70,
      headerStyle: {
        display: "none",
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
      Header: () => <div className="p-header-td">Thumbnail</div>,
      // show: false,
      headerStyle: {
        display: "none",
      },
      accessor: "thumbnail",
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
      Header: () => <div className="p-header-td">Title</div>,
      show: false,
      headerStyle: {
        display: "block",
      },
      //accessor: "title",
      Cell: props => {
        const { title, description } = props.row._original;
        return (
          <div className="p-name">
            <span>{title && title[currentLang]}</span>
            <span>{description && description[currentLang]}</span>
          </div>
        );
      },
    },
    {
      Header: () => <div className="p-header-td">Issuer</div>,
      width: 130,
      //show: false,
      headerStyle: {
        display: "none",
      },
      accessor: "sys",
      Cell: props => (
        <div className="p-issuer">
          <span>{props.value.issuer.fullName}</span>
          <span>
            <DateFormater date={props.value.issueDate} />
          </span>
        </div>
      ),
    },
    {
      Header: () => <div className="p-header-td">Content Type</div>,
      width: 110,
      //show: false,
      headerStyle: {
        display: "none",
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
    // {
    //   Header: () => <div className="p-header-td">Category</div>,
    //   //show: false,
    //   headerStyle: {
    //     display: "block",
    //   },
    //   accessor: "category",
    //   Cell: props => (
    //     <div className="p-contentType">
    //       <span className="badge badge-light">
    //         {props.value ? props.value.name[currentLang] : ""}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      Header: () => <div className="p-header-td">Status</div>,
      width: 110,
      //show: false,
      headerStyle: {
        display: "none",
      },
      accessor: "status",
      Cell: props => (
        <div className="p-contentType">
          <span className="badge badge-primary">{t(props.value)}</span>
        </div>
      ),
    },
    {
      Header: "Actions",
      //show: false,
      headerStyle: {
        display: "none",
      },
      clickable: false,
      Cell: props => {
        const { status } = props.original;
        return (
          <div className="p-actions">
            <button
              className="btn btn-light btn-sm"
              onClick={() => handleEditRow(props)}
            >
              Edit
            </button>
            {status !== "published" && status !== "archived" && (
              <button
                className="btn btn-light btn-sm"
                onClick={() => handleDeleteRow(props)}
              >
                <i className="icon-bin" />
              </button>
            )}
            {status === "draft" ? (
              <>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => publishContent(props)}
                >
                  {t("PUBLISH")}
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => archiveContent(props)}
                >
                  {t("ARCHIVE")}
                </button>
              </>
            ) : status === "changed" ? (
              <>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => publishContent(props)}
                >
                  {t("PUBLISH")}
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => archiveContent(props)}
                >
                  {t("ARCHIVE")}
                </button>
              </>
            ) : status === "archived" ? (
              <button
                className="btn btn-light btn-sm"
                onClick={() => unArchiveContent(props)}
              >
                {t("UN_ARCHIVE")}
              </button>
            ) : status === "published" ? (
              <button
                className="btn btn-light btn-sm"
                onClick={() => unPublishContent(props)}
              >
                {t("UN_PUBLISH")}
              </button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
  const { name: pageTitle, desc: pageDescription } = props.component;
  const [{ spaceInfo }, dispatch] = useGlobalState();

  const [spinner, toggleSpinner] = useState(true);
  const [forms, setForms] = useState();
  const [alertData, setAlertData] = useState();
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    //loadRequests();
    setTimeout(() => {
      toggleSpinner(false);
    }, 1000);
    return () => {
      didCancel = true;
    };
  }, []);

  function loadRequests() {
    getRequests()
      .onOk(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "SET_REQUESTS",
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
              message: t("CONTENTS_ON_SERVER_ERROR"),
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
              message: t("CONTENTS_ON_BAD_REQUEST"),
            },
          });
        }
      })
      .unAuthorized(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("CONTENTS_UN_AUTHORIZED"),
            },
          });
        }
      })
      .unKnownError(result => {
        if (!didCancel) {
          toggleSpinner(false);
        }
      })
      .onRequestError(result => {
        if (!didCancel) {
          toggleSpinner(false);
        }
      })
      .call(spaceInfo.id);
  }
  // methods
  const imgs = ["jpg", "jpeg", "gif", "bmp", "png"];
  const videos = ["mp4", "3gp", "ogg", "wmv", "flv", "avi"];
  const audios = ["wav", "mp3", "ogg"];
  function getAssetUi(url) {
    const ext =
      url && url.length > 0
        ? url
            .split("/")
            .pop()
            .split(".")
            .pop()
        : "";
    if (imgs.indexOf(ext.toLowerCase()) !== -1)
      return <Image className="p-image-value" url={url} />;
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

  function openNewItemBox(contentType) {
    props.history.push({
      pathname: "/" + currentLang + "/form/new",
    });
  }
  function handleDeleteRow(row) {
    setAlertData({
      type: "error",
      title: "Remove request",
      message: "Are you sure to remove?",
      isAjaxCall: true,
      okTitle: "Remove",
      cancelTitle: "Don't remove",
      onOk: () => {
        const deleted = row.original;
        deleteRequest()
          .onOk(result => {
            loadRequests();
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("CONTENTS_DELETE_ON_OK"),
              },
            });
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENTS_DELETE_ON_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENTS_DELETE_ON_BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "warning",
                message: t("CONTENTS_DELETE_UN_AUTHORIZED"),
              },
            });
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("CONTENTS_DELETE_NOT_FOUND"),
              },
            });
          })
          .call(spaceInfo.id, row.original._id);
      },
      onCancel: () => {
        setAlertData();
      },
    });
  }

  function handleEditRow(row) {
    props.history.push({
      pathname: `/${currentLang}/form/edit/${row.original._id}`,
    });
  }
  function viewContent(row) {
    props.history.push({
      pathname: `/${currentLang}/form/view/${row._id}`,
      viewMode: true,
    });
  }
  function archiveContent(row) {
    archive()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The content is archived"),
          },
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
      .call(spaceInfo.id, row.original._id);
  }
  function unArchiveContent(row) {
    unArchive()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The content is unarchived"),
          },
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
      .call(spaceInfo.id, row.original._id);
  }
  function publishContent(row) {
    publish()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The content is published"),
          },
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
      .call(spaceInfo.id, row.original._id);
  }
  function unPublishContent(row) {
    unPublish()
      .onOk(result => {
        dispatch({
          type: "ADD_NOTIFY",
          value: {
            type: "success",
            message: t("The content is unpublished"),
          },
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
      .call(spaceInfo.id, row.original._id);
  }
  //#endregion controller

  return (
    <>
      <div className="p-wrapper">
        <div className="p-header">
          <div className="p-header-left">
            <span className="p-header-title">{t(pageTitle)}</span>
            <span className="p-header-description">{t(pageDescription)}</span>
          </div>
          <div className="p-header-right">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={t("FORMS_SEARCH_PLACEHOLDER")}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={openNewItemBox}>
              {t("FORMS_BTN_NEW")}
            </button>
          </div>
        </div>
        <div className="p-content">
          {spinner ? (
            [1, 2, 3, 4, 5].map(sk => <ItemSkeleton />)
          ) : !forms || forms.length === 0 ? (
            <div className="forms__empty">
              <Empty />
              <span className="forms__empty__title">
                {t("لیست خالی می باشد")}
              </span>
              <span className="forms__empty__info">
                {t(
                  "شما هنوز هیچ فرمی ایجاد نکرده اید دکمه زیر کلیک کنید تا اولین فرم خود را ایجاد کنید"
                )}
              </span>
              <button className="btn btn-primary btn-sm">
                ایجاد اولین فرم
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      {alertData && <Alert data={alertData} />}
    </>
  );
};

export default Requests;
