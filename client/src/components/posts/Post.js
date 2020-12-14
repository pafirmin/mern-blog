import React from "react";
import Tag from "../tags/Tag";
import Header from "./PostHeader";
import { truncate } from "lodash";

const Post = ({ post, snippet }) => {
  return (
    <div style={{ marginTop: "12px" }}>
      <Header post={post} />
      <div className="post-content">
        <div style={{ whiteSpace: "pre-wrap" }}>
          {snippet
            ? truncate(post.text, {
                length: 250,
                separator: " ",
                omission: " [...]",
              })
            : post.text}
        </div>
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
