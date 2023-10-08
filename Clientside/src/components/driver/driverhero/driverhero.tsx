// import React from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./driverhero.css";



const socket = io("http://localhost:3003");


const Driverhero = () => {
  const [Trips, setTrips] = useState();

  const nav=useNavigate()


  const DriverData=localStorage.getItem('DriverData')
  const driver=JSON.parse(DriverData)

  
    const driverSocket=driver.driver.socketId
  



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3003/api/drivers/rides")
      .then((response) => {
        const destination = response.data.trips;
        console.log(destination,"popop");
        

        const data = destination.map((item) => item.destination.name);
        console.log(data);

        setTrips(response.data.trips);
        console.log(response.data.trips);
        
      })
      .catch((error) => {
        console.error(error);
      });
  };



  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("receive_message", (data) => {
      alert(data.message);
     
    });
  
   

    // Listen for the "new_ride_available" event
    socket.on("new_ride_available", (data) => {
      // Display a notification or take any other action
      alert(data.message);
      
    
     // You can customize how the notification is displayed
    });
  }, []);



useEffect(() => {

  socket.on('notification', (data) => {
    console.log('notification');
    console.log('Received a notification:', data);
    
      // Display an alert with the received notification message
      alert(`Received a notification: ${data}`);
   
   
  });


  
}, [])












  const handleTakeTrip=(trip)=>{
    const data=trip

    nav("/drivermap",{state:data})
  

  }



  return (
    <div className="driver-background ">

      <div className="container ">
        <div className="row">
          <div className="col-lg-12 my-5">
            <button className=" togglebutton">Take Ride</button>
            <p className="text-uppercase d-block my-3">
              enable take ride option to see available trips
            </p>
          </div>
          <div className="container">
            <main className="table ">
              <div className="table-responsive">
                <div className="overflow-container">
                  <table col-sm-12>
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>Customer</th>
                        <th>Pickup-Location</th>
                        <th>Destinatiion</th>
                     
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Trips?.map((trip, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>
                            {trip.user?.username}
                            <br />
                            <p>phone: {trip.user?.phone}</p>
                          </td>
                          <td>{trip.pickuplocation.name}</td>
                          <td> {trip.destination.name} </td>
                       

                          <td>
                            <button className="bg-primary" onClick={() => handleTakeTrip(trip)}>
                              Take the trip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driverhero;
