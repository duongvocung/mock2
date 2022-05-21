import { useContext, useRef } from "react";
import { deleteContext } from "../../../context/deleteContext";
import styles from "./DeleteItem.module.scss";
import { deleteProductById } from "../../../apis/product";
import { deleteUserById } from "../../../apis/user";

function DeleteItem({ id, item, refresh }) {
    const context = useContext(deleteContext);
    const deleteRef = useRef();

    const _onClickCancel = () => {
        context.setDeleteShow({
            status: false,
            id: 0,
            item: "",
            refresh: () => {},
        });
    };

    const _onClickDelete = async () => {

        context.setDeleteShow({
            status: false,
            id: 0,
            item: "",
            refresh: () => {},
        });

        if (item === "product") {
            await deleteProductById(id);
        } else if (item === "user") {
            await deleteUserById(id);
        }
        await refresh();
    };

    return (
        <div className={styles.background} ref={deleteRef}>
            <div className={styles.content}>
                <p>Confirm Delete</p>
                <div>
                    Are you sure to delete this {item} #{id} ?
                </div>
                <div>
                    <button
                        type="button"
                        onClick={_onClickCancel}
                        className={styles.cancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={_onClickDelete}
                        className={styles.delete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteItem;
