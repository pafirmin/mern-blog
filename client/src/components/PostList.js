import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tag from "./Tag";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      const postList = res.data;

      setPosts(postList);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.text}</p>
          <div>
            {post.tags.map((tag) => (
              <Tag key={tag._id} tag={tag} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
