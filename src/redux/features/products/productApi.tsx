import { api } from "../../api/apiSlice";

const productApi=api.injectEndpoints({
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>({
                url:`/products`,
                method:'GET',
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                providesTags: ['products'],

            }),
            
            
        }),
        postProduct:builder.mutation({
            query:(product)=>({
                url:'/product',
                method:'POST',
                body:product,
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                invalidatesTags: ['products'],
            })
        }),
        deleteProducts:builder.mutation({
            query:(product)=>({
                url:'/products',
                method:'DELETE',
                body:product,
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                invalidatesTags: ['products'],
            })
        }),
        updateProduct:builder.mutation({
            query:({id,shoe})=>({
                url:`/updateProduct/${id}`,
                method:'POST',
                body:shoe,
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                invalidatesTags: ['products'],
            })
        }),
       

    })
})
export const {useGetAllProductsQuery,usePostProductMutation,useDeleteProductsMutation,useUpdateProductMutation}=productApi