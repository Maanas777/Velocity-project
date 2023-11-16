import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/users",
  });

  // export const axiosInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/users",
  // });


  export const axiosDriverInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/drivers",
  });
  // export const axiosDriverInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/drivers",
  // });
  
  

  export const axiosAdminInstance = axios.create({
    baseURL: "https://www.velocityy.online/api/admin",
  });

  // export const axiosAdminInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/admin",
  // });




  export const dns="https://www.velocityy.online"
  

  // export const dns="http://localhost:3003"