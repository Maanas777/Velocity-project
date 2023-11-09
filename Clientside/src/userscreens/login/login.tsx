import { useState } from "react";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { login } from "../../redux/userSlice";
import logo from "../assets/logofinal.png";
import { axiosInstance } from "../../axiosInstances/userInstance";
import "./login.css";

const socket = io("http://localhost:3003");

const UserLogin = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosInstance
      .post("/userLogin", { email, password })

      .then((res) => {
        toast.success(res.data.message);
        const userdata = res.data;

        socket.emit("loginUser", { userId: userdata.user._id });

        localStorage.setItem("userData", JSON.stringify(userdata));
        localStorage.setItem("token", userdata.token);

        dispatch(login(userdata));

        nav("/userhome");
      })
      .catch((err) => {
        console.log(err);

        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="login-form">
        <form onSubmit={handlesubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="head">Login</h1>
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
          <div
            className="links-container "
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>
              <Link to="OtpPhone">Login with OTP</Link>{" "}
            </p>
            <p>
              <Link to="usersignup">Create New accout</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
