// import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, Link, useLocation } from "react-router-dom";
import profile from "./pngwing.com (1).png";
import "./userNav.css";
import logo from "./logofinal.png";

const UserNav = () => {
  const nav = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    nav("/userlogin");
  };

  const storedUserData = localStorage.getItem("userData");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const username = parsedUserData?.username;
  const username2 = parsedUserData?.user?.username;

  return (
    <Navbar className="custom-user-nav" expand="md">
      <div className="container">
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center justify-content-center"
        >
          <img src={logo} alt="Logo" className="driver-nav-logo" />
          <h1 className="mb-0 driver_heading"></h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginLeft: "10px" }}>
            <Link
              to="/"
              style={{
                color:
                  location.pathname === "/" ? "oceanblue" : "black",
                fontWeight:
                  location.pathname === "/" ? "bolder" : "normal",
                marginRight: "40px",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              to="/driverlogin"
              style={{
                color: "black",
                marginRight: "40px",
                textDecoration: "none",
              }}
            >
              DriverLogin
            </Link>
            <Link
              to="#services"
              style={{
                color: "black",
                marginRight: "30px",
                textDecoration: "none",
              }}
            >
              Careers
            </Link>
            <Link
              to="#contact"
              style={{
                color: "black",
                marginRight: "40px",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </Nav>

          {storedUserData ? (
            <>
              <Link to="/userprofile">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={profile}
                    style={{ height: "3rem", marginRight: "10px" }}
                    alt=""
                  />
                  <span style={{ color: "black", textDecoration: "none" }}>
                    {username || username2 || ""}
                  </span>
                </div>
              </Link>

              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                ></Dropdown.Toggle>

                <Dropdown.Menu style={{ border: "none" }}>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) :<Link to={"/userlogin"}
          style={{
            color: "#3246a8",
            marginRight: "30px",
            textDecoration: "none",
          }}>Login</Link>}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default UserNav;
