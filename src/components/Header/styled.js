import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #c72020;
  padding: 0 70px;
  display: flex;
  gap: 70px;
  align-items: center;

  a {
    padding: 20px 0;
  }

  span {
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
`;
