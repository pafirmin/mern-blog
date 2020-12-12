import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="main-title">another blog site</h1>
      </Link>
    </header>
  );
};

export default Header;
