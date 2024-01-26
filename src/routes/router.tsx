import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProductDetails from "../pages/AllProducts";
import MyProducts from "../pages/MyProducts";
import MyBuyers from "../pages/MyBuyers";
import DashBoardlayout from "../layout/DashBoardlayout";
import PrivateRoute from "./PrivateRoute";
import AllProducts from "../pages/AllProducts";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/dashboard",
    element:<PrivateRoute><DashBoardlayout></DashBoardlayout></PrivateRoute> ,
    children: [
      
      {
        path: '/dashboard/products',  // Combine parent and child route paths
        element: <AllProducts></AllProducts>
      },
      {
        path: '/dashboard/myProducts',  // Combine parent and child route paths
        element: <MyProducts></MyProducts>
      },
      {
        path: '/dashboard/mySoldProducts',  // Combine parent and child route paths
        element: <MyProducts></MyProducts>
      },
      {
        path: '/dashboard/myBuyers',  // Combine parent and child route paths
        element: <MyBuyers></MyBuyers>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signUp',
    element: <SignUp />
  }
]);