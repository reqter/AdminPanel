import Login from "./Packages/Login";
import Signup from "./Packages/Signup";
import Home from "./Packages/Home";
import UpsertProduct from "./Packages/UpsertProduct";
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
  },
  {
    path: "/addNew",
    component: UpsertProduct
  },
  {
    path: "/edit",
    component: UpsertProduct
  }
];
export default routes;
