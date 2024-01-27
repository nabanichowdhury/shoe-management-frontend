import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Iuser {
    // Define your user interface properties here
    _id:string,
    name: string;
    email: string;
    password: string;
  }
  
  const initialState: Iuser = {
    _id:'',
    name: '',
    email: '',
    password: '',
  };
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userAdd:(state,action:PayloadAction<Iuser>)=>{
          state._id=action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;

        }

    }

})
export const {userAdd}=userSlice.actions
export default userSlice.reducer