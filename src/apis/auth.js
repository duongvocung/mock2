import axios from "axios";
import Swal from "sweetalert2";

const url = "http://137.184.207.13:5000/v1/auth";
const instanceAxios = axios.create();

export function login(email, password) {
    return instanceAxios({
        method: "POST",
        url: `${url}/login`,
        data: {
            email: email,
            password: password,
            deviceId: "deviceId-xx@gmail.com",
        },
    })
        .then((res) => {
            localStorage.setItem("username", res.data.data.user.username);
            localStorage.setItem("avatar", res.data.data.user.avatar);
            localStorage.setItem("userId", res.data.data.user.id);
            localStorage.setItem("role", res.data.data.user.role);
            localStorage.setItem("email", res.data.data.user.email);
            localStorage.setItem(
                "tokens",
                JSON.stringify(res.data.data.tokens)
            );
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        });
}

export function register(username, email, password) {
    return instanceAxios({
        method: "POST",
        url: `${url}/register`,
        data: {
            username: username,
            email: email,
            password: password,
        },
    }).catch((err) =>
        Swal.fire({
            icon: "error",
            title: err.response.data.message,
            text: "Please register again",
        })
    );
}

export function forgotPassword(email) {
    return instanceAxios({
        method: "POST",
        url: `${url}/forgot-password`,
        data: {
            email: email,
        },
    })
        .then(() =>
            Swal.fire({
                icon: "success",
                title: "Recover Password successfully!",
                text: "We just sent a new password to your email, please check it and login later",
            })
        )
        .catch((err) => {
            if (err.response.data.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: err.response.data.message,
                    text: "Please try again, we can't not find your email",
                });
            }
        });
}

export function refreshToken() {
    return instanceAxios({
        method: "POST",
        url: `${url}/refresh-tokens`,
        data: {
            refreshToken: JSON.parse(localStorage.getItem("tokens")).refresh
                .token,
            deviceId: "deviceId-xx@gmail.com",
        },
    });
}

export { instanceAxios };
