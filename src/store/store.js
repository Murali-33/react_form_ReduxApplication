import { configureStore } from '@reduxjs/toolkit';
import   postReducer from '../feactureSlices/postSlice';
import   userReducer from '../feactureSlices/userSlice';

 export const store = configureStore({
  reducer:{
    posts:postReducer,
    users:userReducer
  }
})
