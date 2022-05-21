import React, { useEffect, useState } from "react";
import { deleteCartById, getCartById } from "../../../../apis/cart";
import Header from "../../HomePage/Header/Header";
import NavTabs from "../../HomePage/Product/NavTabsProduct/NavTabs";
import styles from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState({});
    const [items, setItems] = useState([]);
    const [checkItem, setCheckItem] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            getCartById(localStorage.getItem("cart")).then((res) => {
                setCart(res.data.cart);
            });
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            getCartById(localStorage.getItem("cart")).then((res) => {
                setItems(res.data.items);
            });
        }
    }, [checkItem]);

    console.log(items);

    const calculateTotalPrice = () => {
        return items.reduce((prev, item) => {
            return prev + item.total;
        }, 0);
    };

    const increaseQuantity = (id) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        total: (item.quantity + 1) * item.price,
                    };
                }
                return item;
            })
        );
    };

    const decreaseQuantity = (id) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    if (item.quantity === 1) {
                        _deleteItems(item.id);
                    }
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        total: (item.quantity - 1) * item.price,
                    };
                }
                return item;
            })
        );
    };
    const _deleteItems = async (id) => {
        try {
            await deleteCartById(id);
            if (checkItem == true) {
                setCheckItem(false);
            } else {
                setCheckItem(true);
            }
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div>
            <Header></Header>
            <div className={styles.nav}>Home {'>'} Shopping Cart</div>
            <div className={styles.head}>Shopping Cart</div>
            <table className={styles.tableCart}>
                <thead>
                    <tr>
                        <th className={styles.imgTb}>Image</th>
                        <th className={styles.productTb}>Product</th>
                        <th className={styles.priceTb}>Price</th>
                        <th className={styles.quantityTb}>Quantity</th>

                        <th className={styles.totalTb}>Total</th>
                    </tr>
                </thead>
                {items.map((data, index) => (
                    <tbody key={index}>
                        <tr>
                            <td className={styles.imgBody}>
                                <img
                                    style={{ width: "119px", height: "108px" }}
                                    src={data.itemCartInfo.images[0].url}
                                    alt=""
                                />
                            </td>

                            <td className={styles.productBody}>
                                {data.itemCartInfo.name}
                            </td>
                            <td className={styles.priceBody}>
                                {" "}
                                ${data.price}.00
                            </td>
                            <td className={styles.quantityBody}>
                            <button
                                    onClick={() => {
                                        decreaseQuantity(data.id);
                                    }}
                                    className={styles.btnBodyLeft}
                                >
                                    --
                                </button>
                                <input
                                    disabled
                                    type="number"
                                    value={data.quantity}
                                    className={styles.inputBody}
                                ></input>
                                <button
                                    onClick={() => {
                                        increaseQuantity(data.id);
                                    }}
                                    className={styles.btnBodyRight}
                                >
                                    +
                                </button>
                              
                               
                            </td>

                            <td className={styles.totalBody}>${data.total}.00</td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <div className={styles.wapperCart}>
                <div className={styles.wapperBtn}>
                    <input
                        className={styles.btnCode}
                        placeholder="Coupon Code"
                    ></input>
                    <button className={styles.btnApply}>Apply Coupon </button>
                </div>
                <div className={styles.wapper__CartTotals}>
                    <div className={styles.CartTotals}>Cart Totals</div>
                    <div className={styles.Subtotal}>
                        <div className={styles.contentSubtotal}>Subtotal</div>
                        <div className={styles.priceSubtotal}>
                            ${items[0] && calculateTotalPrice()}.00
                        </div>
                    </div>
                    <div className={styles.shipping}>
                        <div className={styles.contentShipping}>Shipping</div>
                        <div className={styles.priceShipping}>$20.00</div>
                    </div>
                    <div className={styles.mainPrice}>
                        <div className={styles.contentPrice}>Total</div>
                        <div className={styles.pricePrice}>
                            ${items[0] && calculateTotalPrice() + 20}.00
                        </div>
                    </div>
                    <button onClick={() => navigate("/checkout")}>
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
