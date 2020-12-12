import React from "react";
import Tag from "../tags/Tag";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const Post = ({ post }) => {
  return (
    <div className="post-wrapper">
      <Link to={`/posts/${post._id}`}>
        <header className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <date>{moment(post.date).format("dddd[,] Do MMM YYYY")}</date>
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
