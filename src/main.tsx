import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import {routes } from './routes/router';

import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
    
  </React.StrictMode>,
)
