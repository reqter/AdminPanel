import React from "react";
import "./styles.scss";
import { useGlobalState } from "./../../services";
const Notifies = props => {
  const [{ notifies }, dispatch] = useGlobalState();
  function remove(item) {
    dispatch({
      type: "REMOVE_NOTIFY",
      value: item
    });
  }
  return (
    notifies.length > 0 && (
      <div className="notifies">
        {notifies.map(notify => {
          if (notify.type === "success") {
            notify.icon = "icon-checkmark";
          } else if (notify.type === "error") {
            notify.icon = "icon-shield";
          } else {
            notify.icon = "icon-warning";
          }
          return (
            <div
              className="custom-notify animated slideInRight faster"
              key={notify.id}
            >
              <div
                className="leftbox"
                style={{
                  background:
                    notify.type === "success"
                      ? "rgb(54,179,126)"
                      : notify.type === "error"
                      ? "rgb(255,86,48)"
                      : notify.type === "warning"
                      ? "rgb(255,171,0)"
                      : ""
                }}
              >
                <i className={notify.icon} />
              </div>
              <div
                className="centerbox"
                style={{
                  background:
                    notify.type === "success"
                      ? "rgb(227,252,239)"
                      : notify.type === "error"
                      ? "rgb(255,235,230)"
                      : notify.type === "warning"
                      ? "rgb(255,250,230)"
                      : "",
                  color:
                    notify.type === "success"
                      ? "rgb(54,179,126)"
                      : notify.type === "error"
                      ? "rgb(255,86,48)"
                      : notify.type === "warning"
                      ? "rgb(255,171,0)"
                      : ""
                }}
              >
                {notify.message}
              </div>
              <div
                className="rightbox"
                style={{
                  background:
                    notify.type === "success"
                      ? "rgb(227,252,239)"
                      : notify.type === "error"
                      ? "rgb(255,235,230)"
                      : notify.type === "warning"
                      ? "rgb(255,250,230)"
                      : ""
                }}
                onClick={() => remove(notify)}
              >
                <i
                  className="icon-cross"
                  style={{
                    color:
                      notify.type === "success"
                        ? "rgb(54,179,126)"
                        : notify.type === "error"
                        ? "rgb(255,86,48)"
                        : notify.type === "warning"
                        ? "rgb(255,171,0)"
                        : ""
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Notifies;
