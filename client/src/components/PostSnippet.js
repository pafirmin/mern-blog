import React from "react";
import Tag from "./Tag";

const PostSnippet = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div>
        {post.tags.map((tag) => (
          <Tag key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default PostSnippet;
