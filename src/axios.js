import axios from "axios";

export const ProDevApi = axios.create({
    baseURL: "http://127.0.0.1:9102/api/todo",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})