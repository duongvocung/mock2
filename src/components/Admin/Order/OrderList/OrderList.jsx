import styles from "./OrderList.module.scss";
import searchBigImg from "../../../../images/searchBig.svg"
import Table from "./Table/Table";

function OrderList() {

    const _onSubmitSearch = () => {

    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / Order</p>
            <div className={styles.item_info}>
                <p>Orders</p>
            </div>
            <div className={styles.content}>
                <div>
                    <img src={searchBigImg} alt="search"></img>
                    <form onSubmit={_onSubmitSearch}>
                        <input placeholder="Search orders"></input>
                    </form>
                </div>
                <Table />
            </div>
        </div>
    );
}

export default OrderList;
