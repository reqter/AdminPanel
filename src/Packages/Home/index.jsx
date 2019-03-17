import React from "react";
import SideBar from "./components/SideBar";
import "./styles.scss";

const Home = props => {
  return (
    <div className="page-wrapper">
      <SideBar links={[]} />
      <main className="main">
        {props.routes}
        {/* {links.map(link => (
          <Route
            exact
            key={link.path}
            path={link.path}
            render={props => {
              const Component = link.component;
              const p = { ...props, component: link };
              return (
                <StateProvider>
                  <Component {...p} />
                </StateProvider>
              );
            }}
          />
        ))} */}
      </main>
    </div>
  );
};
export default Home;
