import { getCookie } from "@tanstack/react-start-server";
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.request.use((config) => {
    const token = getCookie("ICW_TOKEN");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;