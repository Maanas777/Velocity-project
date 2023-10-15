import React from 'react';
import { useLocation } from 'react-router-dom';

const cardBodyStyle = {
  backgroundColor: '#f1bf29', // Set your desired background color
};

const DriverDetails = () => {
  const driver = useLocation();
  
  const driverName = driver.state.driverdetails.Drivername;
  const VehicleModel = driver.state.driverdetails.VehicleModel;
  const driverPhoto = driver.state.driverdetails.vehiclePhoto; // Assuming you have the driver's photo
  const contactNumber = driver.state.driverdetails.phone; // Assuming you have the contact number

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mt-5">
            <div className="card-header">
              <h2 style={{fontWeight:'bolder',marginTop:'10px'}}>Driver Details</h2>
            </div>
            <div className="card-body" style={cardBodyStyle}>
              <div className="row">
                <div className="col-md-6">
                  <h4 style={{fontWeight:'bold'}}>Name</h4>
                  <p >{driverName}</p>
                  <h4 style={{fontWeight:'bold'}}>Contact Number</h4>
                  <p>{contactNumber}</p>
                </div>
                <div className="col-md-6">
                  <h4 style={{fontWeight:'bold'}}>Vehicle</h4>
                  <p>{VehicleModel}</p>
                  <div>
                    <img style={{ height: '13rem', width: '18rem', borderRadius:'20px' }} src={driverPhoto} alt={VehicleModel} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
