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
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
      <ModalHeader toggle={closeModal}>WebHook Templates</ModalHeader>
      <ModalBody>
        <div className="webhooksBody">
          <div className="fristTab">
            {list.map(item => (
              <div className="webhookItem">
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
        </div>
      </ModalBody>
    </Modal>
  );
};
export default WebHookCreating;
