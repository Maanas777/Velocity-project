import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './bikes.css'
import axiosInstance from "../../../axiosInstances/userInstance";

const Bikes = () => {
  const [Bikes, setBikes] = useState();

  useEffect(() => {
    axiosInstance.get("/availableBikes").then((response) => {
      console.log(response.data.availableBikes);
      const data = response.data.availableBikes;

      const photo = data.map((items) => items.DriverPhoto);
      console.log(photo);

      setBikes(data);
    });
  }, []);

  return (
    <div className="mainselectbike">
    <div className="container selectbikesbackground">

  <div className="selectbike"> <h1 >Select Your Bike</h1></div>
      <div className="d-flex justify-content-start flex-wrap " >
        {Bikes?.map((bike, index) => (
          <Card
            key={index}
            style={{ width: "14rem", margin: "20px 20px 10px" }}
          >
            <div style={{ height: "15rem" }}>
              <Card.Img variant="top" src={bike.vehiclePhoto} />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Card.Text className="driver-name">
                <span className="driver"> DriverName:</span> {bike.Drivername}
              </Card.Text>
          
              <Card.Text className="phone">
              <span className="vehicle"> Vehicle: </span>{bike.VehicleModel}</Card.Text>
              
              <Card.Text className="phone">
              <span className="vehicle"> Contact : </span>{bike.phone}</Card.Text>


            </div>
            
            <Button variant="primary" className="custom-button">Select</Button>

          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Bikes;
