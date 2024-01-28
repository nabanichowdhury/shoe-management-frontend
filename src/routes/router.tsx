import {  createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

import MyProducts from "../pages/MyProducts";
import MyBuyers from "../pages/MyBuyers";
import DashBoardlayout from "../layout/DashBoardlayout";
import PrivateRoute from "./PrivateRoute";
import AllProducts from "../pages/AllProducts";
import AddProductForm from "../pages/AddProductForm";
import MySoldProducts from "../pages/MySoldProducts";
import UpdateProduct from "../pages/UpdateProduct";
import SellProduct from "../pages/SellProduct";
import SalesReport from "../pages/SalesReport";
import FilterProduct from "../pages/FilterProduct";

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
        element: <MySoldProducts></MySoldProducts>
      },
      {
        path: '/dashboard/myBuyers',  // Combine parent and child route paths
        element: <MyBuyers></MyBuyers>
      },
      {
        path: '/dashboard/addProduct',  // Combine parent and child route paths
        element: <AddProductForm></AddProductForm>
      },
      {
        path: '/dashboard/updateProduct',  // Combine parent and child route paths
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: '/dashboard/sellProduct',  // Combine parent and child route paths
        element: <SellProduct></SellProduct>
      },
      {
        path: '/dashboard/salesReport',  // Combine parent and child route paths
        element: <SalesReport></SalesReport>
      },
      {
        path: '/dashboard/filterProduct',  // Combine parent and child route paths
        element: <FilterProduct></FilterProduct>
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