import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { Button } from "./Utils";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);
  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <nav style={{ display: "flex", alignItems: "center" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newpost">New Post</Link>
        </li>
        <li>
          <Button variant="warning" onClick={logOut}>
            Log out
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
