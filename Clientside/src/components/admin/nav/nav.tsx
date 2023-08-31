
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'; // Make sure to include your custom CSS file
import logo from './logofinal.png';

const Nav = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="d-flex justify-content-between align-items-center border border-1  custom-container">
        <Navbar.Brand href="#">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <div className="text-center flex-grow-1">
          <h3 className='heading'>Admin Panel</h3>
        </div>
        <Navbar.Toggle />
        <div>
          <a href="#logout" className="text-decoration-none">Logout</a>
        </div>
      </Container>


    </Navbar>



  );
};

export default Nav;
