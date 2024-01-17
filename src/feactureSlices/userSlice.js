import { createSlice } from "@reduxjs/toolkit";

const initialState =[
  {id:'0',name:'Murali'},
  {id:'1',name:'Vijay'},
  {id:'2',name:'Rohit'}
];

const userSlice =createSlice({
  name:'users',
  initialState,
  reducers:{}
})
export const selectAllUsers = (state)=>state.users;
export default userSlice.reducer;