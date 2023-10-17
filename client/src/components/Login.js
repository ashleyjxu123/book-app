import {useNavigate} from "react-router";

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
    }

    console.log(user);

    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON"
      },
      body: JSON.stringify(user),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        console.log(data.success)
        localStorage.setItem("id", data.id)
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        return window.alert(data.message);
      }
    })
  }

  // useEffect(() => {
  //   fetch("http://localhost:5050/login/getUser", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token")
  //     }
  //   })
  //   .then((res) => res.json())
  //   .then(data => data.isLoggedIn ? navigate("/home") : null)
  //   .catch(err => console.log(err));
  // }, []);

  return (
    <form onSubmit={event => handleLogin(event)}>
      <input type="text" placeholder="username"></input>
      <input type="text" placeholder="password"></input>
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default Login;