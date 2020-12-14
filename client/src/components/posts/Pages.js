import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNumber = styled.span`
  font-size: ${(props) =>
    props.index === parseInt(props.page) ? "1.4rem" : "1.2rem"};
  text-decoration: ${(props) =>
    props.index === parseInt(props.page) ? "underline" : "none"};
`;

const Pages = ({ pages, pageNum }) => {
  const page = pageNum || 1;

  const getPages = () => {
    let pageList = [];
    for (let i = 1; i <= pages; i++) {
      pageList.push(
        <Link key={i} to={`/page/${i}`}>
          <PageNumber index={i} page={page}>
            {i}
          </PageNumber>
        </Link>
      );
    }
    return pageList;
  };

  return (
    <div className="pages">
      {page > 1 && (
        <Link to={`/page/${page - 1}`}>
          <i className="fas fa-angle-left" />
        </Link>
      )}
      {getPages()}
      {page < pages && (
        <Link to={`/page/${parseInt(page) + 1}`}>
          <i className="fas fa-angle-right" />
        </Link>
      )}
    </div>
  );
};

export default Pages;
