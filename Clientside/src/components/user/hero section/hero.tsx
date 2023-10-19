import { useState } from "react";
// import { FormEvent } from "react";
import "./hero.css";

import First from "./1st section.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Second from "./seond.jpg";
import Third from "./3rd.avif";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../redux/userSlice";
import axios from "axios";
import { io } from "socket.io-client";


const socket = io("http://localhost:3003");

const predefinedLocations = [
  { name: "Thripunithara", lat: 9.943436, lon: 76.345907 },
  { name: "Vytila", lat: 9.96571, lon: 76.317854 },
  { name: "Elamkulam", lat: 9.967908, lon: 76.301361 },
  { name: "Kaloor", lat: 9.99709, lon: 76.302818 },
  { name: "Kalamasserry", lat: 10.01455, lon: 76.293159 },
  { name: "Edapally", lat: 10.023429, lon: 76.309524 },
];

const predefinedDestinations = [
  { name: "Thripunithara", lat: 9.943436, lon: 76.345907 },
  { name: "Vytila", lat: 9.96571, lon: 76.317854 },
  { name: "Elamkulam", lat: 9.967908, lon: 76.301361 },
  { name: "Kaloor", lat: 9.99709, lon: 76.302818 },
  { name: "Kalamasserry", lat: 10.01455, lon: 76.293159 },
  { name: "Edapally", lat: 10.023429, lon: 76.309524 },
];

const Hero = () => {

const nav= useNavigate()


  const user = useSelector(selectUser);
  console.log(user._id);

  const userid = user?.user?._id;
  console.log(userid);

  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  // const [fare, setfare] = useState(0)


  const [showModal, setShowModal] = useState(false);

  const handlePickupLocationSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPickupLocation(e.target.value);
  };

  const handleDestinationLocationSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestinationLocation(e.target.value);
  };

  const token=localStorage.getItem("token")

  const headers = {
    'Content-Type': 'application/json',
    'token': token
  }







  ///submit function

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Pickup Location:", pickupLocation);
    console.log("Destination:", destinationLocation);

    // Find the selected locations from predefinedLocations

    const selectedPickupLocation = predefinedLocations.find(
      (location) => location.name === pickupLocation
    );
    const selectedDestinationLocation = predefinedDestinations.find(
      (location) => location.name === destinationLocation
    );

    if (!selectedPickupLocation || !selectedDestinationLocation) {
      console.error("Invalid pickup or destination location.");
      return;
    }

    const rideData = {
      pickupLocation: {
        name: pickupLocation,
        lat: selectedPickupLocation.lat,
        lon: selectedPickupLocation.lon,
      },
      destinationLocation: {
        name: destinationLocation,
        lat: selectedDestinationLocation.lat,
        lon: selectedDestinationLocation.lon,
      },
      

    };

    
    setShowModal(true);

    socket.on('acceptedride',async (data)=>{
      console.log(data, 'accepted driver');
      setShowModal(false); 
      // setDriverDetails(data);
      const fare=data.fare;
      console.log(fare,"fareeeeeeeeee");
      
    
      try {
        // Send a POST request to your backend with rideData and fare
        await axios.post(`http://localhost:3003/api/users/createRide/${userid}`, { rideData, fare }, { headers });
    
        // After successfully sending the request, navigate to the 'driverdetails' route
        nav('/driverdetails', { state: data });
        
      } catch (error) {
        toast.error('Axios POST request error');
        console.error('Axios POST request error:', error);
      }
      
      
    })

  

    try {
      
     
      socket.emit('createdride',{trip:rideData,userDetails:user})
     

    } catch (error) {
      toast.error('Axios POST request error')
      console.error('Axios POST request error:', error);
  
   
    }
    
      
  };

  return (
    <div>
      <ToastContainer/>
      <div className="imageContainer">
        <img className="first" src={First} alt="" />
        <div className="formContainer">
          <form className="userhomeform" onSubmit={handleSubmit}>
            <h1 className="formheading">Request a Ride now</h1>

            <select
              className="options"
              onChange={handlePickupLocationSelect}
              value={pickupLocation}
            >
              <option value="">Select pickup location</option>
              {predefinedLocations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <select
              className="options"
              onChange={handleDestinationLocationSelect}
              value={destinationLocation}
            >
              <option value="">Select destination</option>
              {predefinedDestinations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <br />

            <input className="button1" type="submit" value="Submit" />
          </form>
        </div>
      </div>

      <div className="secondimagecontainer">
        <img className="second" src={Second} alt="" />
        <h1 className="safely">Safely Unleashed...</h1>

        <div className="secondparacontainer">
          <p className="secondpara">
            VeloCity, safety isn't just a feature; it's ingrained in every
            aspect of our service. A safe biking experience that you can trust
            every time you ride with us. Your journey is important to us, and we
            are committed to helping you reach your destination safely and with
            confidence.
          </p>
        </div>
      </div>
      <div className="thirdimagecontainer">
        <h1 className="thirdpara">
          Navigating the Urban Pulse: Swift and Secure City Travel with
          VeloCity...
          <p className="thirdparagra">
            Discover the thrill of city exploration with VeloCity – where speed
            meets safety. Zip through urban landscapes faster than ever before
            while enjoying the peace of mind that comes with our top-tier safety
            features. Your journey is our priority, ensuring you reach your
            destination swiftly and securely, redefining city travel one ride at
            a time.
          </p>
        </h1>

        <img className="thirdimage" src={Third} alt="" />
      </div>

      <div className="last">
        <h1></h1>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Body className="custom-modal">
            <p>Connecting to rider...</p>
          </Modal.Body>
        </Modal>
    </div>












  );
};

export default Hero;
