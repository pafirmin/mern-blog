import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);
  const logOut = () => {
    dispatch({ type: "logout" });
  };
  return (
    <nav style={{ display: "flex", alignItems: "center" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "14px" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newpost">New Post</Link>
        </li>
        <li>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
