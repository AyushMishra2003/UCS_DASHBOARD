import axios from 'axios'

// const BASE_URL = "http://localhost:5000/api/v1/"
const BASE_URL = "https://api.ucscab.com/api/v1"


const axiosInstance1 = axios.create()

axiosInstance1.defaults.baseURL = BASE_URL
axiosInstance1.defaults.withCredentials = true

export default axiosInstance1