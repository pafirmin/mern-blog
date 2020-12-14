import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: ${({ colour }) => colour.bg};
  border-radius: 20px;
  padding: 6px;
  margin: 4px;
  color: ${({ colour }) => colour.font};
  text-align: center;
`;

const getColour = (type) => {
  switch (type) {
    case "success":
      return { bg: "#64be10", font: "#fff" };
    case "danger":
      return { bg: "#f33434", font: "#fff" };
    case "warning":
      return { bg: "#fdc52a", font: "#313131" };
    default:
      return { bg: "#2067ff", font: "#fff" };
  }
};

const Message = ({ msg }) => {
  const [colour, setColour] = useState({});

  useEffect(() => {
    setColour(getColour(msg.type));
  }, [msg]);

  return <Box colour={colour}>{msg.text}</Box>;
};

export default Message;
