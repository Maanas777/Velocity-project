// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Modal from "react-bootstrap/Modal";
// import io from 'socket.io-client';
// import "./bikes.css";
// import {axiosInstance,axiosDriverInstance} from "../../../axiosInstances/userInstance";
// import axios from "axios";

// const socket = io('http://localhost:3003');

// const Bikes = () => {
//   const [Bikes, setBikes] = useState();
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     axiosInstance.get("/availableBikes").then((response) => {
//       console.log(response.data.availableBikes);
//       const data = response.data.availableBikes;

//       const photo = data.map((items) => items.DriverPhoto);
//       console.log(photo);

//       setBikes(data);
//     });
//   }, []);

//   const  handleSelectClick : React.MouseEventHandler<HTMLButtonElement> = (bike) => {
   
//     const id = bike._id;
   
    

//     setShowModal(true);

//     setTimeout(() => {

//       setShowModal(false);
//     }, 3000);



//     socket.emit('userRequest', {
//       driverId: id,
      
//     });



//     // axiosDriverInstance.get(`/userRequest/${id}`)
//     //   .then((response) => {
//     //     console.log(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error making GET request:", error);
//     //   });
   
    




//   };

//   return (
//     <div className="mainselectbike">
//       <div className="container selectbikesbackground">
//         <div className="selectbike">
//           {" "}
//           <h1>Select Your Bike</h1>
//         </div>
//         <div className="d-flex justify-content-start flex-wrap ">
//           {Bikes?.map((bike, index) => (
//             <Card
//               key={index}
//               style={{ width: "14rem", margin: "20px 20px 10px" }}
//             >
//               <div style={{ height: "15rem" }}>
//                 <Card.Img variant="top" src={bike.vehiclePhoto} />
//               </div>
//               <div style={{ marginLeft: "10px" }}>
//                 <Card.Text className="driver-name">
//                   <span className="driver"> DriverName:</span> {bike.Drivername}
//                 </Card.Text>

//                 <Card.Text className="phone">
//                   <span className="vehicle"> Vehicle: </span>
//                   {bike.VehicleModel}
//                 </Card.Text>

//                 <Card.Text className="phone">
//                   <span className="vehicle"> Contact : </span>
//                   {bike.phone}
//                 </Card.Text>
//               </div>
//               <Button
//                 variant="primary"
//                 className="custom-button"
//                 onClick={() => handleSelectClick(bike)}
//               >
//                 Select
//               </Button>
//             </Card>
//           ))}
//         </div>


        
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Body className="custom-modal">
//             <p>Connecting to rider...</p>
//           </Modal.Body>
//         </Modal>

//       </div>
//     </div>



//   );
// };

// export default Bikes;
