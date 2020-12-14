import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentSection = ({ postComments, postId, setCommentCount }) => {
  const [comments, setComments] = useState(postComments);

  return (
    <div
      style={{ padding: "0 12px ", width: "60%", color: "color: #5e5e5e" }}
      id="comments"
    >
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}

      <CommentForm
        comments={comments}
        setComments={setComments}
        setCommentCount={setCommentCount}
        postId={postId}
      />
    </div>
  );
};

export default CommentSection;
