import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import moment from "moment";
import Message from "./Messages";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const { state } = useContext(AuthContext);

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

  const deletePost = async (postID) => {
    try {
      const newList = posts.filter((post) => post._id !== postID);

      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      await axios.delete(`api/posts/${postID}`, config);

      setMessage({ type: "warning", text: "Post deleted." });
      setPosts(newList);
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div>
      {message && <Message msg={message} />}
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
              <td>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
