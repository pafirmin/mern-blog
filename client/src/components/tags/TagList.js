import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import axios from "axios";

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("/api/tags");

        setTags(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTags();
  }, []);

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </div>
  );
};

export default TagList;
