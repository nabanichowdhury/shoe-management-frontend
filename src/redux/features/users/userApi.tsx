import { api } from "../../api/apiSlice";

const userApi=api.injectEndpoints({
    endpoints:(builder)=>({
        
        createUser:builder.mutation({
            query:(data)=>({
                url:`/user`,
                method:'POST',
                body:data

            }),
            
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
              url: '/user/login', 
              method: 'POST',
              body: credentials,
            }),
          }),
          getSingleUser:builder.query({
            query:(id)=>({
                url:`product/user/${id}`,
                method:'GET',
                headers:{
                    'content-type': 'application/json', 
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                providesTags: ['comments'],

            }),
          }),
          
          
        
        
    })

})
export const {useCreateUserMutation,useLoginUserMutation,useGetSingleUserQuery}=userApi

