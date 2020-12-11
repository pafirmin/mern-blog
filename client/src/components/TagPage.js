import React, { useEffect, useState } from "react";
import PostSnippet from "./PostSnippet";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const TagPage = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/tags/${tag}`);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [tag]);

  return posts ? (
    <div>
      {posts.map((post) => (
        <PostSnippet key={post._id} post={post} />
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default TagPage;
