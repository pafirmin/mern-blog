import React, { useContext, useState } from "react";
import axios from "axios";
import { LoadingContext } from "../LoadingContext";
import Message from "../Messages";

const CommentForm = (props) => {
  const { comments, setComments, setCommentCount, postId } = props;
  const { setLoading } = useContext(LoadingContext);
  const [messages, setMessages] = useState([]);
  const [newCommentData, setNewCommentData] = useState({
    name: "",
    text: "",
  });

  const handleChange = (e) => {
    setNewCommentData({ ...newCommentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(`/api/posts/${postId}/comments`, newCommentData, config);

      setComments([...comments, newCommentData]);
      setMessages([{ text: "Comment saved!", type: "success" }]);
      setCommentCount(comments.length + 1);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "error" };
      });
      setMessages(errorArray);
    }
    setTimeout(() => setMessages([]), 5000);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {messages &&
        messages.map((msg) => <Message type={msg.type} text={msg.text} />)}
      <form className="comment-form" onSubmit={handleSubmit}>
        {comments.length > 0 ? (
          <h3>Leave a comment</h3>
        ) : (
          <h3>Be the first to leave a comment</h3>
        )}
        <label htmlFor="name">
          <p>Name:</p>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="text">
          <p>Message:</p>
        </label>
        <textarea id="text" name="text" onChange={(e) => handleChange(e)} />
        <button type="submit">Leave your message</button>
      </form>
    </div>
  );
};

export default CommentForm;
