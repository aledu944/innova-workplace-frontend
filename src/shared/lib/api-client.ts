import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1YXJ0ZW1hdHRpYXM0QGdtYWlsLmNvbSIsImlkIjoiOWI2YWMyYzMtYzkwNC00MWY4LWE4YTMtNjQwMTk1NWIzYWQ4IiwibmFtZSI6Ik1hdHRpYXMgQWxleGFuZHJlIiwiaWF0IjoxNzgwMDYzMTg5LCJleHAiOjE3ODAxNDk1ODl9.mF8c_Z6lRZhES_ged0TxYA3dSvGze_fACJYGIRDHgpk`,
    }
})


export default apiClient;