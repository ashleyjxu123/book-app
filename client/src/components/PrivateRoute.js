import { useEffect } from "react";
import {useNavigate} from "react-router";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute =  () => {

    if (localStorage.getItem("id")) {
        console.log("User authorized");
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

};

export default PrivateRoute;

