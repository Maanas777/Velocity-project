// import "./Sidebar.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Logo from "./logofinal.png";
// import { Container } from "react-bootstrap"


// const sidebar = () => {
//   return (
//     <Container fluid>
//       <div className="row">
        

//         {/* <div className="navbar">
//           <h1  className="admin_pannel">Admin pannel</h1>
//         </div> */}

//         <div className="col-auto col-sm-2  d-flex flex-column justify-content-between min-vh-100 custom-div">
//           <div className="mt-2">
//             <a
//               className="text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline"
//               role="button"
//             >
//               <img src={Logo} alt="Description of the image" className="logo" />
//             </a>

//             <hr className="text-white d-none d-sm-block"></hr>

//             <ul className="nav nav-pills flex-column mt-2 mt-sm-0   id='parentM">
//               <li className="nav-item my-1 py-2 py-sm-0">
//                 <a
//                   href="#"
//                   className="nav-link  text-black text-sm-start "
//                   aria-current="page"
//                 >
//                   <i className="bi bi-speedometer2"></i>
//                   <span className="ms-2 d-none d-sm-inline ">Dashboard</span>
//                 </a>
//               </li>
//               <li className="nav-item my-1 py-2 py-sm-0">
//                 <a
//                   href="#submenu"
//                   className="nav-link  text-black text-sm-start "
//                   dta-bs-toggle="collapse"
//                   aria-current="page"
//                 >
//                   <i className="bi bi-grid"></i>
//                   <span className="ms-2 d-none d-sm-inline">Users</span>
//                 </a>
//               </li>
//               <li className="nav-item my-1 py-2 py-sm-0">
//                 <a
//                   href="#submenu"
//                   className="nav-link  text-black text-sm-start "
//                   dta-bs-toggle="collapse"
//                   aria-current="page"
//                 >
//                   <i className="bi bi-grid"></i>
//                   <span className="ms-2 d-none d-sm-inline">Drivers</span>
//                 </a>
//               </li>

//               <li className="nav-item my-1 py-2 py-sm-0">
//                 <a
//                   href="#submenu"
//                   className="nav-link   text-black text-sm-start"
//                   dta-bs-toggle="collapse"
//                   aria-current="page"
//                 >
//                   <i className="bi bi-house "></i>
//                   <span className="ms-2 d-none d-sm-inline">
//                     Driver verification
//                   </span>
//                 </a>
//               </li>

//               <li className="nav-item text-black my-1 py-2 py-sm-0">
//                 <a
//                   href="#submenu"
//                   className="nav-link   text-black text-sm-start "
//                   dta-bs-toggle="collapse"
//                   aria-current="page"
//                 >
//                   <i className="bi bi-people"></i>
//                   <span className="ms-2 d-none d-sm-inline">Banners</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className="dropdown open">
//             <a
//               className="btn border-none  dropdown-toggle text-white"
//               type="button"
//               id="triggerid"
//               data-bs-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               <i className="bi bi-person f5-4"></i>
//               <span className="fs-5 ms-3 d-none d-sm-inline">drop</span>
//             </a>

//             <div className="dropdown-menu" aria-labelledby="triggerId">
//               <a className="dropdown-item" href="#">
//                 Profile
//               </a>
//               <a className="dropdown-item disabled:" href="#">
//                 settings
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default sidebar;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Admin pannel</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Driver verification</Nav.Link>
            <Nav.Link as={Link} to="/verifiedDriver">Drivers</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <br />
     
    </>
  );
}

export default ColorSchemesExample;