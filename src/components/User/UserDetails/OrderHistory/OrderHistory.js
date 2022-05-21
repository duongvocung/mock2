import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserOrder } from '../../../../apis/user';
import Header from '../../HomePage/Header/Header'
import NavTabs from '../../HomePage/Product/NavTabsProduct/NavTabs'
import styles from "./OrderHistory.module.scss";
import moment from 'moment';
import nextImg from "../../../../images/next.svg";
import previousImg from "../../../../images/previous.svg";

function OrderHistory() {
  const [page, setPage] = useState(1);

  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const totalPage = useRef();



  useEffect(() => {
  
    getUserOrder(5, page).then((res) => {
        setOrders(res.data.orders.result);
        totalPage.current = res.data.orders.totalPages;
    });
}, [page]);

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
                        onClick={() => navigate('/profileuser')}
                    >
                        My Profile
                    </div>
                    <div
                        className={styles.history}
                        // onClick={navigate('/orderuser')}
                    >
                        Order History
                    </div>
                    <div className={styles.logout} onClick={_LogOut}> Logout</div>
                </div>

                <div className={styles.wapperProfile}>
                    <div className={styles.wapperRightProfile}>

                        {/* under ProfileUser */}
                        <div className={styles.recentorder}>Order History</div>
                        <table className={styles.tableOrderHis}>
                            <thead>
                                <tr>
                                    <td>Order</td>
                                    <td style={{paddingRight:'77px'}}>Date</td>
                                    <td>Status</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map(
                                    (data, index) => (
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
                                    )
                                )}
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
                                        alt = ''
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
                                        alt = ''
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={_onClickNext}
                                    className={styles.button}
                                >
                                    <img src={nextImg} alt = ''/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OrderHistory