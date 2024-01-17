import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { sub } from "date-fns";

const initialState = [
  {
    id: "0",
    name: "React JS",
    content:
      "React js is a javascript library used to create single page applications",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "1",
    name: "Redux",
    content: "Redux is used to manage the global state of the appliations",
    date: sub(new Date(), { minutes: 6 }).toISOString(),
    reactions: {
      thumsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, content, userId) {
        return {
          payload: {
            id: nanoid(),
            name,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }  
    },
  },
});
export const selectAllPosts = (state) => state.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
