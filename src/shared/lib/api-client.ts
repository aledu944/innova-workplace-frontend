import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
    }
})


export default apiClient;