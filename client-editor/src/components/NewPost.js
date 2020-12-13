import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";

const NewPost = () => {
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
      e.form.clear();
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "error" };
      });
      console.log(errorArray);
    }
  };

  return (
    <div>
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
          <input
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
