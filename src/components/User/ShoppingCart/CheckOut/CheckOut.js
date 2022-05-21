import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    checkOutCart,
    getCartById,
    getInFoOrder,
    getInFoOrderById,
} from "../../../../apis/cart";
import { createOrder } from "../../../../apis/order";
import Header from "../../HomePage/Header/Header";
import NavTabs from "../../HomePage/Product/NavTabsProduct/NavTabs";
import styles from "./CheckOut.module.scss";
function CheckOut() {
    const [items, setItems] = useState([]);
    const [email, setEmail] = useState([]);
    const [itemTotal, setItemTotal] = useState({});
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getInFoOrder().then((res) => {
            setItems(res.data.orders.result);
            console.log(res.data.orders.result);
        });

        const email = localStorage.getItem("email");
        if (email) {
            setEmail(email);
        }
    }, []);
    useEffect(() => {
        getCartById(localStorage.getItem("cart")).then((res) => {
            setItemTotal(res.data.items);
            console.log(res.data.items);
        });
    }, []);

    const calculateTotalPrice = () => {
        let totalCheckout = itemTotal.reduce((prev, item) => {
            return prev + item.total;
        }, 0);
        // setTotal(totalCheckout)
        return totalCheckout;
    };
    const __clickCheckOut = () => {
        const obj = {
            order: {
                paymentMethod: "Online",
                address: address,
                contact: number,
                totalPrice: calculateTotalPrice(),
                userId: localStorage.getItem("userId"),
            },
            itemArr: itemTotal.map((item) => {
                return {
                    productId: item.itemCartInfo.id,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                };
            }),
        };
        createOrder(obj);
        localStorage.removeItem("cart");
        navigate("/home");
    };

    return (
        <div>
            <Header></Header>
            <div className={styles.nav}>
                Home {">"} Shopping Cart {">"} CheckOut
            </div>
            <div className={styles.head}>CheckOut</div>
            <div className={styles.wapperCheckOut}>
                <table className={styles.tableCheckOut}>
                    <thead className={styles.theadtb}>
                        <tr>
                            <th style={{ width: "15%", paddingLeft: "20px" }}>
                                Image
                            </th>
                            <th style={{ width: "65%" }}>Product</th>
                            <th style={{ width: "20%", textAlign: "center" }}>
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {itemTotal.length > 0 &&
                            itemTotal?.map((item) => {
                                return (
                                    <tr>
                                        <td
                                            style={{
                                                padding: "12px 0 16px 8px",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: "73px",
                                                    height: "66px",

                                                    objectFit: "cover",
                                                }}
                                                src={
                                                    item.itemCartInfo.images[0]
                                                        .url
                                                }
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    fontfamily: "Arial",
                                                    fontStyle: "normal",
                                                    fontWeight: "700",
                                                    fontSize: "24px",
                                                    lineHeight: "28px",
                                                    color: "#000000",
                                                }}
                                            >
                                                {item.itemCartInfo.name}
                                            </div>
                                            <div
                                                style={{
                                                    fontfamily: "Arial",
                                                    fontStyle: "normal",
                                                    fontWeight: "700",
                                                    fontSize: "16px",
                                                    lineHeight: "18px",
                                                    color: "#5A5A5A",
                                                }}
                                            >
                                                Qty:{item.quantity}
                                            </div>
                                        </td>
                                        <td
                                            style={{
                                                fontfamily: "'Roboto'",
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "24px",
                                                lineHeight: "28px",
                                                color: "#000000",
                                                textAlign: "center",
                                            }}
                                        >
                                            ${item.total}.00
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className={styles.CheckOutRight}>
                    <div className={styles.Info}>
                        <div className={styles.shipping}>
                            Shipping Infomation
                        </div>
                        <div className={styles.adrees}>
                            <input
                                placeholder="type address"
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={styles.phone}>Phone Number</div>
                        <div className={styles.numberPhone}>
                            <input
                                placeholder="type number"
                                onChange={(e) => setNumber(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className={styles.email}>Email Address</div>
                        <div className={styles.emailAdress}>{email}</div>
                        {/* <div className={styles.editemail}>Edit Adress</div> */}
                    </div>
                    <div className={styles.WappercheckOut}>
                        <div className={styles.name}>CheckOut</div>

                        <div className={styles.Subtotal}>
                            <div className={styles.contentSubtotal}>
                                Subtotal
                            </div>
                            <div className={styles.priceSubtotal}>
                                ${itemTotal[0] && calculateTotalPrice()}.00
                            </div>
                        </div>

                        <div className={styles.shipping}>
                            <div className={styles.contentShipping}>
                                Shipping
                            </div>
                            <div className={styles.priceShipping}>$20.00</div>
                        </div>

                        <div>
                            <svg
                                width="377"
                                height="1"
                                viewBox="0 0 377 1"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    y1="0.5"
                                    x2="377"
                                    y2="0.5"
                                    stroke="black"
                                />
                            </svg>
                        </div>

                        <div className={styles.mainPrice}>
                            <div className={styles.contentPrice}>Subtotal</div>
                            <div className={styles.pricePrice}>
                                ${itemTotal[0] && calculateTotalPrice() + 20}.00
                            </div>
                        </div>
                        {/* payment */}

                        <div className={styles.cashPrice}>
                            <input name="payment" type="radio" value="cash" />
                            <span>Cash on delivery</span>
                        </div>
                        <div className={styles.checkPrice}>
                            <input
                                name="payment"
                                type="radio"
                                value="payment"
                            />
                            <span>Check payments</span>
                        </div>
                        <div className={styles.PayPrice}>
                            <input name="payment" type="radio" value="paypal" />
                            <span>PayPal</span>
                        </div>
                        <div className={styles.masterPrice}>
                            <input name="payment" type="radio" value="cart" />
                            <span>Master Card</span>
                        </div>

                        <div>
                            <button
                                className={styles.btnCheckout}
                                onClick={__clickCheckOut}
                                disabled={
                                    number === "" || address === ""
                                        ? true
                                        : false
                                }
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
