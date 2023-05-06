import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {BrowserRouter} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
