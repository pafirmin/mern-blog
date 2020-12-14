import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../contexts/LoadingContext";
import axios from "axios";
import Post from "./Post";
import Pages from "./Pages";
import { Message } from "../Utils";

const PostList = () => {
  const { pageNum } = useParams();
  const { setLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const page = pageNum || 1;

        const res = await axios.get(`/api/posts/page/${page}`);
        const { docs, totalPages } = res.data;

        setPages(totalPages);
        setPosts(docs);
      } catch (err) {
        const errorArray = err.response.data.errors.map((err) => {
          return { text: err.msg, type: "danger" };
        });
        setMessages(errorArray);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [pageNum]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      {messages &&
        messages.map((msg) => <Message variant={msg.type}>{msg.text}</Message>)}
      {posts &&
        posts.map((post) => (
          <div
            style={{ borderBottom: "1px solid #c5c5c5", paddingBottom: "8px" }}
            key={post._id}
          >
            <Post key={post._id} post={post} />
            <Link to={`/posts/${post._id}#comments`}>
              <span style={{ marginLeft: "12px" }}>
                {post.comments.length} comment
                {post.comments.length !== 1 && "s"}
              </span>
            </Link>
          </div>
        ))}
      {pages && <Pages pageNum={pageNum} pages={pages} />}
    </div>
  );
};

export default PostList;
