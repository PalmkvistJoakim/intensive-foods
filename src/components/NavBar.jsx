import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Intensive Foods</a>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Foods
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/orders">
              Orders
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
