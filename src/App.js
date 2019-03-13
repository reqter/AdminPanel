import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/app.scss";
import "animate.css";

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

// function makeData(len = 10) {
//   return range(len).map(d => {
//     return {
//       ...newProduct(),
//       children: range(10).map(newProduct)
//     };
//   });
// }

// function newProduct() {
//   return {
//     thumbnail:
//       "https://myresources1195.blob.core.windows.net/images/banana.jpg",
//     name: "موز ممتاز",
//     description: "محصولات وارداتی از افریقا",
//     price: "2500 $",
//     brand: "Banana"
//   };
// }
// function range(len) {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// }
//   function createTree(list) {
//     var map = {},
//       node,
//       roots = [],
//       i;
//     for (i = 0; i < list.length; i += 1) {
//       map[list[i].id] = i; // initialize the map
//       list[i].children = []; // initis
//     }
//     for (i = 0; i < list.length; i += 1) {
//       node = list[i];
//       if (node.parentId) {
//         // if you have dangling branches check that map[node.parentId] exists
//         list[map[node.parentId]].children.push(node);
//       } else {
//         roots.push(node);
//       }
//     }
//     return roots;
//   }
