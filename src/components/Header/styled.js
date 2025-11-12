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
`;

export const HeaderItem = styled.span`
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.current && "#972020"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .active {
    background-color: #8b2020;
  }
`;
