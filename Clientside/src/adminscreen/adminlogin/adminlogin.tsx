import React, { useState, FormEvent } from 'react';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logofinal.png'; 
import { axiosAdminInstance } from '../../axiosInstances/userInstance';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const nav = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosAdminInstance.post('/adminlogin', {
      email,
      password,
    })
    .then((res) => {
        console.log(res);   
      toast.success(res.data.message);
      localStorage.setItem('email','email')
      nav('/dashboard')
    
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      nav("/dashboard");
    }
  }, [nav]);



  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className='head'>Admin Login</h1>
          <div className="input-container">
            <input
              className='input'
              type="text"
              id="username"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button className='button' type="submit">Login</button>
          </div>
     
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
