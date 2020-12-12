import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Comment = ({ comment, postId }) => {
  return (
    <div
      style={{ padding: "1rem 0", borderBottom: "1px solid #c6c6c6" }}
      id={`comment-${comment._id}`}
    >
      <p style={{ whiteSpace: "pre-wrap" }}>{comment.text}</p>
      <p style={{ marginTop: "6px" }}>
        <Link to={`/posts/${postId}#comment-${comment._id}`}>
          <span style={{ fontWeight: "800", color: "#257bd7" }}>
            {comment.name}
            {", "}
          </span>
          <span
            style={{ fontStyle: "italic", color: "#527aae" }}
            title={moment(comment.date).format("dddd[,] Do MMM YYYY")}
          >
            {moment(comment.date).fromNow()}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Comment;
