import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import Message from "./Messages";

const NewPost = () => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState({
    title: "",
    text: "",
  });
  const { state } = useContext(AuthContext);

  const handleChange = (e) => {
    setData({
      ...data,
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

      await axios.post("/api/posts", data, config);

      setMessages([{ text: "Post submitted", type: "success" }]);
      e.target.reset();
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
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="text">
          <textarea
            type="text"
            name="text"
            id="text"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
