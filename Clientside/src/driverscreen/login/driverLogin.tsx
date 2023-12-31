import { useState } from "react";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/userSlice";
import logo from "../assets/logofinal.png";
import "./driverlogin.css";
import { dns } from "../../axiosInstances/userInstance";
import { axiosDriverInstance } from "../../axiosInstances/userInstance";
const socket = io(dns);

const UserLogin = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const nav = useNavigate();

  const dispatch = useDispatch();

  const handlesubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosDriverInstance
      .post("/driverLogin", {
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        const userdata = res.data;
        const driverId=userdata.driver._id

        socket.emit("driverConnected", driverId);

        localStorage.setItem("DriverData", JSON.stringify(userdata));
        dispatch(login(userdata));
        localStorage.setItem("drivertoken", userdata.token);

        nav("/driverhome");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  useEffect(() => {
    if (localStorage.getItem("DriverData")) {
      nav("/driverhome");
    }
  }, [nav]);



  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="login-form">
        <form onSubmit={handlesubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="head">Driver Login</h1>
          <div className="input-container">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button className="button" type="submit">
              Login
            </button>
          </div>
          <div className="links-container">
          <p>
              <Link to="/driversignup">Create New accout</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
