import React, { useContext, useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import SearchProductUser from "../SearchProductUser/SearchProductUser";
import Login from "../../../Auth/Login/Login";
import Register from "../../../Auth/Register/Register";
import avatarImg from "../../../../images/avatar.png";
import { loginContext } from "../../../../context/loginContext";
import ForgotPassword from "../../../Auth/ForgotPassword/ForgotPassword";

function Header() {
    let navigate = useNavigate();
    const context = useContext(loginContext);
    const [valueInput, setValueInput] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    const searchItem = (event) => {
        event.preventDefault();
        navigate("/resultproduct" + "/" + valueInput);
    };

    const _navigateHome = () => {
        navigate("/home");
    };

    // login
    const _clickLogin = () => {
        context.setAuth({
            login: true,
            register: false,
            forgotPassword: false,
        });
    };
    const __showPopUp = () => {
        if (showPopUp) {
            setShowPopUp(false);
        } else {
            setShowPopUp(true);
        }
    };
    const _LogOut = () => {
        setShowPopUp(false);
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("tokens");
        navigate("/home");
    };
    //

    return (
        <div>
            {/* ab us */}
            {context.auth.login ? <Login></Login> : null}
            {context.auth.register ? <Register></Register> : null}
            {context.auth.forgotPassword ? (
                <ForgotPassword></ForgotPassword>
            ) : null}
            <div className={styles.about__us}>
                <Container>
                    <Row>
                        <div>About Us</div>
                        <div>Contacts</div>
                        <div>Store</div>
                        <div>Track Orders</div>
                    </Row>
                </Container>
            </div>
            {/* content */}
            <Form onSubmit={searchItem}>
                <div className={styles.content}>
                    <Container>
                        <Row>
                            <h4 onClick={_navigateHome}>Shop App</h4>
                            <div className={styles.main_bar}>
                                <button>
                                    <svg
                                        width="31"
                                        height="27"
                                        viewBox="0 0 31 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.86133 13.6833H15.4456"
                                            stroke="#2E2D2D"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M3.86133 7.21375H27.0299"
                                            stroke="#2E2D2D"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M3.86133 20.153H27.0299"
                                            stroke="#2E2D2D"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Categories
                                </button>

                                <input
                                    type="text"
                                    placeholder="Search Items"
                                    value={valueInput}
                                    onChange={(e) =>
                                        setValueInput(e.target.value)
                                    }
                                ></input>

                                <span>
                                    <i
                                        className="fa fa-search"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </div>
                            <div
                                className={styles.cart}
                                onClick={() => {
                                    navigate("/cart");
                                }}
                            >
                                <svg
                                    width="40"
                                    height="44"
                                    viewBox="0 0 40 44"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g filter="url(#filter0_i_2286_1769)">
                                        <path
                                            d="M12.0732 34.8413C9.85979 34.8413 8.06893 36.768 8.06893 39.123C8.06893 41.478 9.85979 43.4048 12.0732 43.4048C14.2866 43.4048 16.0976 41.478 16.0976 39.123C16.0976 36.768 14.2866 34.8413 12.0732 34.8413ZM32.1952 34.8413C29.9818 34.8413 28.1909 36.768 28.1909 39.123C28.1909 41.478 29.9818 43.4048 32.1952 43.4048C34.4086 43.4048 36.2196 41.478 36.2196 39.123C36.2196 36.768 34.4086 34.8413 32.1952 34.8413ZM14.2866 24.1369H29.2775C30.7867 24.1369 32.1147 23.2591 32.7989 21.9318L39.3184 8.78683C39.8215 7.75921 39.4794 6.47468 38.5135 5.91805C37.5276 5.34002 36.3001 5.74679 35.7769 6.79581L29.2775 19.8551H15.1519L6.5799 0.58728H2.0122C0.905491 0.58728 0 1.55067 0 2.72815C0 3.90563 0.905491 4.86903 2.0122 4.86903H4.0244L11.2683 21.1183L8.55186 26.342C7.08295 29.2108 9.01466 32.7004 12.0732 32.7004H34.2074C35.3141 32.7004 36.2196 31.737 36.2196 30.5595C36.2196 29.382 35.3141 28.4186 34.2074 28.4186H12.0732L14.2866 24.1369Z"
                                            fill="#323232"
                                        />
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_i_2286_1769"
                                            x="0"
                                            y="0.58728"
                                            width="39.5493"
                                            height="42.8175"
                                            filterUnits="userSpaceOnUse"
                                            color-interpolation-filters="sRGB"
                                        >
                                            <feFlood
                                                flood-opacity="0"
                                                result="BackgroundImageFix"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="BackgroundImageFix"
                                                result="shape"
                                            />
                                            <feColorMatrix
                                                in="SourceAlpha"
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                result="hardAlpha"
                                            />
                                            <feOffset dx="0.5" dy="0.5" />
                                            <feComposite
                                                in2="hardAlpha"
                                                operator="arithmetic"
                                                k2="-1"
                                                k3="1"
                                            />
                                            <feColorMatrix
                                                type="matrix"
                                                values="0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 0.2 0"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in2="shape"
                                                result="effect1_innerShadow_2286_1769"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            {showPopUp && (
                                <div style={{ position: "absolute" }} className={styles.popUpLogin}>
                                    <div className={styles.mypf} onClick={() => navigate('/profileuser')}>My Profile</div>
                                    <div className={styles.popUporder} onClick={() => navigate('/orderuser')}>Order History</div>
                                    <div onClick={_LogOut} className={styles.popUlogout}>Logout</div>
                                </div>
                            )}

                            <div className={styles.user_logo}>
                                {localStorage.getItem("avatar") ? (
                                    <img
                                        onClick={__showPopUp}
                                        src={
                                            localStorage.getItem("avatar") !==
                                            "null"
                                                ? localStorage.avatar
                                                : avatarImg
                                        }
                                        alt=""
                                    />
                                ) : (
                                    <svg
                                        onClick={_clickLogin}
                                        width="38"
                                        height="40"
                                        viewBox="0 0 38 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M8.41577 9.97187C8.41577 4.38762 13.0445 0 18.9356 0C24.8267 0 29.4554 4.38762 29.4554 9.97187C29.4554 15.5561 24.8267 19.9437 18.9356 19.9437C13.0445 19.9437 8.41577 15.5561 8.41577 9.97187ZM37.8713 33.9045V37.8932C37.8713 39.0899 37.0298 39.8876 35.7674 39.8876C34.505 39.8876 33.6634 39.0899 33.6634 37.8932V33.9045C33.6634 30.514 30.9283 27.9213 27.3515 27.9213H10.5198C6.94308 27.9213 4.20793 30.514 4.20793 33.9045V37.8932C4.20793 39.0899 3.36634 39.8876 2.10396 39.8876C0.841585 39.8876 0 39.0899 0 37.8932V33.9045C0 28.3202 4.62872 23.9326 10.5198 23.9326H27.3515C33.2426 23.9326 37.8713 28.3202 37.8713 33.9045ZM18.9357 15.955C15.3589 15.955 12.6238 13.3623 12.6238 9.97185C12.6238 6.58142 15.3589 3.98874 18.9357 3.98874C22.5124 3.98874 25.2476 6.58142 25.2476 9.97185C25.2476 13.3623 22.5124 15.955 18.9357 15.955Z"
                                            fill="#212529"
                                        />
                                    </svg>
                                )}
                            </div>
                        </Row>
                    </Container>
                </div>
            </Form>
        </div>
    );
}

export default Header;
