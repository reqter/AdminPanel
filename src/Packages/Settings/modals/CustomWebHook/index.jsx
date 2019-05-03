import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalFooter } from "reactstrap";
import { CircleSpinner } from "./../../../../components";
import { languageManager } from "../../../../services";
import "./styles.scss";

const CustomWebHook = props => {
  const nameRef = useRef(null);

  const updateMode = props.selctedWebhook ? true : false;

  const [spinner, toggleSpinner] = useState(false);
  const [tab, changeTab] = useState(1);

  const [name, setName] = useState("");
  const [url, setUrl] = useState();
  const [urlMethod, setUrlMethod] = useState("POST");

  const [triggerType, setTriggerType] = useState("all");
  const [filters, setFilters] = useState([{}]);

  const [payloadType, setPayLoadType] = useState("default");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function handleChangeTab(tabNum) {
    if (tab !== tabNum) {
      changeTab(tabNum);
      if (tab === 1) nameRef.current.focus();
    }
  }
  function handleChangeTrigger(e) {
    setTriggerType(e.target.value);
  }
  function handleChangePayload(e) {
    setPayLoadType(e.target.value);
  }
  function closeModal() {
    props.onClose();
  }
  return (
    <Modal isOpen={props.isOpen} toggle={closeModal} size="lg">
      <div className="custoWebhook">
        <div className="customWebhook-header">
          <div className="leftSide">
            <span>Custom Webhook</span>
          </div>
          <div className="rightSide">
            <div className="webhhookTabs">
              <div
                className={"webhookTabItem " + (tab === 1 ? "active" : "")}
                onClick={() => handleChangeTab(1)}
              >
                Detail
              </div>
              <div
                className={"webhookTabItem " + (tab === 2 ? "active" : "")}
                onClick={() => handleChangeTab(2)}
              >
                Triggers
              </div>
              <div
                className={"webhookTabItem " + (tab === 3 ? "active" : "")}
                onClick={() => handleChangeTab(3)}
              >
                Headers
              </div>
              <div
                className={"webhookTabItem " + (tab === 4 ? "active" : "")}
                onClick={() => handleChangeTab(4)}
              >
                PayLoad
              </div>
            </div>
          </div>
        </div>
        <div className="customWebhook-body">
          {tab === 1 && (
            <>
              <div className="form-group">
                <label>{languageManager.translate("Name")}</label>
                <input
                  type="text"
                  ref={nameRef}
                  className="form-control"
                  placeholder={languageManager.translate("Enter a name")}
                  required
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  {languageManager.translate("Name is required ")}
                </small>
              </div>
              <div className="form-group">
                <label>{languageManager.translate("URL")}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={languageManager.translate("Enter a url")}
                  required
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value);
                  }}
                />
                <small className="form-text text-muted">
                  {languageManager.translate("URL is required ")}
                </small>
              </div>
              <div className="urlMethods">
                <label>{languageManager.translate("Metho Type")}</label>
                <div className="urlMethods-btns">
                  <button
                    className={
                      "btn " +
                      (urlMethod === "POST" ? "btn-primary" : "btn-light")
                    }
                    onClick={() => setUrlMethod("POST")}
                  >
                    POST
                  </button>
                  <button
                    className={
                      "btn " +
                      (urlMethod === "GET" ? "btn-primary" : "btn-light")
                    }
                    onClick={() => setUrlMethod("GET")}
                  >
                    GET
                  </button>
                  <button
                    className={
                      "btn " +
                      (urlMethod === "PUT" ? "btn-primary" : "btn-light")
                    }
                    onClick={() => setUrlMethod("PUT")}
                  >
                    PUT
                  </button>
                  <button
                    className={
                      "btn " +
                      (urlMethod === "PATCH" ? "btn-primary" : "btn-light")
                    }
                    onClick={() => setUrlMethod("PATCH")}
                  >
                    PATCH
                  </button>
                  <button
                    className={
                      "btn " +
                      (urlMethod === "DELETE" ? "btn-primary" : "btn-light")
                    }
                    onClick={() => setUrlMethod("DELETE")}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <div className="triggerType">
                <div className="title">
                  Specify for what kind of events this webhook should be
                  triggered.
                </div>
              </div>
              <div className="custom_checkbox ">
                <div className="left">
                  <label className="radio">
                    <input
                      type="radio"
                      value="all"
                      checked={triggerType === "all"}
                      name="triggerType"
                      onChange={handleChangeTrigger}
                      id="allEvent"
                    />
                    <span className="checkround" />
                  </label>
                </div>
                <div className="right">
                  <label for="allEvent">Trigger for all events</label>
                  <label for="allEvent">
                    Select this if there is only one thing to store For
                  </label>
                </div>
              </div>
              <div className="custom_checkbox ">
                <div className="left">
                  <label className="radio">
                    <input
                      type="radio"
                      value="custom"
                      checked={triggerType === "custom"}
                      name="triggerType"
                      onChange={handleChangeTrigger}
                      id="customEvents"
                    />
                    <span className="checkround" />
                  </label>
                </div>
                <div className="right">
                  <label for="customEvents">
                    Select specific triggering events
                  </label>
                  <label for="customEvents">
                    example, a single photo or one PDF file
                  </label>
                </div>
              </div>
              {triggerType === "custom" && (
                <div className="customTriggerEvents">
                  <table className="table">
                    <thead>
                      <th />
                      <th>Create</th>
                      <th>Save</th>
                      <th>Archive</th>
                      <th>Unarchive</th>
                      <th>Publish</th>
                      <th>Unpublish</th>
                      <th>Delete</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="title">Content</div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="title">Asset</div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="title" />
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="chk">
                            <div className="custom_checkbox">
                              <div className="left">
                                <label className="checkBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {tab === 3 && (
            <>
              <div className="customWebhook-filters">
                <div className="filters-title">Custom Header</div>
                <div className="filters-message">
                  This webhook will trigger only for entities matching the
                </div>
                <div className="filter-content">
                  {filters.map((item, index) => (
                    <div className="options" key={index}>
                      <div className="leftInput">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="centerInput">
                        <input type="text" className="form-control" />
                      </div>

                      <div className="rightInput">
                        <button className="btn btn-light">
                          <i className="icon-bin" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary btn-plus btn-sm">
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
              <div className="customWebhook-filters">
                <div className="filters-title">Secret Header</div>
                <div className="filters-message">
                  This webhook will trigger only for entities matching the
                </div>
                <div className="filter-content">
                  {filters.map((item, index) => (
                    <div className="options" key={index}>
                      <div className="leftInput">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="centerInput">
                        <input type="text" className="form-control" />
                      </div>

                      <div className="rightInput">
                        <button className="btn btn-light">
                          <i className="icon-bin" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary btn-plus btn-sm">
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
              <div className="customWebhook-filters">
                <div className="filters-title">HTTP Basic Auth Header</div>
                <div className="filters-message">
                  This webhook will trigger only for entities matching the
                </div>
                <div className="filter-content">
                  {filters.map((item, index) => (
                    <div className="options" key={index}>
                      <div className="leftInput">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="centerInput">
                        <input type="text" className="form-control" />
                      </div>

                      <div className="rightInput">
                        <button className="btn btn-light">
                          <i className="icon-bin" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-primary btn-plus btn-sm">
                    <i className="icon-plus" />
                  </button>
                </div>
              </div>
              <div className="headerContentType">
                <div className="form-group">
                  <label>{languageManager.translate("Content Type")}</label>
                  <select className="form-control">
                    <option>
                      application/vnd.contentful.management.v1+json
                    </option>
                    <option>
                      application/vnd.contentful.management.v1+json;
                      charset=utf-8
                    </option>
                    <option>application/json</option>
                    <option>application/json; charset=utf-8</option>
                    <option>application/x-www-form-urlencoded</option>
                    <option>
                      application/x-www-form-urlencoded; charset=utf-8
                    </option>
                  </select>
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      "Select one of allowed MIME types to be used as the value of the Content-Type header. Any custom Content-Type header will be ignored."
                    )}
                  </small>
                </div>
              </div>
              <div className="custom_checkbox">
                <div className="left">
                  <label className="checkBox">
                    <input type="checkbox" id="contentLength" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="right">
                  <label for="contentLength">
                    {languageManager.translate("Content Length")}
                  </label>
                  <label for="contentLength">
                    {languageManager.translate(
                      "If this option is selected, the byte size of the final request body will be computed and used as the value of the Content-Length header."
                    )}
                  </label>
                </div>
              </div>
            </>
          )}
          {tab === 4 && (
            <>
              <div className="triggerType">
                <div className="title">
                  You can customize the webhook payload to match the format
                  expected by the service your webhook calls
                </div>
              </div>
              <div className="custom_checkbox ">
                <div className="left">
                  <label className="radio">
                    <input
                      type="radio"
                      value="default"
                      checked={payloadType === "default"}
                      name="payloadType"
                      onChange={handleChangePayload}
                      id="defaultPayLoad"
                    />
                    <span className="checkround" />
                  </label>
                </div>
                <div className="right">
                  <label for="defaultPayLoadt">Use default payload</label>
                  <label for="defaultPayLoad">
                    Select this if there is only one thing to store For
                  </label>
                </div>
              </div>
              <div className="custom_checkbox">
                <div className="left">
                  <label className="radio">
                    <input
                      type="radio"
                      value="custom"
                      checked={payloadType === "custom"}
                      name="payloadType"
                      onChange={handleChangePayload}
                      id="customPayload"
                    />
                    <span className="checkround" />
                  </label>
                </div>
                <div className="right">
                  <label for="customPayload">
                    Customize the webhook payload
                  </label>
                  <label for="customPayload">
                    example, a single photo or one PDF file
                  </label>
                </div>
              </div>
              {payloadType === "custom" && (
                <div className="form-group" style={{ marginTop: 35 }}>
                  <textarea className="form-control" />
                  <small className="form-text text-muted">
                    {languageManager.translate(
                      `Custom payload can be any valid JSON value. To resolve a value from the original webhook payload use a JSON pointer wrapped with curly braces.

                        Example:
                            {
                            "entityId": "{ /payload/sys/id }",
                            "spaceId": "{ /payload/sys/space/sys/id }",
                            "parameters": {
                                "text": "Entity version: { /payload/sys/version }"
                            }
                        }`
                    )}
                  </small>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ModalFooter>
        <button onClick={closeModal} className="btn btn-secondary">
          {languageManager.translate("CANCEL")}
        </button>
        <button
          type="submit"
          className="btn btn-primary ajax-button"
          disabled={name.length > 0 ? false : true}
        >
          <CircleSpinner show={spinner} size="small" />
          <span>{updateMode ? "Update" : "Create"}</span>
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomWebHook;
