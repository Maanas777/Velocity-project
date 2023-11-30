import { useState } from "react";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../redux/userSlice";
import logo from '../../assets/logofinal.png'
import { axiosInstance } from "../../../axiosInstances/userInstance";
import "./login.css";

const UserLogin = () => {
  const [OTP, setOTP] = useState<string>("");
  const phone = localStorage.getItem('UserPhone');

  const nav = useNavigate();
  const dispatch = useDispatch();


  const handlesubmit = (e: FormEvent) => {
    e.preventDefault();
  
    axiosInstance
      .post('/verifyOtp', {
        OTP,
        phone,
      })
      .then((res) => {
        if (res.data.msg === 'verified user') {
          const userDetails = localStorage.getItem('userData');
          
          if (userDetails !== null) {
            dispatch(login(userDetails));
            toast.success('User verified');
            nav('/');
          } else {
            toast.error('Invalid User');
           
          }
        } else {
          toast.error('Invalid user');
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An error occurred');
        }
      });
  };
  

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="login-form">
        <form onSubmit={handlesubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="head">Verify OTP</h1>
          <div className="input-container">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Enter your OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </div>
        
          <div className="button-container">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
          {/* <div className="links-container " style={{display:'flex',flexDirection:'column'}}>
            <p>
              <Link to="usersignup">Login with OTP</Link>{" "}
            </p>
         <button>
              <Link to="usersignup">Create New account</Link>{" "}
              </button>
      
          </div> */}
        
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
