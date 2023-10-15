// import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import logo from "./logofinal.png";
import { Link } from "react-router-dom";
import profile from "../pngwing.com (1).png";
import "./driverNav.css";

const MyNavbar = () => {
  const storedDriverData = localStorage.getItem("DriverData");

  const nav=useNavigate()





  const handleLogout=()=>{
    localStorage.removeItem("drivertoken")
    localStorage.removeItem("DriverData")
    nav('/driverlogin')
 
    
  }








  if (storedDriverData) {
    const parsedDriverData = JSON.parse(storedDriverData);
    const drivername2 = parsedDriverData?.Drivername;
    const drivername = parsedDriverData.driver?.Drivername;

    return (
      <Navbar className="custom-driver-nav " expand="md">
        <div className="container">
          <Navbar.Brand
            href="#home "
            className="d-flex  align-items-center justify-content-center "
          >
            <img src={logo} alt="Logo" className="driver-nav-logo" />
            <h1 className="mb-0 driver_heading">Driver</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Link
                to="/driverhome"
                style={{
                  color:
                    location.pathname === "/driverhome" ? "indigo" : "black",
                  fontWeight:
                    location.pathname === "/driverhome" ? "bolder" : "normal",

                  marginRight: "40px",
                  textDecoration: "none",
                }}
              >
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
              {/* <Nav.Link href="#contact" style={{ marginRight: '10%' }}>
    <img className='img-fluid driver-nav-profile' src={profile} alt="" />
    </Nav.Link> */}
            </Nav>

            {storedDriverData && (
              <Link to="/driveprofile">
                <div className="d-flex  flex-column  align-items-center">
                  <img
                    src={profile}
                    style={{ height: "3rem", marginRight: "10px" }}
                    alt=""
                  />
                  <span style={{ color: "black", textDecoration: "none" }}>
                    {drivername ? drivername : drivername2 ? drivername2 : ""}
                  </span>
                </div>
              </Link>
            )}
<Dropdown>
  <Dropdown.Toggle variant="light" id="dropdown-basic" >

  </Dropdown.Toggle>

  <Dropdown.Menu style={{  border: 'none' }}>
    <Dropdown.Item  onClick={handleLogout} >Logout</Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>



          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
};
export default MyNavbar;
