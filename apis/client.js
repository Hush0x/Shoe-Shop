import axios from "axios";
import { baseURL } from "./urls";
import { tokenName } from "./auth-token";
export function generateHttpClient() {
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: localStorage.getItem(tokenName) }
    });
};
