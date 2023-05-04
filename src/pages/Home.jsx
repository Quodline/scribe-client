import React, {useEffect} from "react";
import useAuthContext from "../contexts/AuthContext.jsx";

export default function () {
    const {user, getUser} = useAuthContext();

    useEffect(function () {
        if (!user) {
            getUser();
        }
    }, []);

    return (
        <div>{user?.name}</div>
    );
}
