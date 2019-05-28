import React from "react";
import "./styles.scss";
const ProgressiveSpinner = props => {
  function handleClick() {
    if (props.onCancel) {
      props.onCancel();
    }
  }
  return (
    <div class={"item progress-" + props.value}>
      <div class="radial-inner-bg" />
      <span className="percent">{props.value ? props.value : "0"}%</span>
      <span
        className="cancel icon-cross"
        title="Cancel uploading"
        onClick={handleClick}
      />
    </div>
  );
};
export default ProgressiveSpinner;
