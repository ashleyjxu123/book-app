// home page before logging in
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

export default function AnonHome() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5050/login/getUser", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/home") : null)
      }, []);

    return (
        <div className="anon-home">
            <Link className="login-link" to={"/login/"}>
                <h3>Click here to login.</h3>
            </Link>
            <Link className="register-link" to={"/register"}>
                <h3>Click here to sign up.</h3>
            </Link>
        </div>
    )
}
