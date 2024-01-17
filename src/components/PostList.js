import React from 'react';
import { useSelector } from "react-redux";
import {selectAllPosts} from '../feactureSlices/postSlice';
import PostAuthor from '../components/PostAuthor';
import TimeAgo from '../components/TimeAgo';
import ReactionButton  from '../components/ReactionButton';

function PostList() {
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
  const renderedPosts = orderedPosts.map(post => (
    <article key={post.id}>
        <h5>{post.name}</h5>
        <p>{post.content.substring(0, 100)}</p>
        <p className='.postCredit'>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButton post={post}/>
        </p>
    </article>
))
  return (
    <section>
      <h4>Posts</h4>
      {renderedPosts}
    </section>
  )
}

export default PostList
