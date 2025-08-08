import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <NavLink className="navbar-brand" href="#">Navbar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/A"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              A
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/B"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              B
            </NavLink>
          </li>
          </ul>
           <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Login/signup
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </nav>
  );
}
