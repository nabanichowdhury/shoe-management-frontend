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
              url: '/user/login', // Assuming user login endpoint is /users
              method: 'POST',
              body: credentials,
            }),
          }),
          getSingleUser:builder.query({
            query:(id)=>({url:`/user/${id}`})
          })
          
        
        
    })

})
export const {useCreateUserMutation,useLoginUserMutation,useGetSingleUserQuery}=userApi

