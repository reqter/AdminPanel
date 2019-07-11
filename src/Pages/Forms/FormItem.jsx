import React, { useState, useCallback, useEffect } from "react";
import Dropdown from "reactstrap/lib/Dropdown";
import DropdownItem from "reactstrap/lib/DropdownItem";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
//
import { useLocale } from "./../../hooks";
import { DateFormatter } from "../../components";
//
export default function FormItem(props) {
  const dataLanguage = "fa";
  const { currentLang, t } = useLocale();
  const { data } = props;
  const [dropDown, toggleDropDown] = useState(false);

  function handleDropDownVisibility() {
    toggleDropDown(prevState => !prevState);
  }

  const handleDelete = useCallback(() => {
    if (props.onDeleteForm) {
      props.onDeleteForm(data);
    }
  }, []);
  const handleEdit = useCallback(() => {
    if (props.onEditForm) {
      props.onEditForm(data);
    }
  }, []);
  const handlePublish = useCallback(() => {
    if (props.onPublishForm) {
      props.onPublishForm(data);
    }
  }, []);
  const handleUnPublish = useCallback(() => {
    if (props.onUnPublishForm) {
      props.onUnPublishForm(data);
    }
  }, []);
  const handleArchive = useCallback(() => {
    if (props.onArchiveForm) {
      props.onArchiveForm(data);
    }
  }, []);
  const handleUnArchive = useCallback(() => {
    if (props.onUnArchiveForm) {
      props.onUnArchiveForm(data);
    }
  }, []);

  return (
    <div className="formItem">
      <div className="formItem__top">
        <img
          src="https://wallup.net/wp-content/uploads/2016/03/09/260080-minimalism-digital_art-simple-flowers-748x468.png"
          alt=""
        />
        <div className="formItem__Partner">
          <img
            src="https://amp.businessinsider.com/images/58486129ba6eb604688b6f51-750-500.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="formItem__bottom">
        <h6>
          {data.title && data.title[dataLanguage] && data.title[dataLanguage]}
        </h6>
        <div className="actions_date">
          <i className="icon-calendar" />
          <span>
            <DateFormatter date={data.sys.issueDate} />
          </span>
          <Dropdown isOpen={dropDown} toggle={handleDropDownVisibility}>
            <DropdownToggle className="btn btn-light btn-sm" color="primary">
              <i className="icon-more-h" />
            </DropdownToggle>
            <DropdownMenu>
              {data.status !== "published" && data.status !== "archived" && (
                <DropdownItem onClick={handleDelete}>
                  {t("DELETE")}
                  {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("DELETE")}</span> */}
                </DropdownItem>
              )}
              <DropdownItem onClick={handleEdit}>
                {t("EDIT")}
                {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("EDIT")}</span> */}
              </DropdownItem>
              {(data.status === "draft" || data.status === "changed") && (
                <>
                  <DropdownItem onClick={handlePublish}>
                    {t("PUBLISH")}
                    {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("PUBLISH")}</span> */}
                  </DropdownItem>
                  <DropdownItem onClick={handleArchive}>
                    {t("ARCHIVE")}
                    {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("ARCHIVE")}</span> */}
                  </DropdownItem>
                </>
              )}
              {data.status === "archived" && (
                <DropdownItem onClick={handleUnArchive}>
                  {t("UN_ARCHIVE")}
                  {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("ARCHIVE")}</span> */}
                </DropdownItem>
              )}
              {data.status === "published" && (
                <DropdownItem onClick={handleUnPublish}>
                  {t("UN_PUBLISH")}
                  {/* <span className="icon-bin dropdown__icon" />
                <span className="dropdown__text">{t("ARCHIVE")}</span> */}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="formItem__status">{t(data.status)}</div>
      </div>
    </div>
  );
}
