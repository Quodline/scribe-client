import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../contexts/AuthContext.jsx";

export default function () {
    const {user} = useAuthContext();

    return !user ? <Outlet /> : <Navigate to="/"/>
}
