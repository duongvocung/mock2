import axios from "axios";
import { instanceAxios, refreshToken } from "./auth";

axios.interceptors.request.use(async (req) => {
    const expires = Number(
        new Date(JSON.parse(localStorage.getItem("tokens")).access.expires)
    );
    const current = Number(new Date());
    document.body.classList.add("loading-indicator");

    if (expires <= current) {
        await refreshToken(
            JSON.parse(localStorage.getItem("tokens")).refresh.token
        )
            .then((res) => {
                console.log("refreshed");
                localStorage.setItem("tokens", JSON.stringify(res.data.data));

                req.headers = {
                    ...req.headers,
                    Authorization: `Bearer ${res.data.data.access.token}`,
                };
                return req;
            })
            .catch((err) => console.log(err));
    }

    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("tokens")).access.token
        }`,
    };

    return req;
});

instanceAxios.interceptors.request.use((req) => {
    document.body.classList.add("loading-indicator");
    return req;
});

instanceAxios.interceptors.response.use(
    (res) => {
        document.body.classList.remove("loading-indicator");
        return res;
    },
    (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        document.body.classList.remove("loading-indicator");
        return res;
    },
    (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);
