import React from "react";

import { HeaderContainer, HeaderItem } from "./styled";

import { Link } from "react-router-dom";

import BuildIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";

const Header = ({ current }) => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderItem current={current === "gerador"}>
          <BuildIcon
            fontSize="small"
            style={{ marginRight: 6, color: "#FFF", fill: "#FFF" }}
          />
          Gerador
        </HeaderItem>
      </Link>
      <Link to="/historico">
        <HeaderItem current={current === "historico"}>
          <HistoryIcon
            fontSize="small"
            style={{ marginRight: 6, color: "#FFF", fill: "#FFF" }}
          />
          Histórico
        </HeaderItem>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
