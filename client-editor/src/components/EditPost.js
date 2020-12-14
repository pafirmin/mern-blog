import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import Message from "./Messages";

const EditPost = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [post, setPost] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        const { title, text } = res.data;
        setPost({
          title,
          text,
        });
      } catch (err) {
        console.err(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${state.token}`,
        },
      };

      await axios.put(`/api/posts/${id}`, post, config);

      setMessages([{ text: "Post edited", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "error" };
      });
      setMessages(errorArray);
    }
    setTimeout(() => setMessages([]), 5000);
  };

  return (
    <div>
      {messages && messages.map((msg) => <Message msg={msg} />)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleChange(e)}
            value={post && post.title}
          />
        </label>
        New post:
        <label htmlFor="text">
          <textarea
            type="text"
            name="text"
            id="text"
            onChange={(e) => handleChange(e)}
            value={post && post.text}
          />
        </label>
        <button>Submit new post</button>
      </form>
    </div>
  );
};

export default EditPost;
