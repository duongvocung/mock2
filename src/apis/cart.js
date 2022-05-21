import axios from "axios";
import { instanceAxios } from "./auth";
import Swal from "sweetalert2";

const url = "http://137.184.207.13:5000/v1/cart";

export function createCart(data) {
    return axios({
        method: "POST",
        url: url,
        data: data,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function createItem(item) {
    return axios({
        method: "POST",
        url: `${url}/create-item`,
        data: item,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function getCartById(id) {
    return axios({
        method: "GET",
        url: `${url}/${id}`
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function deleteCartById(id) {
    return axios({
        method: "DELETE",
        url: `http://137.184.207.13:5000/v1/cart/manage-item/${id}`
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}
export function getInFoOrder() {
    return axios({
        method: "GET",
        url: `http://137.184.207.13:5000/v1/orders/my-orders`
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}
export function getInFoOrderById(id) {
    return axios({
        method: "GET",
        url: `http://137.184.207.13:5000/v1/orders/${id}`
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function updatetotalCart(id) {
    return axios({
        method: "GET",
        url: `http://137.184.207.13:5000/v1/cart/${id}`
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}


