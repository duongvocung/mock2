import axios from "axios";
import Swal from "sweetalert2";

const url = "http://137.184.207.13:5000/v1/orders";

export function getOrdersByAdmin(size, page) {
    return axios({
        method: "GET",
        url: `${url}?size=${size}&page=${page}`,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function getOrdersById(id) {
    return axios({
        method: "GET",
        url: `${url}/${id}`,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function updateOrdersById(id, data) {
    return axios({
        method: "PATCH",
        url: `${url}/${id}`,
        data: data,
    })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Update successfully!",
            });
        })
        .catch((err) => console.log(err));
}

export function createOrder(data) {
    return axios({
        method: "POST",
        url: url,
        data: data,
    })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Order successfully!",
            });
        })
        .catch((err) => console.log(err));
}
