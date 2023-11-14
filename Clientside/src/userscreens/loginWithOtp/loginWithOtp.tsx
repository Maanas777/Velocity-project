import { useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../axiosInstances/userInstance";
import logo from "../assets/logofinal.png";
import "./login.css";

const UserLogin = () => {
  const [phone, setphone] = useState<string>("");
  //   const [password, setpassword] = useState<string>("");

  const nav = useNavigate();

  const handlesubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/sendOtp", {
        phone,
      });
      const userdetails = res.data.existingUser;
      localStorage.setItem("userData", JSON.stringify(userdetails));
      toast.success(res.data.msg);

      localStorage.setItem("UserPhone", JSON.stringify(phone));

      nav("/VerifyOtp");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="login-form">
        <form onSubmit={handlesubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="head">OTP Login</h1>
          <div className="input-container">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
            />
          </div>

          <div className="button-container">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
