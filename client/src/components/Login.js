import {useEffect} from "react";
import {useNavigate} from "react-router";

//login page - anon home page

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token);
    })
  }

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:5050/login/getUser", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate("/") : null)
  }, []);

  return (
    <form onSubmit={event => handleLogin(event)}>
      <input type="text" placeholder="username"></input>
      <input type="text" placeholder="password"></input>
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default Login;