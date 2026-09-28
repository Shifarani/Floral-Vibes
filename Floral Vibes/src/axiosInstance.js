import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://floral-vibes-backend.onrender.com/api",
});

export default axiosInstance;