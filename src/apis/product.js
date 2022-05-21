import axios from "axios";
import { instanceAxios } from "./auth";
import Swal from "sweetalert2";

const url = "http://137.184.207.13:5000/v1/";

export function getAllProduct(page) {
    return instanceAxios({
        method: "GET",
        url: `${url}/products?size=4&page=${page}`,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}
export function getAllCategories() {
    return instanceAxios({
        method: "GET",
        url: `${url}/products/get-all-categories`,
    })
        .then((res) => {
            console.log(res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function searchProduct(a) {
    return instanceAxios({
        method: "GET",
        url: `${url}/search?keyword=${a}`,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}
export function getListProductByCategory(a) {
    return instanceAxios({
        method: "GET",
        url: `${url}/products?category=${a}`,
    })
        .then((res) => {
            console.log(res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}
export function createReviewByUser(a) {
    return instanceAxios({
        method: "POST",
        url: `${url}/products?category=${a}`,
    })
        .then((res) => {
            console.log(res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function getProductById(id) {
    return instanceAxios({
        method: "GET",
        url: `${url}/products/${id}`,
    })
        .then((res) => {
            // console.log(res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
}
export function postReview(content, rating, id) {
    return axios({
        method: "POST",
        url: `${url}/products/${id}/reviews`,
        data: {
            content: content,
            rating: rating,
            productId: id,
        },
    }).catch(() => {
        Swal.fire({
            icon: "error",
            title: "Only comment one !",
        });
    });
}

export function getAllProductByAdmin(size, page) {
    return instanceAxios({
        method: "GET",
        url: `${url}/products?size=${size}&page=${page}`,
    }).catch((err) => console.log(err));
}

export function searchProductByAdmin(keyword, size, page) {
    return instanceAxios({
        method: "GET",
        url: `${url}/search?keyword=${keyword}&size=${size}&page=${page}`,
    }).catch((err) => console.log(err));
}

export function createProductByAdmin(product) {
    return axios({
        method: "POST",
        url: `${url}/products`,
        data: product,
    })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Create product successfully!",
                text: "You can check it in list product",
            });
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Create product Failed !",
            });
        });
}

export function updateProductByAdmin(id, product) {
    return axios({
        method: "PATCH",
        url: `${url}/products/${id}`,
        data: product,
    })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Update product successfully!",
                text: "You can check it in list product",
            });
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Update product Failed !",
            });
        });
}

export function uploadImgByAdmin(data) {
    return axios({
        method: "POST",
        url: `${url}/uploads`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: data,
    })
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => console.log(err.response.data.message));
}

export function deleteProductById(id) {
    return axios({
        method: "DELETE",
        url: `${url}/products/${id}`,
    })
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Delete Successfully!",
            });
        })
        .catch((err) => console.log(err.response.data.message));
}

export function updateImage(id, url) {
    return axios({
        method: "PATCH",
        url: `http://137.184.207.13:5000/v1/media/${id}`,
        data: {
            url: url,
        },
    })
        .then((res) => res.data)
        .catch((err) => console.log(err.response.data.message));
}
