import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.BACKEND_URL,
    headers: {
        'Accept': 'application/json',
    },
    withCredentials: true,
});
