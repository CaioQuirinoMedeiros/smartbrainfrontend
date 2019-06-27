import React from "react";
import logo from "../brain-solid.svg";

const Navigation = ({ onRouteChange, route }) => {
  const navList =
    route === "home" ? (
      <ul className="nav_list">
        <li>
          <span onClick={() => onRouteChange("signin")}>Sair</span>
        </li>
      </ul>
    ) : (
      <ul className="nav_list">
        <li>
          <span onClick={() => onRouteChange("signin")}>Entrar</span>
        </li>
        <li>
          <span onClick={() => onRouteChange("register")}>Cadastro</span>
        </li>
      </ul>
    );

  return (
    <nav className="nav">
      <div className="logo_box">
        <img
          src={logo}
          alt="logo"
          onClick={e => {
            e.target.classList.toggle("rotate");
          }}
        />
      </div>
      <div className="nav_nav">{navList}</div>
    </nav>
  );
};

export default Navigation;
