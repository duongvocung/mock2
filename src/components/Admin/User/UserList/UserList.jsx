import styles from "./UserList.module.scss";
import searchBigImg from "../../../../images/searchBig.svg";
import Table from "./Table/Table.";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserList() {
    const navigate = useNavigate();
    const [values, setValues] = useState();

    const _onSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/dashboard/user-search/${values}`)
    };

    const _onChange = (e) => {
        setValues(e.target.value);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / User</p>
            <div className={styles.item_info}>
                <p>User</p>
                <button onClick={() => {navigate('/dashboard/create-user')}}>New User</button>
            </div>
            <div className={styles.content}>
                <div>
                    <img src={searchBigImg} alt="search"></img>
                    <form onSubmit={_onSubmitSearch}>
                        <input
                            className={styles.input}
                            placeholder="Search user"
                            onChange={_onChange}
                        ></input>
                    </form>
                </div>
                <Table />
            </div>
        </div>
    );
}

export default UserList;
