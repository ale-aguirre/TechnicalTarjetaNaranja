import React from "react";
import "./SidebarIconos.css";

const SidebarIconos = ({ Icon, selected, title }) => {
  return (
    <div className={`sidebar__Container ${selected && "selected"}`}>
      <div className="sidebar__wrapper">
        <Icon className="sidebar__Icono" />
        <span className="sidebar__Title">{title}</span>
      </div>
    </div>
  );
};

export default SidebarIconos;
