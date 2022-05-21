import styles from "./ListProduct.module.scss";
import searchBigImg from "../../../../images/searchBig.svg";
import Table from "./Table/Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ListProduct() {
    const navigate = useNavigate();
    const [values, setValues] = useState();

    const _onSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/dashboard/product/${values}`)
    };

    const _onChange = (e) => {
        setValues(e.target.value);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / Product</p>
            <div className={styles.item_info}>
                <p>Product</p>
                <button
                    onClick={() => {
                        navigate("/dashboard/create-product");
                    }}
                >
                    New product
                </button>
            </div>
            <div className={styles.content}>
                <div>
                    <img src={searchBigImg} alt="search"></img>
                    <form onSubmit={_onSubmitSearch}>
                        <input
                            placeholder="Search products"
                            onChange={_onChange}
                        ></input>
                    </form>
                </div>
                <Table />
            </div>
        </div>
    );
}

export default ListProduct;
