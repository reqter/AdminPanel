import React from "react";
import SideBar from "./components/SideBar";
import "./styles.scss";

const Home = props => {
  return (
    <div className="mainPage">
      <div className="mainPage__left">
        <SideBar links={[]} />
      </div>
      <div className="mainPage__right">{props.routes}</div>
    </div>
  );
};
export default Home;
