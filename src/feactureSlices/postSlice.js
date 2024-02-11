import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { nanoid } from "nanoid";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  // console.log(response.data);
  return response.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "Loading...";
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "Suceed!!";
        //added date and reactions

        // Filter out posts with duplicate ids
        const uniquePosts = action.payload.filter((newPost) => {
          return !state.posts.some(
            (existingPost) => existingPost.id === newPost.id
          );
        });

        //loading the date and reactions
        const loadPosts = uniquePosts.map((post) => {
          let min = 1;
          post.Date = sub(new Date(), { minutes: min++ }).toISOString;
          post.reactions = {
            thumsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          // console.log(post);
          return post;
        });

        //added fetched post to array posts[] in the initial state
        state.posts = state.posts.concat(loadPosts);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed..";
        state.error = action.error.message;
      });
  },
});
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getErrorMsg = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
