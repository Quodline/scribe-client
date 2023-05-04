import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {BrowserRouter} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
