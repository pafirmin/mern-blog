import React, { useState, useEffect } from "react";
import axios from "axios";

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
          <h2>{post.title}</h2>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
