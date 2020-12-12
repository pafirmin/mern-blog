import React, { useEffect, useState } from "react";
import Post from "../posts/Post";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const TagPage = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/tags/${tag}`);

        setPosts(res.data);
      } catch (err) {
        setError(err.response.data.msg);
      }
    };
    fetchPosts();
  }, [tag]);

  if (error) {
    return <p>{error}</p>;
  }

  return posts ? (
    <div>
      <h2>Posts tagged with '{tag}'</h2>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default TagPage;
