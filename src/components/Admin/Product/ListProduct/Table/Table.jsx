import styles from "./Table.module.scss";
import sortImg from "../../../../../images/sort.svg";
import {
    getAllProductByAdmin,
    searchProductByAdmin,
} from "../../../../../apis/product";
import { useContext, useEffect, useRef, useState, memo } from "react";
import editImg from "../../../../../images/edit.svg";
import deleteImg from "../../../../../images/delete.svg";
import starImg from "../../../../../images/star.svg";
import starFullImg from "../../../../../images/starFull.svg";
import nextImg from "../../../../../images/next.svg";
import previousImg from "../../../../../images/previous.svg";
import { useNavigate, useParams } from "react-router-dom";
import { deleteContext } from "../../../../../context/deleteContext";

function Table() {
    const { keyword } = useParams();
    const context = useContext(deleteContext);
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const totalPage = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (keyword) {
            searchProductByAdmin(keyword, size, page).then((res) => {
                totalPage.current = res.data.data.products.totalPages;
                setProducts(res.data.data.products.result);
            });
        }else {
            getAllProductByAdmin(size, page).then((res) => {
                totalPage.current = res.data.data.totalPages;
                setProducts(res.data.data.result);
            });
        }
    }, [page, size, keyword]);

    const refreshPage = () => {
        getAllProductByAdmin(size, page).then((res) => {
            totalPage.current = res.data.data.totalPages;
            setProducts(res.data.data.result);
        });
    };

    const renderStar = (number) => {
        const arr = [1, 1, 1, 1, 1];
        return arr.map((element, index) => {
            if (index >= number) {
                return <img src={starImg} key={index}></img>;
            }
            return <img src={starFullImg} key={index}></img>;
        });
    };

    const _onClickEdit = (id) => {
        navigate(`/dashboard/edit-product/${id}`);
    };

    const _onClickDelete = (id) => {
        context.setDeleteShow({
            status: true,
            id: id,
            item: "product",
            refresh: refreshPage,
        });
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
                            <p>Product</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Brand</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Category</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Stock</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Price</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Rating</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>
                                <b>{index + 1 + (page - 1) * size}</b>
                            </td>
                            <td>
                                <div className={styles.column_product}>
                                    <img
                                        src={product.images[0].url}
                                        alt="product"
                                    />
                                    <div>
                                        <p>{product.name}</p>
                                        <p>ID: {product.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>
                                {product.countInStock
                                    ? product.countInStock + " items"
                                    : "Out of stock"}
                            </td>
                            <td>${product.price}</td>
                            <td>{renderStar(product.rating)}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        _onClickEdit(product.id);
                                    }}
                                >
                                    <img src={editImg} alt="edit" />
                                </button>
                                <button>
                                    <img
                                        src={deleteImg}
                                        onClick={() =>
                                            _onClickDelete(product.id)
                                        }
                                        alt="delete"
                                    />
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

export default memo(Table);
