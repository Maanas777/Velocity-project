import React from "react";
import "./hero.css";
import First from "./1st section.png";
import Second from "./seond.jpg";
import Third from "./3rd.avif";
 

const Hero = () => {
  return (
    <div className="container-fluid">
      
      <div className="imageContainer">
        <img className="first" src={First} alt="" />
        <div className="formContainer">
          <form className="userhomeform">
            <h1 className="formheading">Request a Ride now</h1>

            <input
              type="text"
              id="fullName"
              placeholder="Enter pickup location"
            />
            <br />
            <br />

         

            <input type="text" id="dob" placeholder="Enter Destination" />
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





    </div>
  );
};

export default Hero;




