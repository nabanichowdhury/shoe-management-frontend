import {configureStore } from "@reduxjs/toolkit"

import {api} from './api/apiSlice'
import userReducer from "./features/users/userSlice";
import productReducer from "./features/products/productSlice";
import salesReducer from "./features/sales/salesSlice";
import shoeReducer from "./features/shoes/shoeSlice";
export const store=configureStore({
    reducer:{
        product:shoeReducer,
        sales:salesReducer,
        shoe:productReducer,
        user:userReducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)



})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch