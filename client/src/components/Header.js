import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink, Navbar } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = ({ isLoggedIn, userProfile }) => {
  return (
    <Navbar className="navbar navbar-expand navbar-dark bg-info px-3">
      <Link to="/" className="navbar-brand">
        StreamISH
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/videos/add" className="nav-link">
            New Video
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <NavItem>
              <a
                aria-current="page"
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                Logout
              </a>
            </NavItem>
          </>
        )}
      </ul>
    </Navbar>
  );
};

export default Header;
