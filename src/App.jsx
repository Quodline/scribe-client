import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import useAuthContext from "./contexts/AuthContext.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import ErrorPage from "./error-page.jsx";

function App() {
    const {user, logout} = useAuthContext();

    return (
        <>
            <header className="lg:px-48 flex flex-col lg:flex-row justify-between items-center shadow-md p-4">
                <h1>App</h1>

                <nav className="space-x-12">
                    <Link className="link__main" to="/">Home</Link>
                    {user ? (
                        <button className="link__main" onClick={logout}>Logout</button>
                    ) : (
                        <Link className="link__main" to="/login">Login</Link>
                    )}
                </nav>
            </header>

            <main>
                <Routes>
                    <Route element={<AuthLayout/>} errorElement={<ErrorPage/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route element={<GuestLayout />} errorElement={<ErrorPage/>}>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
