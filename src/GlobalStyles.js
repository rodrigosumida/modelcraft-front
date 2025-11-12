import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Montserrat", "Radio Canada Big", sans-serif;
    color: #2e2e2e;
  }

  body {
    font-family: sans-serif;
    background: #eee;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: #c72020;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
  }

  button:hover {
    filter: brightness(80%);
  }

  button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }

  ::placeholder {
    color: #ccc;
  }
`;

export const Content = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
