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
            <Link to="/"><img src="https://www.svgrepo.com/show/326725/notifications-circle-outline.svg" className="nav-notifs-icon" alt="bell inside circle"/></Link>
            <Link to="/"><img src="https://cdn3.iconfinder.com/data/icons/user-interface-web-1/550/web-circle-circular-round_67-512.png" className="nav-messages-icon" alt="message bubble"/></Link>
            <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Silhouette of a person" className="nav-pfp"/></Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;