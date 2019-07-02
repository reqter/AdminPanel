import React from "react";
const baseUrl = process.env.REACT_APP_DOWNLOAD_FILE_BASE_URL;
export default function Image(props) {
  const { url } = props;
  return url ? <img src={baseUrl + url} alt="" /> : <img {...props} alt="" />;
}
