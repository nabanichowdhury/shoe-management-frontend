import { api } from "../../api/apiSlice";

const productApi=api.injectEndpoints({
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:({token})=>({
                url:`/products`,
                method:'GET',
                headers:{
                    authorization:token
                }

            }),
            
        }),

    })
})
export const {useGetAllProductsQuery}=productApi