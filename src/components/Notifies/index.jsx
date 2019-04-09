import React from "react";
import "./styles.scss";
import { useGlobalState } from "./../../services";
import NotifyItem from "./notifyItem";
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
            <NotifyItem notify={notify} onRemove={remove} key={notify.id} />
          );
        })}
      </div>
    )
  );
};

export default Notifies;
