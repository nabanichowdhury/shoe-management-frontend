import { api } from "../../api/apiSlice";

const salesApi=api.injectEndpoints({
    endpoints:(builder)=>({
        postSale:builder.mutation({
            query:(data)=>({
                url:`/sales`,
                method:'POST',
                body:data,
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                invalidatesTags: ['products'],

            }),
            
        }),
        getBuyerOfSeller:builder.query({
            query:(id)=>({
                url:`/sales/${id}`,
                method:'GET',
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                providesTags: ['products'],

            }),
            
        }),
    })
})
export const {usePostSaleMutation,useGetBuyerOfSellerQuery}=salesApi