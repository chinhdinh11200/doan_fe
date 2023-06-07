import axios from "axios";
import { API_ROOT, TIME_OUT } from "../constants/api";

let failAuth = 0;
const instance = axios.create({
    baseURL: API_ROOT,
    timeout: TIME_OUT,
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            if (typeof window !== "undefined") {
                console.log("error", error);
            }
        }
        if (error?.response?.status === 403) {
            console.log("test");
        }
        return Promise.reject(error);
    }
);

export function setDefaultHeaders(headers) {
    Object.keys(headers).forEach((key) => {
        instance.defaults.headers.common[key] = headers[key];
    });
}

export default instance;
