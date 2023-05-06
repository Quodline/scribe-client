import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import useAuthContext from "./contexts/AuthContext.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import ErrorPage from "./error-page.jsx";
import {Flex, HStack, VStack} from "@chakra-ui/react";
import Register from "./pages/Register.jsx";
import NewPost from "./pages/NewPost.jsx";

function App() {
    const {user, logout} = useAuthContext();

    return (
        <>
            <HStack bg="teal.400" color="white" justify="space-between" p={4} spacing={12}>
                <Link to="/">Scribe</Link>
                <Flex gap={12}>
                    <Link to="/">Home</Link>
                    {user ? (
                        <button onClick={logout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </Flex>
            </HStack>

            <VStack align="start" minHeight="90vh">
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/create-post" element={<NewPost/>}/>
                    </Route>
                    <Route element={<GuestLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
                </Routes>
            </VStack>
        </>
    );
}

export default App;
