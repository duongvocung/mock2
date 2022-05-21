import { Outlet, useLocation, Navigate } from "react-router-dom";
import Login from "./Login/Login";

function Guard() {
    const location = useLocation();
    const pathname = location.pathname.split('/')[1]

    const guard = () => {
        if (localStorage.getItem("role") === "admin") {
            if (pathname === "login") {
                return <Navigate to="dashboard" />;
            } else {
                return <Outlet />;
            }
        } else if (localStorage.getItem("role") === "user") {
            if (
                pathname === "login" ||
                pathname === "dashboard" ||
                !pathname
            ) {
                return <Navigate to="/home" />;
            } else {
                return <Outlet />;
            }
        } else {
            if (pathname === "login") {
                return <Login />;
            } else {
                return <Navigate to="/home" />;
            }
        }
    };

    return guard();
}

export default Guard;
