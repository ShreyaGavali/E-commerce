import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

const root = localStorage.getItem("persist:root");
let TOKEN = "";

if (root) {
    try {
        const parsedRoot = JSON.parse(root);
        const currentUser = parsedRoot && JSON.parse(parsedRoot.user);
        TOKEN = currentUser && currentUser.currentUser && currentUser.currentUser.accessToken;
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
    }
}


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});