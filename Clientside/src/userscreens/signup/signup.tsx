import  { useState } from 'react';
import logo from '../assets/logofinal.png'
import './signup.css';
import { FormEvent } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const isStrongPassword = (password:string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    );
}; 




const Signup = () => {
    const [username, setusername] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [phone, setphone] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [confirmpassword, setconfirmpassword] = useState<string>('');

    const handlesubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();

        if (trimmedUsername === '' || trimmedEmail === '' || trimmedPhone === '' || trimmedPassword === '') {
           
            toast.error('Please fill in all required fields.');
            return; 
        }
        if (!isStrongPassword(trimmedPassword)) {
            toast.error('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            return; 
        }




        if (password !== confirmpassword) {
            toast.error('Passwords do not match');
        } else {
            axios
                .post('http://localhost:3003/api/users/signup', {
                    username,
                    email,
                    phone,
                    password,
                })
                .then((res) => {
                    console.log(res.data);
                    toast.success('User created successfully');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('An error occurred');
                });
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <form onSubmit={handlesubmit} className="signup-form">
                <h1>Sign Up</h1>

                <div className="input-container">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        required
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={confirmpassword}
                        onChange={(e) => setconfirmpassword(e.target.value)}
                    />
                </div>

                <div className="button-container">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="login-link">
                    <p>
                        Already have an account? <Link to='/'>LogIn</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
