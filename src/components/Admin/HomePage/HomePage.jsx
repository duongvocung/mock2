import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import styles from "./HomePage.module.scss";
import ListProduct from "../Product/ListProduct/ListProduct";
import AddProduct from "../Product/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import EditProduct from "../Product/EditProduct/EditProduct";
import UserList from "../User/UserList/UserList";
import AddUser from "../User/AddUser/AddUser";
import EditUser from "../User/EditUser/EditUser";
import UserDetail from "../User/UserDetail/UserDetail";
import OrderList from "../Order/OrderList/OrderList";
import OrderDetail from "../Order/OrderDetail/OrderDetail";

function HomePage() {
    return (
        <div className={styles.container}>
            <NavBar />
            <SideBar />
            <Routes>
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="edit-user/:id" element={<EditUser />} />
                <Route path="product" element={<ListProduct />} />
                <Route path="product/:keyword" element={<ListProduct />} />
                <Route path="create-product" element={<AddProduct />} />
                <Route path="user" element={<UserList />} />
                <Route path="user-search/:username" element={<UserList />} />
                <Route path="create-user" element={<AddUser />} />
                <Route path="user/:id" element={<UserDetail />} />
                <Route path="order" element={<OrderList />} />
                <Route path="order/:id" element={<OrderDetail />} />
                <Route path="user-search" element={<UserList />} />
            </Routes>
        </div>
    );
}

export default HomePage;
