import React from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) =>
    props.type === "error" ? "#ff3434" : "#64be10"};
  border: 1px solid
    ${(props) => (props.type === "error" ? "#ac0202" : "#017101")};
  padding: 6px;
  margin: 4px;
  color: white;
`;

const Message = ({ type, text }) => {
  return <Box type={type}>{text}</Box>;
};

export default Message;
