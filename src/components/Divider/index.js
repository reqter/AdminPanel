import React, { memo } from "react";
import "./styles.css";
const Divider = ({ children, ...props }) => {
  return <div className="hr-sect">{children}</div>;
};

export default memo(Divider);
