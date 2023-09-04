import "./index.css";
import { Routes, Route } from "react-router-dom";

import Login from "./userscreens/login/login";
import Signup from "./userscreens/signup/signup";
import Driversignup from "./driverscreen/signup/signup";
import DriverLogin from "./driverscreen/login/driverLogin";
import AdminLogin from "./adminscreen/adminlogin/adminlogin";
import Sidebar from "./components/admin/sidebar/sidebar";
import Dashboard from "./adminscreen/dashboard";
import Navbar from "./components/admin/navbar/navbar";
import Hero from "./components/user/hero section/hero";
import Userhome from './userscreens/home'
// import Usernav from './components/user/navbar/userNav'
import Verified_driver from "./adminscreen/verified_driver";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>




      //user
      <Route path="/" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="hero" element={<Hero />}></Route>
      <Route path="userhome" element={<Userhome />}></Route>




      //////driver
      <Route path="driversignup" element={<Driversignup />}></Route>
      <Route path="driverlogin" element={<DriverLogin />}></Route>






      //admin
      <Route path="sidebar" element={<Sidebar />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="navbar" element={<Navbar />}></Route>
      <Route path="verifiedDriver" element={<Verified_driver />}></Route>
      <Route path="adminlogin" element={<AdminLogin />}></Route>
    </Routes>
  );
}

export default App;
