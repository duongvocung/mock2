import React from "react";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apis/config-api";
import LoginContextProvider from "./context/loginContext";
import { createRoot } from "react-dom/client";
import DeleteContextProvider from "./context/deleteContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <DeleteContextProvider>
        <LoginContextProvider>
            <App />
        </LoginContextProvider>
    </DeleteContextProvider>
);
