import "./index.css";
import { Routes, Route } from "react-router-dom";

import Login from "./userscreens/login/login";
import Signup from "./userscreens/signup/signup";
import Driversignup from "./driverscreen/signup/signup";
import DriverLogin from "./driverscreen/login/driverLogin";
import AdminLogin from "./adminscreen/adminlogin/adminlogin";
import LoginWithOtp from './userscreens/loginWithOtp/loginWithOtp';
import VerifyOTP  from './userscreens/loginWithOtp/verification/OTPverification'
import Dashboard from "./adminscreen/dashboard/dashboard";
import Navbar from "./components/admin/navbar/navbar";
import Hero from "./components/user/hero section/hero";
import Userhome from './userscreens/home'
import Users from './adminscreen/users/users'
import DriverNav from "./components/driver/drivernav/driverNav";
import Verified_driver from "./adminscreen/drivers/drivers";
import Driververication from "./adminscreen/driververification/driververify";
import Driverhome from "./driverscreen/driverhome/driverhome";
import UserProfile from "./userscreens/userprofile/userprofile";
import Driverprofile from './driverscreen/driverProfile/driverprofile'
import Drivermap from './driverscreen/drivermap/drivermap'
import SelectBikes from './userscreens/bikes/bikes'

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>




      //user
      <Route path="usersignup" element={<Signup />}></Route>

      <Route path="/userhome" element={<Userhome />}></Route>
      <Route path="hero" element={<Hero />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="userprofile" element={<UserProfile />}></Route>
      <Route path="OtpPhone" element={<LoginWithOtp />}></Route>
      <Route path="/VerifyOtp" element={<VerifyOTP />}></Route>
      <Route path="/selectbike" element={<SelectBikes />}></Route>



      //////driver
      <Route path="driversignup" element={<Driversignup />}></Route>
      <Route path="driverlogin" element={<DriverLogin />}></Route>
      <Route path="drivernav" element={<DriverNav />}></Route>
      <Route path="/driverhome" element={<Driverhome />}></Route>
      <Route path="/driveprofile" element={<Driverprofile />}></Route>
      <Route path="/drivermap" element={<Drivermap />}></Route>





      //admin
    
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="navbar" element={<Navbar />}></Route>
      <Route path="verifiedDriver" element={<Verified_driver />}></Route>
      <Route path="adminlogin" element={<AdminLogin />}></Route>
      <Route path="users" element={<Users />}></Route>
      <Route path="driver-verification" element={<Driververication />}></Route>
    </Routes>
  );
}

export default App;
