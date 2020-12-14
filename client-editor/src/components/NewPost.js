import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { Message, Button } from "./Utils";
import CreatableSelect from "react-select/creatable";

const NewPost = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({
    title: "",
    text: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleTags = (values) => {
    setTags(values);
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
      const newPost = {
        ...data,
        tags: tagList,
      };

      await axios.post("/api/posts", newPost, config);

      setMessages([{ text: "Post submitted", type: "success" }]);

      e.target.reset();
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
        messages.map((msg) => <Message type={msg.type}>{msg.text}</Message>)}
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
        <Button>Submit new post</Button>
      </form>
    </div>
  );
};

export default NewPost;
