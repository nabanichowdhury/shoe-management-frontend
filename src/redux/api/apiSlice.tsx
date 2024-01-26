// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const api=createApi({
//     reducerPath:'api',
//     baseQuery:fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
//     endpoints:()=>({})
// })
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: 'api',
    
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: () => ({

    })
})