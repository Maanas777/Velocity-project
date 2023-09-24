// import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import {useEffect} from 'react'
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { selectUser } from '../../../redux/userSlice';
import profile from './pngwing.com (1).png'
import './userNav.css'

import logo from './logofinal.png'





const UserNav = () => {


  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
          
        const parsedUserData = JSON.parse(storedUserData);
        const username=parsedUserData?.username
        const username2=parsedUserData?.user?.username

        console.log(username);
        console.log(username2);
        
        
    return (
      <Navbar className='custom-user-nav ' expand="md">
        <div className="container">
          <Navbar.Brand href="#home " className='d-flex  align-items-center justify-content-center '>
            <img
              src={logo}
              alt="Logo"
          
           className='driver-nav-logo'
           
            />
           <h1 className="mb-0 driver_heading"></h1>
  
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginLeft: '10px' }}>
   <Link to="/userhome" style={{ color: location.pathname === '/userhome' ? 'oceanblue' : 'black',   
   fontWeight: location.pathname === '/userhome' ? 'bolder' : 'normal',
  
    marginRight: '40px',  
    textDecoration: 'none'}}>
    Home
   </Link>
   <Link to="#about" style={{ color: 'black', marginRight: '40px', textDecoration: 'none' }}>
    About
   </Link>
   <Link to="#services" style={{ color: 'black', marginRight: '30px', textDecoration: 'none' }}>
    Careers
   </Link>
   <Link to="#contact" style={{ color: 'black', marginRight: '40px', textDecoration: 'none' }}>
    Contact
   </Link>
     </Nav>

            {storedUserData && (
                <Link to='/userprofile'>
              <div className="d-flex  flex-column  align-items-center">
                <img src={profile} style={{ height: '3rem', marginRight: '10px' }} alt="" />
                <span style={{color:'black',textDecoration: 'none'}}>{username || username2 || ''}</span>
              </div>
              </Link>
            )}
            
           
           
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
}
}
export default UserNav;
