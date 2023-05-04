import React, {useState} from "react";
import useAuthContext from '../contexts/AuthContext.jsx';

export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, errors} = useAuthContext();

    const handleLogin = async event => {
        event.preventDefault();

        await login({email, password});
    }

    return (
        <form method="post" onSubmit={handleLogin} className="grid p-4 place-items-center">
            login
        </form>
    );
}
