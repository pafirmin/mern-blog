import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../LoadingContext";
import axios from "axios";
import Post from "./Post";
import Pages from "./Pages";

const PostList = () => {
  const { pageNum } = useParams();
  const { setLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState();

  useEffect(() => {
    fetchPosts();
  }, [pageNum]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const page = pageNum || 1;

      const res = await axios.get(`/api/posts/page/${page}`);
      const { docs, totalPages } = res.data;

      setPages(totalPages);
      setPosts(docs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return posts ? (
    <div>
      {posts.map((post) => (
        <div
          style={{ borderBottom: "1px solid #c5c5c5", paddingBottom: "8px" }}
          key={post._id}
        >
          <Post post={post} />
          <Link to={`/posts/${post._id}#comments`}>
            <span style={{ marginLeft: "12px" }}>
              {post.comments.length} comments
            </span>
          </Link>
        </div>
      ))}
      {pages && <Pages pageNum={pageNum} pages={pages} />}
    </div>
  ) : (
    <div />
  );
};

export default PostList;
