import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Intensive Foods
        </Link>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Foods
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/orders">
              Orders
            </NavLink>
            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
