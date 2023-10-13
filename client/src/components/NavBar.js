import React, {useState, useEffect} from 'react';
import {Outlet, Link} from "react-router-dom";
import { useCookies } from "react-cookie"
import {useNavigate} from "react-router";

function NavBar() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);


  // useEffect(() => {
  //   if(!localStorage.getItem("token")) {
  //     setLoggedIn(false);
  //     navigate("/");
  //   } else {
  //     setLoggedIn(true);
  //   }

  // }, []);

  const LogOut = () => {
    removeCookie("token");
    navigate("/");
  }

  return (
    <>
      <div className="nav-bar">
        <Link to="/home"><h1 className="nav-title">bibli</h1></Link>
        <div className="right-header">
          <button className="log-out" onClick={LogOut}>Log out</button>
          <div>
            <input id="header-search-bar" type="text" placeholder="search"></input>
          </div>
          <div className="nav-buttons">
            <Link to="/"><img src="https://www.svgrepo.com/show/326725/notifications-circle-outline.svg" className="nav-notifs-icon" alt="bell inside circle"/></Link>
            <Link to="/"><img src="https://cdn3.iconfinder.com/data/icons/user-interface-web-1/550/web-circle-circular-round_67-512.png" className="nav-messages-icon" alt="message bubble"/></Link>
            <Link to="/users/6515eb8e170bd8bde02e7bb0"><img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Silhouette of a person" className="nav-pfp"/></Link>
            {/* *******TEMP - linking to natasha's user******* */}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;