import React, { useEffect, useRef, useState } from "react";
import Header from "../../HomePage/Header/Header";
import NavTabs from "../../HomePage/Product/NavTabsProduct/NavTabs";
import OrderHistory from "../OrderHistory/OrderHistory";
import styles from "./ProfileUser.module.scss";
import avatarImg from "../../../../images/avatar.png";
import { changeProfile, getUserOrder, getUserProfile } from "../../../../apis/user";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import nextImg from "../../../../images/next.svg";
import previousImg from "../../../../images/previous.svg";
import { Button, Form } from "react-bootstrap";
import Modal from "react-modal";

function ProfileUser() {
    const [showProfile, setShowProfile] = useState({});
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [img, setImg] = useState('');

    const navigate = useNavigate();
    const totalPage = useRef();
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitEditEmail = () => {};

    useEffect(() => {
        getUserProfile().then((data) => {
            setShowProfile(data);
        });
        getUserOrder(4, page).then((res) => {
            setOrders(res.data.orders.result);
            totalPage.current = res.data.orders.totalPages;
        });
    }, [page]);
    console.log(showProfile)

    const renderButtonPagination = () => {
        if (totalPage.current) {
            const arr = [];
            for (let i = 0; i < totalPage.current; i++) {
                arr[i] = 1;
            }
            return arr.map((ele, index) => {
                if (page === index + 1) {
                    return (
                        <button
                            className={styles.button + " " + styles.active}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    );
                }
                return (
                    <button
                        className={styles.button}
                        onClick={() => {
                            setPage(index + 1);
                        }}
                        key={index}
                    >
                        {index + 1}
                    </button>
                );
            });
        }
    };

    const _onClickPrevious = () => {
        setPage(page - 1);
    };

    const _onClickNext = () => {
        setPage(page + 1);
    };
    const handleChanProfile = () =>{
      changeProfile(showProfile.data.id,phone,userName)
    }
    // pagination
    const renderBtn = (number) => {
        const arrNumber = [];
        for (let i = 0; i < number; i++) {
            arrNumber.push(number);
        }

        return arrNumber.map((element, index) => {
            return (
                <button
                    onClick={() => {
                        setPage(index + 1);
                    }}
                    key={index}
                    style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid",
                        margin: "10px",
                    }}
                >
                    {index + 1}
                </button>
            );
        });
    };
    const _LogOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("tokens");
        navigate("/home");
    };
    return (
        <div>
            <Header></Header>
            <div className={styles.nav}>Home {'>'} My Account</div>
            <div className={styles.head}>My Account</div>
            <div className={styles.wapperAccount}>
                <div className={styles.navigationUser}>
                    <div className={styles.navigation}>Navigation</div>
                    <div
                        className={styles.profile}
                        // onClick={navigate('/profileuser')}
                    >
                        My Profile
                    </div>
                    <div
                        className={styles.history}
                        onClick={() => navigate("/orderuser")}
                    >
                        Order History
                    </div>
                    <div className={styles.logout} onClick={_LogOut}> Logout</div>
                </div>

                <div className={styles.wapperProfile}>
                    <div className={styles.wapperRightProfile}>
                        <div className={styles.imgUser}>
                            <img
                                src={
                                    localStorage.getItem("avatar") !== "null"
                                        ? localStorage.avatar
                                        : avatarImg
                                }
                                alt=""
                            />
                            <div className={styles.contentUser}>
                                <div className={styles.name}>
                                    {showProfile?.data?.username}
                                </div>
                                <div className={styles.email}>
                                    Email:{" "}
                                    <span>{showProfile?.data?.email}</span>
                                </div>
                                <div className={styles.email}>
                                    Address:{" "}
                                    <span>{showProfile?.data?.email}</span>
                                </div>
                                <div className={styles.phone}>
                                    Phone:
                                    <span>{showProfile?.data?.contact}</span>
                                </div>
                                <div
                                    className={styles.btn}
                                    onClick={() =>
                                        setIsOpenProfile(!isOpenProfile)
                                    }
                                >
                                    Edit Profile
                                </div>
                            </div>
                        </div>

                        {/* under ProfileUser */}
                        <div className={styles.recentorder}>Recent Orders</div>
                        <table className={styles.tableOrder}>
                            <thead>
                                <tr>
                                    <td>Order</td>
                                    <td style={{paddingRight:'69px'}}>Date</td>
                                    <td>Status</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((data, index) => (
                                    <tr key={index}>
                                        <td># {data.id}</td>
                                        <td>
                                            {moment(data.createdAt).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>{data.status}</td>
                                        <td>${data.totalPrice}.00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={styles.pagination}>
                            {page === 1 ? (
                                <button
                                    className={styles.button}
                                    style={{ background: "#919EAB" }}
                                >
                                    <img src={previousImg} />
                                </button>
                            ) : (
                                <button
                                    onClick={_onClickPrevious}
                                    className={styles.button}
                                >
                                    <img
                                        src={nextImg}
                                        className={styles.previousBtn}
                                        alt= ''
                                    />
                                </button>
                            )}
                            {renderButtonPagination()}
                            {page === totalPage.current ? (
                                <button
                                    className={styles.button}
                                    style={{ background: "#919EAB" }}
                                >
                                    <img
                                        src={previousImg}
                                        className={styles.previousBtn}
                                        alt= ''
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={_onClickNext}
                                    className={styles.button}
                                >
                                    <img src={nextImg} />
                                </button>
                            )}
                        </div>
                      
                      
                      

                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
