import React from 'react';
import {Outlet, Link} from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="nav-bar">
        <h1>bibli</h1>
        <div className="right-header">
          <div>
            <input id="header-search-bar" type="text" placeholder="search"></input>
          </div>
          <div className="nav-buttons">
            <Link to="/">notifs</Link>
            <Link to="/">messages</Link>
            <Link to="/">profile</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;