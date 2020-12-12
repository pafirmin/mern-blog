import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../LoadingContext";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/posts");
      const postList = res.data;

      setLoading(false);
      setPosts(postList);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {posts.map((post) => (
        <div
          style={{ borderBottom: "1px solid #c5c5c5", paddingBottom: "8px" }}
        >
          <Post key={post._id} post={post} />
          <Link to={`/posts/${post._id}#comments`}>
            <span style={{ marginLeft: "12px" }}>
              {post.comments.length} comments
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
