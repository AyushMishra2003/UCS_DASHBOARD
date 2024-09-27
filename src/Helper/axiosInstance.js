import axios from 'axios'

// const BASE_URL = "https://ucb-car-backend.onrender.com/api/v1/admin"
const BASE_URL = "http://localhost:5004/api/v1/admin"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true

export default axiosInstance