import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`}>
      <header className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <span style={{ fontSize: ".9rem" }}>
          Posted by
          <span style={{ fontWeight: "800" }}>
            {" "}
            {post.user.username}
          </span> on{" "}
          <time>{moment(post.date).format("dddd[,] Do MMM YYYY")}</time>
        </span>
      </header>
    </Link>
  );
};

export default PostHeader;
