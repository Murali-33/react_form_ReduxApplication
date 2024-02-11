import PostAuthor from "../components/PostAuthor";
import TimeAgo from "../components/TimeAgo";
import ReactionButton from "../components/ReactionButton";

function PostListExports({ post }) {
  return (
    <article key={post.id}>
      <h5 style={{ color: "green" }}>{post.title}</h5>
      {post.body && <p>{post.body.substring(0, 200)}</p>}
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButton post={post} />
      </p>
    </article>
  );
}

export default PostListExports;
