import {createContext, useContext, useEffect, useState} from "react";
import defaultApi from "../api/defaultApi.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});

const TOKEN_KEY = 'api_key';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            defaultApi.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        }
    }, [token]);

    const storeToken = (token) => {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    const fetchToken = async () => {
        const sesToken = sessionStorage.getItem(TOKEN_KEY);

        if (sesToken !== null) {
            setToken(sesToken);
            const {data} = await defaultApi.get('/user', {
                headers: {'Authorization': `Bearer ${sesToken}`},
            });
            setUser(data);
        } else {
            navigate('/login');
        }
    }

    const register = async ({name, email, password, password_confirmation}) => {
        setErrors(null);

        try {
            const {data} = await defaultApi.post('/register', {name, email, password, password_confirmation});
            storeToken(data.access_token);
            await fetchToken();
            navigate('/');
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    const login = async ({email, password}) => {
        setErrors(null);

        try {
            const {data} = await defaultApi.post('/login', {email, password});
            storeToken(data.access_token);
            await fetchToken();
            navigate('/');
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    const clearErrors = () => setErrors(null);

    const logout = async () => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        navigate("/login");
    }

    return <AuthContext.Provider value={{
        user,
        errors,
        clearErrors,
        fetchToken,
        login,
        logout,
        register
    }}>{children}</AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}
