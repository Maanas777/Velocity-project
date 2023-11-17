
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'
import { Link,useLocation } from 'react-router-dom';
import './navbar.css';

function AdminNavbar() {

  
  const nav = useNavigate()

  const location = useLocation();
  const logout=()=>{
    localStorage.removeItem('email')
    nav('/adminlogin')
  }

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
              {/* <button variant="secondary" onClick={logout}>Logout</button> */}

            </Nav>
            <Button variant="secondary" onClick={logout}>Logout</Button>{' '}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavbar;
