import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useLocation } from 'react-router-dom';
import './navbar.css';

function AdminNavbar() {

  const location = useLocation();

  return (
    <div className='custom-nav' >
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className='w-100'>
        <Container>
          <Navbar.Brand href="#home">velocity</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Link to="/dashboard" className={`nav-link-with-gap ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/users" className={`nav-link-with-gap ${location.pathname === '/users' ? 'active' : ''}`}>Users</Link>
              <Link to="/driver-verification" className={`nav-link-with-gap ${location.pathname === '/driver-verification' ? 'active' : ''}`}>Driver Verification</Link>
              <Link to="/verifiedDriver" className={`nav-link-with-gap ${location.pathname === '/verifiedDriver' ? 'active' : ''}`}>Drivers</Link>
              {/* <Link to="/banners" className={`nav-link-with-gap ${location.pathname === '/banners' ? 'active' : ''}`}>Banners</Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavbar;
