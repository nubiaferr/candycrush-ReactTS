import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;

export const GameContainer = styled.div`
  width: 560px;
  height: 560px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 70px;
    height: 70px;
  }
`;
