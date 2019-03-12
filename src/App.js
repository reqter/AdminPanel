import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/app.scss";
import "animate.css"

import Routes from "./routes";

class App extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.setState({
      loading: false
    });
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="loaderContainer">
            <div className="loader">
              <div className="text">Loading</div>
              <div className="dots">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        ) : (
          undefined
        )}

        <div>
          <Switch>
            {Routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                render={props => {
                  const Component = route.component;
                  return <Component {...props} />;
                }}
              />
            ))}
            {/* <Route to="/not-found" render={props=><NoutFound/>}/> */}
            {/* اگه دقیقا / رو زد برو لاگین */}
            <Redirect from="/" to="/home" exact />
            {/* اگه هیچی نزد یا چرت و پرت زد برو اون روتی که نات فاند هست */}
            {/* <Redirect to="/not-found"/> */}
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
