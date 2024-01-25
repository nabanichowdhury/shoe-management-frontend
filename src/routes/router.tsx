import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProductDetails from "../pages/ProductDetails";
import MyProducts from "../pages/MyProducts";
import MyBuyers from "../pages/MyBuyers";
import DashBoardlayout from "../layout/DashBoardlayout";
import Home from "../pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/dashboard",
    element: <DashBoardlayout></DashBoardlayout>,
    children: [
      {
        path: '/dashboard/products',  // Combine parent and child route paths
        element: <ProductDetails></ProductDetails>
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