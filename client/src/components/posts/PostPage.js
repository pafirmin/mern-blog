import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentSection from "../comments/CommentSection";
import Post from "./Post";
import { LoadingContext } from "../contexts/LoadingContext";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/posts/${id}`);
        const postData = res.data;

        setPost(postData);
        setCommentCount(postData.comments.length);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  return post ? (
    <div>
      <Post post={post} />
      {commentCount > 0 && (
        <h3 style={{ paddingLeft: "1rem", marginTop: "2rem" }}>
          {commentCount} Comment{commentCount > 1 && "s"}
        </h3>
      )}
      <CommentSection
        setCommentCount={setCommentCount}
        postComments={post.comments}
        postId={post._id}
      />
    </div>
  ) : (
    <div />
  );
};

export default PostPage;
