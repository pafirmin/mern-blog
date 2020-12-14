import styled from "styled-components";

export const Button = styled.button`
  align-self: flex-start;
  color: ${({ variant }) => getColour(variant).font};
  border: none;
  background-color: ${({ variant }) => getColour(variant).bg};
  padding: 8px;
  cursor: pointer;
  font: inherit;
`;

export const Message = styled.div`
  background-color: ${({ variant }) => getColour(variant).bg};
  border-radius: 20px;
  padding: 6px;
  margin: 4px;
  color: ${({ variant }) => getColour(variant).font};
  text-align: center;
`;

const getColour = (variant) => {
  switch (variant) {
    case "success":
      return { bg: "#64be10", font: "#fff" };
    case "danger":
      return { bg: "#f33434", font: "#fff" };
    case "warning":
      return { bg: "#fdc52a", font: "#313131" };
    default:
      return { bg: "#2d9ee9", font: "#fff" };
  }
};
