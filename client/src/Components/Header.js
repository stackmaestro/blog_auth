import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const activeStyle = {
  textDecoration: 'underline',
  color: 'blue',
};

function Header() {
  const { user, authenticating, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <NavLink
              to="/posts"
              end
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All Posts
            </NavLink>
          </li>
          {user && !authenticating ? (
            <li className="nav-item mx-2">
              <NavLink
                to={`/posts/${user?.name}`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                My Posts
              </NavLink>
            </li>
          ) : null}
          {!user && !authenticating ? (
            <li className="nav-item mx-2">
              <NavLink
                to="/auth"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Login
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
      {user && !authenticating ? (
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={logout} type="button">
            Log Out
          </button>
        </div>
      ) : null}
    </nav>
  );
}

export default Header;
