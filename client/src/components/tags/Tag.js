import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TagSpan = styled.span`
  color: #414141;
  border-radius: 6px;
  background: linear-gradient(#fff4e0, #ffd8b6);
  margin: 0 6px;
  padding: 4px;
  font-size: 0.8rem;
`;

const Tag = ({ tag }) => {
  return (
    <Link to={`/tags/${tag.name}`}>
      <TagSpan>{tag.name}</TagSpan>
    </Link>
  );
};

export default Tag;
