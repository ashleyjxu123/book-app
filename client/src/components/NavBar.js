import React from 'react';

function NavBar() {
  return (
    <div className="nav-bar">
      <h1>bibli</h1>
      <div class="right-header">
        <div>
          <input id="header-search-bar" type="text" placeholder="search"></input>
        </div>
        <div className="nav-buttons">
          <a href="">notifs</a>
          <a href="">messages</a>
          <a href="">profile</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;