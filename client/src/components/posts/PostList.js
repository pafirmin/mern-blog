import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../LoadingContext";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const { pageNum } = useParams();
  const { setLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [pageNum]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const page = pageNum || 1;

      const res = await axios.get(`/api/posts/page/${page}`);

      const postList = res.data.docs;
      const pageCount = res.data.totalPages;

      setLoading(false);
      setPages(pageCount);
      setPosts(postList);
    } catch (err) {
      console.error(err);
    }
  };

  const getPages = () => {
    let pageList = [];
    for (let i = 1; i <= pages; i++) {
      pageList.push(
        <Link to={`/page/${i}`}>
          <span>{i}</span>
        </Link>
      );
    }
    return pageList;
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
      <div className="pages"> {pages && getPages()} </div>
    </div>
  ) : (
    <div />
  );
};

export default PostList;
