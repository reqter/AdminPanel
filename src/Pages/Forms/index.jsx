import React, { useEffect, useState, useRef } from "react";
import { useGlobalState, useLocale } from "../../hooks";
import {
  getForms,
  filterRequests,
  deleteForm,
  publish,
  unPublish,
  archive,
  unArchive,
} from "../../Api/request-api";
import "./styles.scss";

import { Alert, CircleSpinner, DateFormatter, Image } from "../../components";
import { Empty } from "../../components/Commons/ErrorsComponent";
import ItemSkeleton from "./ItemSkeleton";
import FormItem from "./FormItem";

const Requests = props => {
  const { appLocale, t, currentLang } = useLocale();

  let didCancel = false;
  const dataLanguage = "en";
  //#region controller
  const { name: pageTitle, desc: pageDescription } = props.component;
  const [{ spaceInfo }, dispatch] = useGlobalState();

  const [spinner, toggleSpinner] = useState(true);
  const [forms, setForms] = useState();
  const [error, setError] = useState();
  const [alertData, setAlertData] = useState();
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    loadRequests();
    return () => {
      didCancel = true;
    };
  }, []);

  function loadRequests() {
    getForms()
      .onOk(result => {
        if (!didCancel) {
          toggleSpinner(false);
          setForms(result);
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
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("UNKNOWN_ERROR"),
            },
          });
        }
      })
      .onRequestError(result => {
        if (!didCancel) {
          toggleSpinner(false);
          dispatch({
            type: "ADD_NOTIFY",
            value: {
              type: "warning",
              message: t("ON_REQUEST_ERROR"),
            },
          });
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

  function openFormPage(contentType) {
    props.history.push({
      pathname: "/" + currentLang + "/form/new",
    });
  }
  function handleDeleteForm(row) {
    setAlertData({
      type: "error",
      title: t("FORMS_DELETE_ALERT_TITLE"),
      message: t("FORMS_DELETE_ALERT_DESC"),
      isAjaxCall: true,
      okTitle: t("REMOVE"),
      cancelTitle: t("DONT_REMOVE"),
      onOk: () => {
        deleteForm()
          .onOk(result => {
            loadRequests();
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "success",
                message: t("FORMS_DELETE_ON_OK"),
              },
            });
          })
          .onServerError(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("INTERNAL_SERVER_ERROR"),
              },
            });
          })
          .onBadRequest(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("BAD_REQUEST"),
              },
            });
          })
          .unAuthorized(result => {
            setAlertData();
          })
          .notFound(result => {
            setAlertData();
            dispatch({
              type: "ADD_NOTIFY",
              value: {
                type: "error",
                message: t("NOT_FOUND"),
              },
            });
          })
          .call(spaceInfo.id, row._id);
      },
      onCancel: () => {
        setAlertData();
      },
    });
  }

  function handleEditForm(row) {
    props.history.push({
      pathname: `/${currentLang}/form/edit/${row._id}`,
    });
  }
  function viewContent(row) {
    props.history.push({
      pathname: `/${currentLang}/form/view/${row._id}`,
      viewMode: true,
    });
  }
  function handleArchiveForm(row) {
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
      .call(spaceInfo.id, row._id);
  }
  function handleUnArchiveForm(row) {
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
      .call(spaceInfo.id, row._id);
  }
  function handlePublishForm(row) {
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
      .call(spaceInfo.id, row._id);
  }
  function handleUnPublishForm(row) {
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
      .call(spaceInfo.id, row._id);
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
            <button className="btn btn-primary" onClick={openFormPage}>
              {t("FORMS_BTN_NEW")}
            </button>
          </div>
        </div>
        <div className="p-content">
          {spinner ? (
            [1, 2, 3, 4, 5].map(sk => <ItemSkeleton key={sk} />)
          ) : !forms || forms.length === 0 ? (
            <div className="forms__empty">
              <Empty />
              <span className="forms__empty__title">{t("EMPTY_LIST")}</span>
              <span className="forms__empty__info">
                {t("FORMS_EMPTY_LIST_INFO")}
              </span>
              <button className="btn btn-primary btn-sm" onClick={openFormPage}>
                {t("FORMS_EMPTY_LIST_BTN")}
              </button>
            </div>
          ) : !error ? (
            <div className="forms">
              {forms.map(f => (
                <FormItem
                  key={f._id}
                  data={f}
                  onDeleteForm={handleDeleteForm}
                  onEditForm={handleEditForm}
                  onPublishForm={handlePublishForm}
                  onUnPublishForm={handleUnPublishForm}
                  onArchiveForm={handleArchiveForm}
                  onUnArchiveForm={handleUnArchiveForm}
                />
              ))}
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
