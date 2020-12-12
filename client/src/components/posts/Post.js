import React from "react";
import Tag from "../tags/Tag";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({ post }) => {
  return (
    <div style={{ marginTop: "12px" }}>
      <Link to={`/posts/${post._id}`}>
        <header className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <span style={{ fontSize: ".9rem" }}>
            Posted by
            <span style={{ fontWeight: "800" }}> {post.user.username}</span> on{" "}
            <time>{moment(post.date).format("dddd[,] Do MMM YYYY")}</time>
          </span>
        </header>
      </Link>
      <div className="post-content">
        <div>{post.text}</div>
        <div>
          Tags:
          {post.tags.map((tag) => (
            <Tag key={tag._id} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
