import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import Message from "./Messages";
import CreatableSelect from "react-select/creatable";

const NewPost = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({
    title: "",
    text: "",
    tags: [],
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleTags = (values) => {
    setTags([...tags, values]);
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

      const tagList = tags.map((tag) => tag.value);

      await axios.post("/api/posts", { ...data, tagList }, config);

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
          Title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleChange(e)}
            value={data.title}
          />
        </label>
        New post:
        <label htmlFor="text">
          <textarea
            type="text"
            name="text"
            id="text"
            onChange={(e) => handleChange(e)}
            value={data.text}
          />
        </label>
        Tags:
        <label htmlFor="tags">
          <CreatableSelect
            isMulti
            onChange={handleTags}
            openMenuOnClick={false}
            formatCreateLabel={(tag) => `Add '${tag}'`}
          />
        </label>
        <button>Submit new post</button>
      </form>
    </div>
  );
};

export default NewPost;
