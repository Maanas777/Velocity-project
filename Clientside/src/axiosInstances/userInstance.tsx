import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3003/api/users",
  });
  

  export default axiosInstance;