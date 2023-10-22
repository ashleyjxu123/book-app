import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            f_name: form[0].value.split(' ')[0],
            l_name: form[0].value.split(' ')[1],
            full_name: form[0].value,
            email: form[1].value,
            username: form[2].value,
            password: form[3].value,
            zip_code: form[4].value
        }

        fetch("http://localhost:5050/users/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })
        .then(res => {
            console.log(res.json);
        })
        .then(data => {
            localStorage.setItem("id", data._id)
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        });
    }

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input type="text" placeholder="full name"></input>
            <input type="text" placeholder="email"></input>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="password"></input>
            <input type="number" placeholder="zip code"></input>
            <input type="submit" value="Register"></input>
        </form>
    )
}

export default Register;