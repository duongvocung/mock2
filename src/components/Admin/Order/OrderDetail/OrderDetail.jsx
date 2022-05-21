import { useParams } from "react-router-dom";
import styles from "./OrderDetail.module.scss";
import { getOrdersById, updateOrdersById } from "../../../../apis/order";
import { useState } from "react";
import createImg from "../../../../images/create.svg";
import updateImg from "../../../../images/update.svg";
import userImg from "../../../../images/userY.svg";
import truckImg from "../../../../images/truckY.svg";
import locationImg from "../../../../images/locationY.svg";
import sortImg from "../../../../images/sort.svg";
import moment from "moment";
import { Field, Form, Formik } from "formik";
import { getUserByID } from "../../../../apis/user";

function OrderDetail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [user, setUser] = useState({});

    useState(async () => {
        const { data } = await getOrdersById(id);
        const res = await getUserByID(data.order.userId);
        setData(data);
        setUser(res.data);
    }, [id]);

    const _onSubmitForm = (values) => {
        updateOrdersById(id, values);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Dashboard / User / Order Detail #{id}
            </p>
            <div className={styles.item_info}>
                <p>Order Detail #{id}</p>
                <p>Order ID : {id}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.header_left}>
                        <div>
                            <img src={createImg} />
                            <p>
                                Created at:{" "}
                                {moment(data?.order?.createAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                        <div>
                            <img src={updateImg} />
                            <p>
                                Created at:{" "}
                                {moment(data?.order?.updatedAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                        <p>Order ID: {id}</p>
                    </div>
                    <div className={styles.header_right}>
                        <Formik
                            key={data?.order?.id || "xyz"}
                            initialValues={{
                                status: data?.order?.status || "",
                                isPaid: data?.order?.isPaid || false,
                            }}
                            onSubmit={_onSubmitForm}
                        >
                            <Form>
                                <div>
                                    <p>Status</p>
                                    <Field as="select" name="status">
                                        <option value="Processing">
                                            Processing
                                        </option>
                                        <option value="Shipping">
                                            Shipping
                                        </option>
                                    </Field>
                                </div>
                                <div>
                                    <p>Paided</p>
                                    <Field as="select" name="isPaid">
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Field>
                                </div>
                                <button type="submit">Update order</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.center_item}>
                        <div>
                            <img src={userImg} />
                        </div>
                        <div>
                            <p>Customer</p>
                            <p>Name: {user?.username}</p>
                            <p>Email: {user?.email}</p>
                            <p>
                                Phone:{" "}
                                {user?.contact ? user.contact : "Not update"}
                            </p>
                        </div>
                    </div>
                    <div className={styles.center_item}>
                        <div>
                            <img src={truckImg} />
                        </div>
                        <div>
                            <p>Order Info</p>
                            <p>Status: {data?.order?.status}</p>
                            <p>Pay method: {data?.order?.paymentMethod}</p>
                            <p>Paided: {data?.order?.isPaid ? "Yes" : "No"}</p>
                        </div>
                    </div>
                    <div className={styles.center_item}>
                        <div>
                            <img src={locationImg} />
                        </div>
                        <div>
                            <p>Deliver to</p>
                            <p>Address: {data?.order?.address}</p>
                            <p>Contact: {data?.order?.contact}</p>
                            <p>Shipper: GHTK</p>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>Items</p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="column">
                                    <p>Product</p>
                                    <img src={sortImg} alt="sort"></img>
                                </th>
                                <th scope="column">
                                    <p>Price</p>
                                    <img src={sortImg} alt="sort"></img>
                                </th>
                                <th scope="column">
                                    <p>Quantity</p>
                                    <img src={sortImg} alt="sort"></img>
                                </th>
                                <th scope="column">
                                    <p>Total</p>
                                    <img src={sortImg} alt="sort"></img>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items &&
                                data.items.map((item) => (
                                    <tr key={item.id} className={styles.tr}>
                                        <td>
                                            <img
                                                src={
                                                    item.itemInfo.images[0].url
                                                }
                                                alt="product"
                                            />
                                            <div>
                                                <p>{item.itemInfo.name}</p>
                                                <p>{item.id}</p>
                                            </div>
                                        </td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.total}</td>
                                    </tr>
                                ))}
                            <tr>
                                <td colSpan="3">Total Amount</td>
                                <td>${data?.order?.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
