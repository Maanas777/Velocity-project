import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/users",
  });



  export const axiosDriverInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/drivers",
  });
  
  

  export const axiosAdminInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/admin",
  });
  

  export const dns="https://www.velocityy.online"
  

