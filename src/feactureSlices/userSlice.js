import { createSlice } from "@reduxjs/toolkit";

const initialState =[
  {id:'0',name:'Admin'},
  {id:'1',name:'User'},
  {id:'2',name:'User2'}
];

const userSlice =createSlice({
  name:'users',
  initialState,
  reducers:{}
})
export const selectAllUsers = (state)=>state.users;
export default userSlice.reducer;