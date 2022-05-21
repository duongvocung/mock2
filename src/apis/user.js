import axios from "axios";
import { instanceAxios } from "./auth";
import Swal from "sweetalert2";

const url = "http://137.184.207.13:5000/v1/users";

export function getAllUsersByAdmin(size, page) {
    return axios({
        method: "GET",
        url: `${url}?size=${size}&page=${page}`,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function addUserByAdmin(user) {
    return axios({
        method: "POST",
        url: `${url}`,
        data: user,
    })
        .then((res) => res.data)
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message,
            });
        });
}

export function updateUserByAdmin(id, user) {
    return axios({
        method: "PATCH",
        url: `${url}/${id}`,
        data: user,
    })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Update user successfully!",
                text: "You can check it in list user",
            });
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Update user Failed !",
            });
        });
}

export function getUserByID(id) {
    return axios({
        method: "GET",
        url: `${url}/${id}`,
    })
        .then((res) => res.data)
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message,
            });
        });
}

export function deleteUserById(id) {
    return axios({
        method: "DELETE",
        url: `${url}/${id}`,
    })
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Delete Successfully!",
            });
        })
        .catch((err) => console.log(err.response.data.message));
}

export function getUserProfile() {
    return axios({
        method: "GET",
        url: `http://137.184.207.13:5000/v1/users/my-profile`,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function getUserOrder(size, page) {
    return axios({
        method: "GET",
        url: `http://137.184.207.13:5000/v1/orders/my-orders?size=${size}&page=${page}`,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export function searchUserByAdmin(keyword, size, page) {
    return axios({
        method: "GET",
        url: `${url}?username=${keyword}&size=${size}&page=${page}`,
    }).catch((err) => console.log(err));
}
export const changeProfile = (id, phone, userName) =>{
    return axios({
        method: "PATCH",
        url: `http://137.184.207.13:5000/v1/users/${id}`,
        contact: phone,
        username:userName
    }).catch((err) => console.log(err));
}
