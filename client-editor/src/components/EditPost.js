import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Message, Button } from "./Utils";

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
        console.error(err);
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

      setMessages([{ text: "Post updated", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "danger" };
      });
      setMessages(errorArray);
    }
    setTimeout(() => setMessages([]), 5000);
  };

  return (
    <div>
      {messages &&
        messages.map((msg) => <Message variant={msg.type}>{msg.text}</Message>)}
      {post && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => handleChange(e)}
              value={post.title}
            />
          </label>
          New post:
          <label htmlFor="text">
            <textarea
              type="text"
              name="text"
              id="text"
              onChange={(e) => handleChange(e)}
              value={post.text}
            />
          </label>
          <Button>Submit changes</Button>
        </form>
      )}
    </div>
  );
};

export default EditPost;
