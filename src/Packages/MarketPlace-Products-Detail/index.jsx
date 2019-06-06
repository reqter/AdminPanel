import React, { useState, useEffect, useRef } from "react";
import { useTheme, useLayout, useLocale } from "./../../hooks";
import { utility, useGlobalState } from "./../../services";
import "./styles.scss";
import EmptySvg from "./EmptySvg";
import AttachmentItem from "./AttachmentItem";
import MoreInfo from "./MoreInfo";

const MarketPlace_ProductDetail = props => {
  const [{ spinner, mp_requestDetail }, dispatch] = useGlobalState();
  const { appLocale, currentLang } = useLocale();

  const [selectedAttachment, setSelectedAttachment] = useState();
  const [moreInfo, toggleMoreInfo] = useState();

  useState(() => {
    if (
      mp_requestDetail &&
      mp_requestDetail.attachments &&
      mp_requestDetail.attachments.length > 0
    ) {
      setSelectedAttachment(mp_requestDetail.attachments[0]);
    }
  }, [spinner]);

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
              {!mp_requestDetail ||
              !mp_requestDetail.attachments ||
              mp_requestDetail.attachments.length === 0 ? (
                <div className="mediaViewer__empty">
                  <EmptySvg />
                  <span>No media attachments for this request</span>
                </div>
              ) : selectedAttachment ? (
                utility.getRequestMediaComponentByURL(
                  selectedAttachment[currentLang],
                  "mediaViewer__unkown"
                )
              ) : (
                <div className="mediaViewer__empty">
                  <EmptySvg />
                  <span>No media attachments for this request</span>
                </div>
              )}
            </div>
            {mp_requestDetail &&
              mp_requestDetail.attachments &&
              mp_requestDetail.attachments.length > 0 && (
                <div className="mediaViews_attachments">
                  {mp_requestDetail.attachments.map(file => (
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
              {mp_requestDetail &&
                mp_requestDetail.title &&
                mp_requestDetail.title[currentLang] &&
                mp_requestDetail.title[currentLang]}
            </h3>
            <span className="animated fadeIn faster detail__description">
              {mp_requestDetail &&
                mp_requestDetail.description &&
                mp_requestDetail.description[currentLang] &&
                mp_requestDetail.description[currentLang]}
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
