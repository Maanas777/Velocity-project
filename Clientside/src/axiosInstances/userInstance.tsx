import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://velocity-2zab.onrender.com/api/users",
  });

 
  export const axiosDriverInstance = axios.create({
    baseURL: " https://velocity-2zab.onrender.com/api/drivers",
  });


  export const axiosAdminInstance = axios.create({
    baseURL: " https://velocity-2zab.onrender.com/api/admin",
  });

  // export const axiosInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/users",
  // });



  // export const axiosDriverInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/drivers",
  // });
  
  



  // export const axiosAdminInstance = axios.create({
  //   baseURL: "http://localhost:3003/api/admin",
  // });




  export const dns=" https://velocity-2zab.onrender.com"
  

  // export const dns="http://localhost:3003"