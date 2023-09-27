import React from 'react';
import Link from "react-router-dom";

//login page - anon home page

function Login() {
  return (
    <div className="login-box">
      <input type="text" placeholder="user"></input>
      <input type="text" placeholder="password"></input>
      <button></button>
    </div>
  );
}

export default Login;