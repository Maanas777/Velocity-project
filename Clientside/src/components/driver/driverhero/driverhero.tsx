// import React from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import "./driverhero.css";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import bg from './0_fGUT3jb2dvnw9OZP.gif'

const socket = io("http://localhost:3003");
const DriverData=localStorage.getItem('DriverData')
const DriverDatajson=JSON.parse(DriverData)
const driverdetails=DriverDatajson.driver

console.log(driverdetails,"dfocerkfflsdfj");

const Driverhero = () => {
  const [rideData, setRideData] = useState({}); 
  const [showModal, setShowModal] = useState(false);
  console.log(rideData,"ridedata");
  
  const nav=useNavigate()

  useEffect(() => {
    console.log("useeffect");

    socket.on("newRideRequest", (data) => {
      console.log(data);

      setShowModal(true);
      setRideData(data);
    });

    return () => {
      socket.off("newRideRequest");
    };
  }, []);


  const handleTakeTrip=(trip)=>{
    const data=trip
    console.log(data,"dataaaaaaaaaaa");
    
    nav("/drivermap",{state:data})
  socket.emit('acceptedride',{driverdetails})
  

  }




  return (
<div>


<div>
  <img className="driverbg-image" src={bg} alt="" />
</div>
<Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton className="text-center" style={{ backgroundColor: '#3498db', color: 'white' }}>
    <Modal.Title id="contained-modal-title-vcenter">
      New trip is available
    </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ padding: '20px' }}>
    {rideData ? (
      <div style={{ textAlign: 'center' }}>
        <p>User: {rideData?.userDetails?.user?.username}</p>
        <p>Phone: {rideData?.userDetails?.user?.phone}</p>
        <p>Pickup Location: {rideData?.trip?.pickupLocation?.name}</p>
        <p>Destination: {rideData?.trip?.destinationLocation?.name}</p>

      </div>
    ) : (
      <p>New ride is available</p>
    )}
  </Modal.Body>
  <Modal.Footer style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
    <Button variant="primary" onClick={() => handleTakeTrip(rideData)}>
      Take trip
    </Button>
  </Modal.Footer>
</Modal>









</div>

  );
};

export default Driverhero;
