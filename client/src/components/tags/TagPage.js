import React, { useEffect, useState, useContext } from "react";
import Post from "../posts/Post";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../contexts/LoadingContext";
import { Message } from "../Utils";

const TagPage = () => {
  const { tag } = useParams();
  const { setLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setErrors([]);
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/tags/posts/${tag}`);

        setPosts(res.data);
      } catch (err) {
        const errorArray = err.response.data.errors.map((err) => {
          return { text: err.msg, type: "warning" };
        });
        setErrors(errorArray);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [tag]);

  return (
    <div>
      {errors &&
        errors.map((msg, i) => (
          <Message key={i} variant={msg.type}>
            {msg.text}
          </Message>
        ))}
      <h3>Posts tagged with '{tag}'</h3>
      {posts &&
        posts.map((post) => <Post key={post._id} post={post} snippet={true} />)}
    </div>
  );
};

export default TagPage;
