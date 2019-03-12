import Login from "./Packages/Login";
import Signup from "./Packages/Signup";
import Home from "./Packages/Home";
const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: Signup
  },
  {
    path: "/home",
    component: Home
  }
];
export default routes;
