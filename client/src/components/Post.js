import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);

        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  return post ? (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div>
        {post.tags.map((tag) => (
          <Tag key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Post;
