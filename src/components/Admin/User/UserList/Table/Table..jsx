import styles from "./Table.module.scss";
import sortImg from "../../../../../images/sort.svg";
import { getAllUsersByAdmin, searchUserByAdmin } from "../../../../../apis/user";
import { useContext, useEffect, useRef, useState } from "react";
import editImg from "../../../../../images/edit.svg";
import deleteImg from "../../../../../images/delete.svg";
import nextImg from "../../../../../images/next.svg";
import previousImg from "../../../../../images/previous.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatarImg from "../../../../../images/avatar.png";
import { deleteContext } from "../../../../../context/deleteContext";

function Table() {
    const { username } = useParams();
    const context = useContext(deleteContext);
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const totalPage = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            searchUserByAdmin(username, size, page).then((res) => {
                totalPage.current = res.data.data.totalPages;
                setUsers(res.data.data.result);
            });
        } else {
            getAllUsersByAdmin(size, page).then((res) => {
                totalPage.current = res.data.totalPages;
                setUsers(res.data.result);
            });
        }
    }, [page, size, username]);

    const refreshPage = () => {
        getAllUsersByAdmin(size, page).then((res) => {
            totalPage.current = res.data.totalPages;
            setUsers(res.data.result);
        });
    };

    const _onClickEdit = (id) => {
        navigate(`/dashboard/edit-user/${id}`);
    };

    const _onClickDelete = (id) => {
        context.setDeleteShow({
            status: true,
            id: id,
            item: "user",
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
                            <p style={{ marginLeft: "24px" }}>User</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Contact</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Status</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Verify Email</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                        <th scope="column">
                            <p>Verify Contact</p>
                            <img src={sortImg} alt="sort"></img>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>
                                <b>{index + 1 + (page - 1) * 5}</b>
                            </td>
                            <td>
                                <div className={styles.column_product}>
                                    <img
                                        src={
                                            user.avatar
                                                ? user.avatar
                                                : avatarImg
                                        }
                                        alt="user"
                                    />
                                    <div>
                                        <Link to={`/dashboard/user/${user.id}`}>
                                            {user.username}
                                        </Link>
                                        {user.role === "admin" ? (
                                            <p className={styles.admin}>
                                                {"Admin"}
                                            </p>
                                        ) : (
                                            <p className={styles.customer}>
                                                {"Customer"}
                                            </p>
                                        )}
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{user.contact ? user.contact : "Not found"}</td>
                            <td>{user.isActive ? "Active" : "Disabled"}</td>
                            <td>{user.isEmailVerified ? "Yes" : "No"}</td>
                            <td>{user.isContactVerified ? "Yes" : "No"}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        _onClickEdit(user.id);
                                    }}
                                >
                                    <img src={editImg} alt="edit" />
                                </button>
                                <button>
                                    <img
                                        src={deleteImg}
                                        onClick={() => _onClickDelete(user.id)}
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
                            <img src={previousImg} alt="previous" />
                        </button>
                    ) : (
                        <button
                            onClick={_onClickPrevious}
                            className={styles.button}
                        >
                            <img
                                src={nextImg}
                                className={styles.previousBtn}
                                alt="previous"
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
                                alt="previous"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={_onClickNext}
                            className={styles.button}
                        >
                            <img src={nextImg} alt="previous" />
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
