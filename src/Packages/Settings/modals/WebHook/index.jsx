import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { languageManager, useGlobalState } from "../../../../services";
import { updateSpace } from "./../../../../Api/space-api";
import { CircleSpinner } from "../../../../components";
import "./styles.scss";
const currentLang = languageManager.getCurrentLanguage().name;
const list = [
  {
    name: "heroku",
    title: {
      en: "Heroku",
    },
    description: "lorem ipsum bundle manager to get a better localization",
    icon: "https://img.icons8.com/color/260/heroku.png",
  },
  {
    name: "edlasticsearch",
    title: {
      en: "Elasticsearch",
    },
    description: "lorem ipsum bundle manager to",
    icon: "https://cdn.worldvectorlogo.com/logos/elastic-elasticsearch.svg",
  },
];

const WebHookCreating = props => {
  const [{ spaceInfo }, dispatch] = useGlobalState();

  const [spinner, toggleSpinner] = useState(false);
  const [tab, changeTab] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {}, []);

  function showNotify(type, msg) {
    dispatch({
      type: "ADD_NOTIFY",
      value: {
        type: type,
        message: msg,
      },
    });
  }
  function closeModal() {
    props.onClose();
  }
  function handleSelectTemplate(item) {
    setSelectedTemplate(item);
    changeTab(2);
  }
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>
        {tab === 1 && "WebHook Templates"}
        {tab === 2 && "Complete Info"}
      </ModalHeader>
      <ModalBody>
        <div className="webhooksBody">
          {tab === 1 && (
            <div className="fristTab">
              {list.map(item => (
                <div
                  className="webhookItem"
                  onClick={() => handleSelectTemplate(item)}
                >
                  <div className="w-top">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="w-bottom">
                    <span>{item.title[currentLang]}</span>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 2 && (
            <>
              <div className="form-group">
                <label>{languageManager.translate("Name")}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={languageManager.translate(
                    "enter a name for your webhook"
                  )}
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  {languageManager.translate("name is required")}
                </small>
              </div>
              <div className="form-group">
                <label>{languageManager.translate("Description")}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={languageManager.translate(
                    "enter a short description"
                  )}
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  {languageManager.translate("name is required")}
                </small>
              </div>
            </>
          )}
        </div>
      </ModalBody>
      {tab === 2 && (
        <ModalFooter>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Create</button>
        </ModalFooter>
      )}
    </Modal>
  );
};
export default WebHookCreating;
