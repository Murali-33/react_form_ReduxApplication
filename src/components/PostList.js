import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostStatus,
  getErrorMsg,
  fetchPosts,
} from "../feactureSlices/postSlice";
import PostListExports from "./PostListExports";


function PostList() {
  const posts = useSelector(selectAllPosts);
  const postSatus = useSelector(getPostStatus);
  const error = useSelector(getErrorMsg);
  const dispatch = useDispatch();

  //use Effect
  useEffect(() => {
    if (postSatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postSatus, dispatch]);


  let content;
    if(postSatus === 'Loading...'){
      content = <p>Loading...</p>
    }
  else if(postSatus === 'Suceed!!'){
    const orderedPosts = posts.slice().sort((a, b) => {
      // Check if 'date' is defined before using 'localeCompare'
      return a.date && b.date ? b.date.localeCompare(a.date) : 0;
    });
    content = orderedPosts.map((post) => <PostListExports key={post.id} post={post}/>);
  } else if(postSatus === 'failed..'){
    content = <p>{error}</p>
  }


  return (
    <section>
      <h4>Post Lists...</h4>
      {content}
    </section>
  );
}

export default PostList;
