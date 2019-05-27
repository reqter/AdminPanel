import React from "react";
import "./styles.scss";
const ProgressiveSpinner = props => {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }
  return (
    <div class="arc-container">
      <div class="arc-overlay" />
      <div class="arc-hider" />
      <div class="arc-wrapper">
        <div class="arc1" />
        <div class="arc2" />
      </div>
    </div>
  );
};
export default ProgressiveSpinner;
