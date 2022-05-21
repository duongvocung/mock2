import styles from "./SideBar.module.scss";
import dashboardImg from "../../../../images/dashboard.svg";
import dropdownImg from "../../../../images/dropdown.svg";
import productImg from "../../../../images/product.svg";
import userImg from "../../../../images/user.svg";
import cartImg from "../../../../images/cart.svg";
import settingsImg from "../../../../images/settings.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function SideBar() {
    const [rotate, setRotate] = useState({
        product: false,
        user: false,
        settings: false,
    });
    const productRef = useRef();
    const userRef = useRef();
    const settingsRef = useRef();
    const navigate = useNavigate();

    const _onClickProduct = () => {
        if (rotate.product) {
            setRotate({ ...rotate, product: false });
        } else {
            setRotate({ ...rotate, product: true });
        }
    };

    const _onClickUser = () => {
        if (rotate.user) {
            setRotate({ ...rotate, user: false });
        } else {
            setRotate({ ...rotate, user: true });
        }
    };

    const _onClickSettings = () => {
        if (rotate.settings) {
            setRotate({ ...rotate, settings: false });
        } else {
            setRotate({ ...rotate, settings: true });
        }
    };

    const _onClickLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("tokens");
        localStorage.removeItem("email");
        navigate('/home')
    };

    useEffect(() => {
        if (rotate.product) {
            productRef.current.classList.add("rotate");
        } else {
            productRef.current.classList.remove("rotate");
        }

        if (rotate.user) {
            userRef.current.classList.add("rotate");
        } else {
            userRef.current.classList.remove("rotate");
        }

        if (rotate.settings) {
            settingsRef.current.classList.add("rotate");
        } else {
            settingsRef.current.classList.remove("rotate");
        }
    }, [rotate]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <p>
                        <b>SHOP APP</b>
                    </p>
                    <button>ADMIN</button>
                </div>
                <div className={styles.application}>
                    <p>
                        <b>APPLICATION</b>
                    </p>
                </div>
                <div className={styles.dashboard}>
                    <img src={dashboardImg}></img>
                    <p>Dashboard</p>
                </div>
                <label
                    className={styles.product}
                    htmlFor="product"
                    onClick={_onClickProduct}
                >
                    <div>
                        <img src={productImg}></img>
                        <p>Product</p>
                    </div>
                    <img src={dropdownImg} ref={productRef}></img>
                </label>
                <input
                    type="checkbox"
                    id="product"
                    style={{ display: "none" }}
                />
                <div className={styles.product_group}>
                    <NavLink
                        to="/dashboard/product"
                        className={({ isActive }) =>
                            isActive ? styles.selected : ""
                        }
                    >
                        Product List
                    </NavLink>
                    <NavLink
                        to="/dashboard/create-product"
                        className={({ isActive }) =>
                            isActive ? styles.selected : ""
                        }
                    >
                        Add Product
                    </NavLink>
                </div>
                <label
                    className={styles.user}
                    htmlFor="user"
                    onClick={_onClickUser}
                >
                    <div>
                        <img src={userImg}></img>
                        <p>User</p>
                    </div>
                    <img src={dropdownImg} ref={userRef}></img>
                </label>
                <input type="checkbox" id="user" style={{ display: "none" }} />
                <div className={styles.user_group}>
                    <NavLink
                        to="/dashboard/user"
                        className={({ isActive }) =>
                            isActive ? styles.selected : ""
                        }
                    >
                        User List
                    </NavLink>
                    <NavLink
                        to="/dashboard/create-user"
                        className={({ isActive }) =>
                            isActive ? styles.selected : ""
                        }
                    >
                        Add User
                    </NavLink>
                </div>
                <NavLink
                    to="/dashboard/order"
                    className={({ isActive }) =>
                        isActive
                            ? styles.selected + " " + styles.order
                            : styles.order
                    }
                >
                    <img src={cartImg}></img>
                    <p>Order</p>
                </NavLink>
                <label
                    className={styles.settings}
                    htmlFor="settings"
                    onClick={_onClickSettings}
                >
                    <div>
                        <img src={settingsImg}></img>
                        <p>Settings</p>
                    </div>
                    <img src={dropdownImg} ref={settingsRef}></img>
                </label>
                <input
                    type="checkbox"
                    id="settings"
                    style={{ display: "none" }}
                />
                <div className={styles.user_group}>
                    <div onClick={_onClickLogout}>Logout</div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
