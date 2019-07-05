import React from "react";
import SideBar from "./components/SideBar";
import EmailEditor from "react-email-editor";
import "./styles.scss";

const Home = props => {
  return (
    <div className="page-wrapper">
      <SideBar links={[]} />
      <main className="main">
        {props.routes}
        {/* <EmailEditor/> */}
      </main>
    </div>
  );
};
export default Home;
