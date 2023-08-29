import React from 'react';
import './signup.css';
import logo from '../assets/logofinal.png'

const Signup = () => {
  return (
    <div className='container'>
                 <div className='logo-container'>
        <img src={logo} alt='Logo' className='logo' /> 
      </div>

      <h2>Signup Form</h2>
      <form className='signup-form-container'>
        <div className='section'>
          <h5 className='details'>Vehicle Details:</h5>
          <div className='vehicle-details'>
            <div className='photo-input'>
            <input type="file" name="file" id="file" className="inputfile" />
              <label htmlFor="file" className='choose'>Add image</label>
            </div>
            <div className='vehicle-info'>
              <label>Name:</label>
              <input type='text' name='vehicleName' required />
              <label>Vehicle Number:</label>
              <input type='text' name='vehicleNumber' required />
              <label>RC Number:</label>
              <input type='text' name='rcNumber' required />
            </div>
          </div>
        </div>

        <div className='section'>
          <h5 className='details'>Driver Details:</h5>
          <div className='driver-details'>
            <div className='photo-input'>
              <input type="file" name="file" id="driverImage" className="inputfile" />
              <label htmlFor="driverImage" className='choose'>Add image</label>
            </div>
            <div className='driver-info'>
            <label>Name:</label>
            <input type='text' name='driverName' required />
            <label>E-mail:</label>
            <input type='email' name='email' required />
            <label>Phone Number:</label>
            <input type='tel' name='phone' required />
            <label>Password:</label>
            <input type='password' name='password' required />

            </div>
          </div>
        </div>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
