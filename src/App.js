import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Guard from "./components/Auth/Guard";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import HomePage from "./components/User/HomePage/HomePageDetail/HomePage";
import Product from "./components/User/HomePage/Product/ProductInfo/Product";
import { default as HomePageAdmin } from "./components/Admin/HomePage/HomePage";
import SearchProductUser from "./components/User/HomePage/SearchProductUser/SearchProductUser";
import Cart from "./components/User/ShoppingCart/CartShopping/Cart";
import CheckOut from "./components/User/ShoppingCart/CheckOut/CheckOut";
import ListProduct from "./components/User/HomePage/Product/ListProduct/ListProduct";
import OrderHistory from "./components/User/UserDetails/OrderHistory/OrderHistory";
import ProfileUser from "./components/User/UserDetails/ProfileUser/ProfileUser";
import DeleteItem from "./components/Admin/Delete/DeleteItem";
import { useContext } from "react";
import { deleteContext } from "./context/deleteContext";

function App() {
    const context = useContext(deleteContext);

    return (
        <BrowserRouter>
            {context.deleteShow.status && (
                <DeleteItem
                    item={context.deleteShow.item}
                    id={context.deleteShow.id}
                    refresh={context.deleteShow.refresh}
                />
            )}
            <Routes>
                <Route path="/admin" element={<HomePageAdmin />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route
                    path="/listproductcategoryuser/:data"
                    element={<ListProduct />}
                />
                <Route
                    path="/resultproduct/:id"
                    element={<SearchProductUser />}
                />

                <Route element={<Guard />}>
                    <Route path="/cart/" element={<Cart />} />
                    <Route path="/profileuser/" element={<ProfileUser />} />
                    <Route path="/orderuser/" element={<OrderHistory />} />
                    <Route path="/checkout/" element={<CheckOut />} />
                    <Route path="/dashboard/*" element={<HomePageAdmin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
