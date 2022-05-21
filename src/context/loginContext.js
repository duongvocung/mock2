import { createContext, useState } from "react";

const loginContext = createContext();

export default function LoginContextProvider({ children }) {
    const [auth, setAuth] = useState({
        login: false,
        register: false,
        forgotPassword: false,
    });

    const value = {
        auth: auth,
        setAuth: setAuth,
    };

    return (
        <loginContext.Provider value={value}>{children}</loginContext.Provider>
    );
}

export { loginContext };
