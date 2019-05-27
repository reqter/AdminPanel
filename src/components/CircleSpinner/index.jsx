import React from "react";
import "./styles.scss";
const CircleSpinner = props => {
  const classNames =
    "circeSpinnerLoader " +( props.size === "small"
      ? "smallCircleSpinner"
      : props.size === "medium"
      ? "mediumCircleSpinner"
      : props.size === "large"
      ? "largeCircleSpinner"
      : "smallCircleSpinner");
  return props.show ? (
    <div
      style={{
        borderColor: props.bgColor || "#f3f3f3",
        borderTopColor: props.color || "rgb(56,132,255)",
      }}
      className={classNames}
    />
  ) : null;
};
export default CircleSpinner;
