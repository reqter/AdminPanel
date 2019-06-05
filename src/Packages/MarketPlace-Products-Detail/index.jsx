import React, { useState, useEffect, useRef } from "react";
import { useTheme, useLayout, useLocale } from "./../../hooks";
import { utility, useGlobalState } from "./../../services";
import "./styles.scss";
import EmptySvg from "./EmptySvg";
import AttachmentItem from "./AttachmentItem";
import MoreInfo from "./MoreInfo";

const MarketPlace_ProductDetail = props => {
  const [{ spinner }, dispatch] = useGlobalState();
  const { appLocale, currentLang } = useLocale();

  const [item, setItem] = useState({
    attachments: [
      {
        id: "1",
        url: {
          en: "https://app-spanel.herokuapp.com/blobs/file-1559658041600.mp4",
          fa: "https://app-spanel.herokuapp.com/blobs/file-1559658041600.mp4",
        },
      },
      {
        id: "2",
        url: {
          en:
            "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
          fa:
            "https://targetcarrental.com/wp-content/uploads/2017/11/target-rent-a-car.jpg",
        },
      },
      {
        id: "3",
        url: {
          en: "https://app-spanel.herokuapp.com/blobs/file-1559662983130.mp3",
          fa: "https://app-spanel.herokuapp.com/blobs/file-1559662983130.mp3",
        },
      },
      {
        id: "6",
        url: {
          en: "http://www.zakcars.com/images/zakcars1.jpg",
          fa: "http://www.zakcars.com/images/zakcars1.jpg",
        },
      },
    ],
  });
  const [selectedAttachment, setSelectedAttachment] = useState();
  const [moreInfo, toggleMoreInfo] = useState();

  useState(() => {
    setSelectedAttachment(item.attachments[0]);
  }, []);

  function handleRequestClicked() {
    props.history.push("/newRequest/12");
  }
  function handleAttachmentSelect(file) {
    setSelectedAttachment(file);
  }
  function handleToggleMoreInfo() {
    toggleMoreInfo(prev => !prev);
  }

  return (
    <div className="mp-products__detail__content">
      {!spinner && (
        <div className="detail">
          <div className="detail__left animated zoomIn faster">
            <div className="mediaViewer">
              {!item || !item.attachments || item.attachments.length === 0 ? (
                <div className="mediaViewer__empty">
                  <EmptySvg />
                  <span>No media attachments for this request</span>
                </div>
              ) : selectedAttachment ? (
                utility.getRequestMediaComponentByURL(
                  selectedAttachment.url[currentLang],
                  "mediaViewer__unkown"
                )
              ) : (
                <div className="mediaViewer__empty">
                  <EmptySvg />
                  <span>No media attachments for this request</span>
                </div>
              )}
            </div>
            {item && item.attachments && item.attachments.length > 0 && (
              <div className="mediaViews_attachments">
                {item.attachments.map(file => (
                  <AttachmentItem
                    key={file.id}
                    file={file}
                    selectedFile={selectedAttachment}
                    onPreview={handleAttachmentSelect}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="detail__right">
            <h3 className="animated fadeIn faster detail__title">
              اجاره ماشین
            </h3>
            <span className="animated fadeIn faster detail__description">
              اجاره ماشین به صورت آنی و در سریعترین زمان ممکن / انواع ماشین های
              خارجی و ایرانی اتومات
            </span>
            <div className="detail__actions animated fadeIn faster">
              <button
                className="btn btn-primary"
                onClick={handleRequestClicked}
              >
                {appLocale["REQUEST"]}
              </button>
              <button className="btn btn-light" onClick={handleToggleMoreInfo}>
                {appLocale["MORE_INFO"]}
              </button>
            </div>
          </div>
        </div>
      )}
      {moreInfo && <MoreInfo onClose={handleToggleMoreInfo} />}
    </div>
  );
};

export default MarketPlace_ProductDetail;
