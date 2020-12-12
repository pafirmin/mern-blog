import React from "react";

const SideBar = () => {
  return (
    <div
      style={{
        paddingLeft: "8px",
        marginLeft: "12px",
        width: "20%",
      }}
    >
      <h3 style={{ padding: "8px 0" }}>External Links</h3>
      <ul>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
      </ul>
      <h3 style={{ padding: "8px 0" }}>More Links</h3>
      <ul>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
        <li>
          <a href="#">Sample link</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
