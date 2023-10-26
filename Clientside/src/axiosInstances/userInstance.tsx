import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3003/api/users",
  });



  export const axiosDriverInstance = axios.create({
    baseURL: "http://localhost:3003/api/drivers",
  });
  
  
  export const axiosAdminInstance = axios.create({
    baseURL: "http://localhost:3003/api/admin",
  });
  

