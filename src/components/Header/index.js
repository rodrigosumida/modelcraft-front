import React from "react";

import { HeaderContainer } from "./styled";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <span>Gerador</span>
      </Link>
      <Link to="/historico">
        <span>Histórico</span>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
