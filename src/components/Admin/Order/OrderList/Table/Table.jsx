import styles from "./Table.module.scss";
import sortImg from "../../../../../images/sort.svg";
import { useEffect, useRef, useState } from "react";
import editImg from "../../../../../images/edit.svg";
import deleteImg from "../../../../../images/delete.svg";
import nextImg from "../../../../../images/next.svg";
import previousImg from "../../../../../images/previous.svg";
import { useNavigate } from "react-router-dom";
import { getOrdersByAdmin } from "../../../../../apis/order";
import moment from "moment";

function Table() {
    const [size, setSize] = useState(7);
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const totalPage = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        getOrdersByAdmin(size, page).then((res) => {
            console.log(res);
            totalPage.current = res.data.orders.totalPages;
            setOrders(res.data.orders.result);
        });
    }, [page, size]);

    const _onClickEdit = (id) => {
        navigate(`/dashboard/order/${id}`);
    };

    const _onClickPrevious = () => {
        setPage(page - 1);
    };

    const _onClickNext = () => {
        setPage(page + 1);
    };

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
        return null;
    };

    const _onChangePageSize = (e) => {
        setSize(e.target.value);
    };

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="column">
                            <p>ID</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>User ID</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Amount</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Address</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Contact</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Date</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Paided</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Status</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((product, index) => (
                        <tr key={product.id}>
                            <td>
                                <b>{index + 1 + (page - 1) * size}</b>
                            </td>
                            <td>{product.userId}</td>
                            <td>{product.totalPrice}</td>
                            <td>{product.address}</td>
                            <td>{product.contact}</td>
                            <td>
                                {moment(product.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                                {product.isPaid ? (
                                    <p className={styles.yes}>Yes</p>
                                ) : (
                                    <p className={styles.no}>No</p>
                                )}
                            </td>
                            <td>{product.status}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        _onClickEdit(product.id);
                                    }}
                                >
                                    <img src={editImg} alt="edit" />
                                </button>
                                <button>
                                    <img src={deleteImg} alt="delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <div className={styles.pagination_left}>
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
                            <img src={nextImg} className={styles.previousBtn} />
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
                <div className={styles.pagination_right}>
                    <p>Items per page </p>
                    <input
                        type="number"
                        value={size}
                        onChange={_onChangePageSize}
                    />
                </div>
            </div>
        </>
    );
}

export default Table;
