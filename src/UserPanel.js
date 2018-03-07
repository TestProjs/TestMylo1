import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  border: 2px solid rgb(0, 0, 0);
  line-height: 34px;
  height: 10em;
  width: 30%;
  align-items: center;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`;
const Name = styled.p`
  font-weight: bold;
  font-size: 16px;
`;
const Age = styled.p`
  font-style: italic;
  font-size: 12px;
`;
const Category = styled.p`
  font-size: 12px;
`;

export const UserPanel = ({ name, age, category, priority }) => (
  <Container style={{ backgroundColor: containerPriority(priority) }}>
    <Name>{name}</Name>
    <Age>{age}</Age>
    <Category>{category}</Category>
  </Container>
);

const containerPriority = priority => {
  switch (priority) {
    case 1:
      return "#f4aa42";
    case 2:
      return "#3abc43";
    case 3:
      return "#23258e";
    default:
      return "#76238e";
  }
};
