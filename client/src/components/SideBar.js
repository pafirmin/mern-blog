import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const [popularTags, setPopularTags] = useState([]);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const res = await axios.get("/api/tags/popular/");

        const tags = res.data;
        setPopularTags(tags);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopularTags();
  }, []);

  return (
    <div className="side-bar">
      <h3 style={{ padding: "8px 0" }}>Popular Tags</h3>
      <ul>
        {popularTags &&
          popularTags.map((tag) => (
            <Link key={tag._id} to={`/tags/${tag.name}`}>
              <li>{tag.name}</li>
            </Link>
          ))}
        <li style={{ fontWeight: "900", fontStyle: "italic" }}>
          <Link to="/tags">View all tags</Link>
        </li>
      </ul>
      <h3 style={{ padding: "8px 0" }}>More Links</h3>
      <ul>
        <li>
          <a href="/#">Sample link</a>
        </li>
        <li>
          <a href="/#">Sample link</a>
        </li>
        <li>
          <a href="/#">Sample link</a>
        </li>
        <li>
          <a href="/#">Sample link</a>
        </li>
        <li>
          <a href="/#">Sample link</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
