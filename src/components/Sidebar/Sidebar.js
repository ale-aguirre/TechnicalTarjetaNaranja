import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className="sidebar__Container">
          <div className="sidebar__wrapper">
            <img
              className="sidebar__Icono"
              src="https://img.icons8.com/fluent/48/000000/pokemon.png"
              alt="home"
            />
            <span className="sidebar__Title">Home</span>
          </div>
        </div>
      </Link>

      <hr className="sidebar__separator" />

      <a
        href="https://github.com/ale-aguirre"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div className="sidebar__Container">
          <div className="sidebar__wrapper">
            <img
              className="sidebar__Icono"
              src="https://img.icons8.com/color/48/000000/bullbasaur.png"
              alt="github"
            />
            <span className="sidebar__Title">Github</span>
          </div>
        </div>
      </a>
      <a
        href="https://www.linkedin.com/in/alexisaguirre-fullstack/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div className="sidebar__Container">
          <div className="sidebar__wrapper">
            <img
              className="sidebar__Icono"
              src="https://img.icons8.com/color/48/000000/charmander.png"
              alt="link"
            />
            <span className="sidebar__Title">LinkedIn</span>
          </div>
        </div>
      </a>

      <a
        rel="noreferrer"
        target="_blank"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=aguirrealexis.cba@gmail.com&su=EXCELENTE ALE!&body=CONTRATADO!"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <div className="sidebar__Container">
          <div className="sidebar__wrapper">
            <img
              className="sidebar__Icono"
              src="https://img.icons8.com/color/48/000000/squirtle.png"
              alt="gmail"
            />
            <span className="sidebar__Title">E-mail</span>
          </div>
        </div>
      </a>

      <hr className="sidebar__separator" />
    </div>
  );
};

export default Sidebar;
