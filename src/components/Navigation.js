import React from "react";
import logo from "../brain-solid.svg";

const Navigation = ({ onRouteChange, route }) => {
  const navList =
    route === "home" ? (
      <ul className="nav_list">
        <li>
          <span onClick={() => onRouteChange("signin")}>Logout</span>
        </li>
      </ul>
    ) : (
      <ul className="nav_list">
        <li>
          <span onClick={() => onRouteChange("signin")}>Sign in</span>
        </li>
        <li>
          <span onClick={() => onRouteChange("register")}>Register</span>
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
