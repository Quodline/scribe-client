import {createContext, useContext, useState} from "react";
import defaultApi from "../api/defaultApi.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const csrf = () => defaultApi.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        const {data} = await defaultApi.get('/api/user');
        setUser(data);
    }

    const login = async ({email, password}) => {
        await csrf();

        try {
            await defaultApi.post('/login', {email, password});

            await getUser();
            navigate('/');
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    const logout = async () => {
        await defaultApi.post('/logout');
        setUser(null);
        navigate("/login");
    }

    return <AuthContext.Provider value={{user, errors, getUser, login, logout}}>{children}</AuthContext.Provider>
}

export default function useAuthContext () {
    return useContext(AuthContext);
}
