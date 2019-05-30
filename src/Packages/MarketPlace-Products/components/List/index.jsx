import React, { useState, useEffect, useRef } from "react";
import { useTheme, useLayout, useLocale } from "../../../../hooks";

import themes from "../../../../themes";
import layouts from "../../../../Layouts";

const MarketPlace_List = props => {
  const { setLocale } = useLocale();

  function changeLang() {
    setLocale("fa");
  }

  return (
    <div />
    // <div style={{ width: 500, height: 500, marginTop: 100, marginLeft: 500 }}>
    //   <button className="btn btn-primary" onClick={changeLang}>
    //     Change Language
    //   </button>

    // </div>
  );
};

export default MarketPlace_List;
