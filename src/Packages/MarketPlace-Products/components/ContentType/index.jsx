import React, { useState, useEffect } from "react";
import { languageManager, useGlobalState, utility } from "../../../../services";
import { useLocale } from "./../../../../hooks";
import { getContentTypes } from "./../../../../Api/content-api";
import "./styles.scss";

const contentTypes = [
  { _id: "1", name: { en: "Travel" } },
  { _id: "2", name: { en: "Book" } },
  { _id: "3", name: { en: "Game" } },
];
const ContentTypeFilter = props => {
  const { appLocale } = useLocale();
  const currentLang = languageManager.getCurrentLanguage().name;
  //const [{ contentTypes, spaceInfo }, dispatch] = useGlobalState();
  const [spinner, toggleSpinner] = useState(true);
  const [selected, setSelected] = useState({});
  // useEffect(() => {
  //   if (contentTypes === undefined || contentTypes.length === 0) {
  //     getContentTypes()
  //       .onOk(result => {
  //         dispatch({
  //           type: "SET_CONTENT_TYPES",
  //           value: result,
  //         });
  //       })
  //       .onServerError(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "error",
  //             message: languageManager.translate(
  //               "CONTENT_TYPE_ON_SERVER_ERROR"
  //             ),
  //           },
  //         });
  //       })
  //       .onBadRequest(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "error",
  //             message: languageManager.translate("CONTENT_TYPE_ON_BAD_REQUEST"),
  //           },
  //         });
  //       })
  //       .unAuthorized(result => {
  //         dispatch({
  //           type: "ADD_NOTIFY",
  //           value: {
  //             type: "warning",
  //             message: languageManager.translate("CONTENT_TYPE_UN_AUTHORIZED"),
  //           },
  //         });
  //       })
  //       .call(spaceInfo.id);
  //   }
  // }, []);
  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      const c = props.filters.find(item => item.type === "contentType");
      if (!c) {
        setSelected({});
      }
    }
  }, [props.filters]);

  function handleClick(item) {
    if (item._id !== selected._id) {
      setSelected(item);
      props.onContentTypeSelect(item);
    }
  }
  return (
    <div className="mp-p__ct">
      <div className="mp-p__ct__header">
        <span className="mp-p__ct__title">
          {appLocale["PRODUCTS_CONTENT_TYPE_TITLE"]}
        </span>
      </div>
      <div className="">
        {spinner
          ? [1, 2, 3].map(c => (
              <div className="radioSkeleton">
                <div className="post">
                  <div className="avatar" />
                  <div className="lines">
                    <div className="line" />
                  </div>
                </div>
              </div>
            ))
          : contentTypes.map(listItem => (
              <div className="mp-p__ct__row" key={listItem._id}>
                <label className="checkBox">
                  <input type="checkbox" id="invisible" />
                  <span className="checkmark" />
                </label>
                <label htmlFor="oneFileRadio">
                  {listItem.name[currentLang]}
                </label>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ContentTypeFilter;
