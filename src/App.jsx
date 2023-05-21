import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import useAuthContext from "./contexts/AuthContext.jsx";
import {
    Flex,
    Heading,
    HStack,
    IconButton,
    Menu,
    MenuButton, MenuItem,
    MenuList, useColorModeValue,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import Register from "./pages/Register.jsx";
import NewPost from "./pages/NewPost.jsx";
import {HamburgerIcon} from "@chakra-ui/icons";

function App() {
    const {user, logout} = useAuthContext();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

    return (
        <>
            <HStack bg="black" color="white" justify="space-between" p={4} spacing={12}>
                <Link to="/">
                    <Heading fontFamily="heading">{import.meta.env.VITE_APP_NAME}</Heading>
                </Link>
                <Flex gap={12}>
                    {user ? <>
                            <Link to="/">Home</Link>
                            <button onClick={logout}>Logout</button>
                        </> : (
                            isLargerThan800 ? <>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </> : <>
                                    <Menu>
                                        {({ isOpen }) => (
                                            <>
                                                <MenuButton
                                                    _hover={{ bg: "gray.600" }}
                                                    _focus={{ bg: "gray.600" }}
                                                    isActive={isOpen}
                                                    as={IconButton}
                                                    aria-label='Options'
                                                    icon={<HamburgerIcon />} variant='outline'
                                                />
                                                <MenuList color="black">
                                                    <MenuItem as={Link} to="/register">Register</MenuItem>
                                                    <MenuItem as={Link} to="/login">Login</MenuItem>
                                                </MenuList>
                                            </>
                                        )}
                                    </Menu>
                            </>
                        )
                    }
                </Flex>
            </HStack>

            <VStack align="start" minHeight="90vh">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create-post" element={<NewPost/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </VStack>
        </>
    );
}

export default App;
