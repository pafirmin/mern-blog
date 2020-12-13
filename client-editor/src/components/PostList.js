import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");

        const postList = res.data;

        setPosts(postList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <table style={{ width: "80%", margin: "auto" }}>
        <tbody>
          <tr style={{ textAlign: "left" }}>
            <th>Date</th>
            <th>Title</th>
            <th>Options</th>
          </tr>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{moment(post.date).format("Do, MMM, YYYY")}</td>
              <td>{post.title}</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
