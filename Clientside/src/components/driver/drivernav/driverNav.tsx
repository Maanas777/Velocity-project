// import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logofinal.png'
// import profile from'../pngwing.com (1).png'
import './driverNav.css'

const MyNavbar = () => {
  return (
    <Navbar className='custom-driver-nav ' expand="md">
      <div className="container">
        <Navbar.Brand href="#home " className='d-flex  align-items-center justify-content-center '>
          <img
            src={logo}
            alt="Logo"
        
         className='driver-nav-logo'
         
          />
         <h1 className="mb-0 driver_heading">Driver</h1>

        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto " >
          <Nav.Link href="#home" style={{ marginRight: '10%' }}>Home</Nav.Link>
    <Nav.Link href="#about" style={{ marginRight: '10%' }}>About</Nav.Link>
    <Nav.Link href="#services" style={{ marginRight: '10%' }}>Services</Nav.Link>
    <Nav.Link href="#contact" style={{ marginRight: '10%' }}>Contact</Nav.Link>
    {/* <Nav.Link href="#contact" style={{ marginRight: '10%' }}>
    <img className='img-fluid driver-nav-profile' src={profile} alt="" />
    </Nav.Link> */}
          </Nav>
         
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
