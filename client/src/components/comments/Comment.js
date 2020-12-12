import React from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <div style={{ padding: "1rem 0", borderBottom: "1px solid #c6c6c6" }}>
      <p style={{ whiteSpace: "pre-wrap" }}>{comment.text}</p>
      <p style={{ marginTop: "6px" }}>
        <span style={{ fontWeight: "800", color: "#257bd7" }}>
          {comment.name}
          {", "}
        </span>
        <span
          style={{ fontStyle: "italic", color: "#527aae" }}
          title={moment(comment.date).format("dddd[,] Do MMM YYYY")}
        >
          {moment(comment.date).fromNow()}
        </span>{" "}
      </p>
    </div>
  );
};

export default Comment;
