import React, { useState, useEffect } from "react";
import "./styles.scss";
import { languageManager, useGlobalState } from "../../services";
import { getAssets, deleteAsset, filterAssets } from "./../../Api/asset-api";

const filters = [
  {
    id: "0",
    name: "all",
    title: "All Files",
    icon: "icon-folder"
  },
  {
    id: "1",
    name: "image",
    title: "Image",
    icon: "icon-images"
  },
  {
    id: "2",
    name: "video",
    title: "Video",
    icon: "icon-video"
  },
  {
    id: "3",
    name: "audio",
    title: "Audio",
    icon: "icon-audio"
  },
  {
    id: "4",
    name: "pdf",
    title: "PDF",
    icon: "icon-pdf"
  },
  {
    id: "5",
    name: "spreadsheet",
    title: "Spreadsheet",
    icon: "icon-spreadsheet"
  }
];

const Assets = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const [{ assets, status }, dispatch] = useGlobalState();

  useEffect(() => {
    getAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .call();
  }, []);

  const { name: pageTitle, desc: pageDescription } = props.component;
  const [selectedFileType, setFileType] = useState(filters[0]);
  const [selectedStatus, setStatus] = useState({});

  function handleFileTypeClick(selected) {
    setFileType(selected);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .call(selected.name, selectedStatus.name);
  }
  function handleStatusClick(selected) {
    setStatus(selected);
    filterAssets()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .call(selectedFileType.name, selected.name);
  }
  function openUploader() {
    props.history.push("/addAsset");
  }
  function openUploaderForEdit(file) {
    props.history.push(`/editAsset/${file.sys.id}`);
  }
  function removeAsset(item) {
    deleteAsset()
      .onOk(result => {
        dispatch({
          type: "SET_ASSETS",
          value: result
        });
      })
      .call(item);
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
            <div className="left-text">Filter & Upload New File</div>
            <div className="left-btnContent">
              <button className="btn btn-primary" onClick={openUploader}>
                Upload New File
              </button>
            </div>
            <div className="filterContent">
              <div className="left-filters">
                <div className="title">Filter Files by Extenstion</div>
                {filters.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleFileTypeClick(f)}
                    style={{
                      color:
                        f.id === selectedFileType.id
                          ? "rgb(56,132,255)"
                          : "black"
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{f.title}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display: f.id === selectedFileType.id ? "block" : "none"
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="left-filters">
                <div className="title">Filter Files By Status</div>
                {status.map(f => (
                  <div
                    className="filter"
                    key={f.id}
                    onClick={() => handleStatusClick(f)}
                    style={{
                      color:
                        f.id === selectedStatus.id ? "rgb(56,132,255)" : "black"
                    }}
                  >
                    <i className={["icon", f.icon].join(" ")} />
                    <span className="name">{f.title}</span>
                    <span
                      className="icon-circle-o iconSelected"
                      style={{
                        display: f.id === selectedStatus.id ? "block" : "none"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="as-content-right">
            <div className="header">All assets</div>
            <div className="rightTable">
              <table className="table">
                <thead className="table__head">
                  <tr>
                    <th>#</th>
                    <th>Preview</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>By</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        {file.fileType.toLowerCase().includes("image") ? (
                          <div className="as-table-image">
                            <img src={file.url[currentLang]} alt="" />
                          </div>
                        ) : file.fileType.toLowerCase().includes("video") ? (
                          <div className="as-table-image">
                            <i className="icon-video" />
                          </div>
                        ) : file.fileType.toLowerCase().includes("audio") ? (
                          <div className="as-table-image">
                            <i className="icon-audio" />
                          </div>
                        ) : file.fileType.toLowerCase().includes("pdf") ? (
                          <div className="as-table-image">
                            <i className="icon-pdf" />
                          </div>
                        ) : file.fileType
                            .toLowerCase()
                            .includes("spreadsheet") ? (
                          <div className="as-table-image">
                            <i className="icon-spreadsheet" />
                          </div>
                        ) : (
                          <div className="as-table-image">
                            <i className="icon-folder" />
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="as-table-name">
                          {file.name[currentLang]}
                        </div>
                      </td>
                      <td>
                        <div className="as-table-type">{file.fileType}</div>
                      </td>
                      <td>
                        <div className="as-table-by">
                          <span>{file.sys.issuer.fullName}</span>
                          <span>{file.sys.issueDate}</span>
                        </div>
                      </td>
                      <td>
                        <div className="as-table-status">
                          <span className="adge badge-primary">Draft</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-light"
                          onClick={() => removeAsset(file)}
                        >
                          <i className="icon-bin" />
                        </button>
                        <button
                          className="btn btn-light"
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
    </>
  );
};

export default Assets;
