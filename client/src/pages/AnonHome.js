// home page before logging in
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie"
import {useNavigate} from "react-router";

export default function AnonHome() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
      const verifyCookie = async () => {
        // if (!cookies.token) {
        //   navigate("/login");
        // }

        const { data } = await axios.post(
          "http://localhost:5050/auth",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        console.log(data);
        setUsername(user);
        return status
        ? navigate("/home")
        : (removeCookie("token"));
        // catch(err => console.log(err));
      };
      verifyCookie();
      }, [navigate, cookies, removeCookie]);

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
