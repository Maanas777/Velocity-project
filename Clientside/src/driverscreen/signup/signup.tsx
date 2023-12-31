/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, FormEvent, ChangeEvent } from 'react';
import {useNavigate} from 'react-router-dom'
import './signup.css';
import logo from '../assets/logofinal.png';
import { toast, ToastContainer } from 'react-toastify';
import { axiosDriverInstance } from '../../axiosInstances/userInstance';
import 'react-toastify/dist/ReactToastify.css';





const Signup = () => {
  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
  const [VehicleModel, setVehicleModel] = useState('');
  const [vehicleNo, setvehicleNo] = useState('');
  const [RCNo, setRCNo] = useState('');
  const [licenseno, setlicenseno] = useState('')
  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);
  const [vehiclePhotoPreview, setVehiclePhotoPreview] = useState<string>('');
const [driverphotopreview, setdriverphotopreview] = useState<string>('');
const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [Drivername, setDrivername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const nav=useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (vehiclePhoto) {
      formData.append('vehiclePhoto', vehiclePhoto);
    }
    formData.append('VehicleModel', VehicleModel);
    formData.append('vehicleNo', vehicleNo);
    formData.append('RCNo', RCNo);
    formData.append('licenseno', licenseno);
    if (driverPhoto) {
      formData.append('driverPhoto', driverPhoto);
      console.log("Driver Photo attached to FormData:", driverPhoto);
    }
    formData.append('Drivername', Drivername);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);










    try {
      const response = await axiosDriverInstance.post('/driversignup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('User created successfully');
      console.log('Signup Successful:', response.data);
      nav('/driverlogin')
  

    } catch (error) {
      toast.error('An error occurred');
      console.error('Signup Error:', error);

    }
  };



  

  const checkPasswordStrength = (password: string) => {
    // Define your password strength criteria
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Calculate password strength
    let strength = 0;
    strength += hasUpperCase ? 1 : 0;
    strength += hasLowerCase ? 1 : 0;
    strength += hasDigits ? 1 : 0;
    strength += hasSpecialChars ? 1 : 0;
    strength += password.length >= minLength ? 1 : 0;

    return strength;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const strength = checkPasswordStrength(newPassword);

    // Set password strength message based on the calculated strength
    if (strength === 5) {
      setPasswordStrength('Your Password is Strong');
    } else if (strength >= 3) {
      setPasswordStrength('Your Password is Moderately Strong'); 
    } 
    else if (strength === 0){
      setPasswordStrength('');
    }
  
    else {
      setPasswordStrength('Your Password is Weak');
    }

    setPassword(newPassword);
  };






  return (
    <div className='parent'>
    
    <div className='xyz'>
    <ToastContainer position="top-center" autoClose={2000} />
    <div className='logo-container'>
      <img src={logo} alt='Logo' className='logo' />
    </div>

    <h2>Driver Signup Form</h2>
    <form onSubmit={handleSubmit} encType='multipart/form-data' className='signup-form-container'>
      {/* Vehicle Details */}
      <div className='section'>
        <h3 className='details'>Vehicle Details:</h3>
        <div className='vehicle-details'>
          <div className='photo-input'>
          
            <div className='photo-container'>
          {vehiclePhotoPreview && (
            <img className='image'
              src={vehiclePhotoPreview}
              alt="Vehicle Preview"
            />
          )}
        </div>  
            <input
              type="file"
             
              className='inputfile'
              name="file"
               id="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const selectedFile = e.target.files && e.target.files[0];
                if (selectedFile) {
                  setVehiclePhoto(selectedFile);
                  setVehiclePhotoPreview(URL.createObjectURL(selectedFile));
                }
              }}
              
            />
                    {driverphotopreview ? (
    <label htmlFor="file" className='label'>Change Image</label>
  ) : (
    <label htmlFor="file" className='label'>Upload your vehicle image</label>
  )}
            
          </div>
          <div className='vehicle-info'>
            <label>Name:</label>
            <input type='text' name='VehicleModel' value={VehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required />
            <label>Vehicle Number:</label>
            <input type='text' name='vehicleNo' value={vehicleNo} onChange={(e) => setvehicleNo(e.target.value)} required />
            <label>RC Number:</label>
            <input type='text' name='RCNo' value={RCNo} onChange={(e) => setRCNo(e.target.value)} required />
            <label>License No:</label>
            <input type='text' name='licenseno' value={licenseno} onChange={(e) => setlicenseno(e.target.value)} required />
          </div>
        </div>
       
      </div>

      {/* Driver Details */}
      <div className='section'>
        <h3 className='details'>Driver Details:</h3>
        <div className='driver-details'>
          <div className='photo-input'>
          

            <div className='photo-container'>
          {vehiclePhotoPreview && (
            <img className='image'
              src={driverphotopreview}
              alt="Vehicle Preview"
            />
          )}
        </div> 
          <input
              type="file"
              id="vehiclePhotoInput"
              className='inputfile2'
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const selectedFile = e.target.files && e.target.files[0];
                if (selectedFile) {
                  setDriverPhoto(selectedFile);
                  setdriverphotopreview(URL.createObjectURL(selectedFile));
                }
              }}
              
            />
            {driverphotopreview ? (
    <label htmlFor="vehiclePhotoInput" className='label'>Change Image</label>
  ) : (
    <label htmlFor="vehiclePhotoInput" className='label'>Upload your Driver image</label>
  )}
          </div>
          <div className='driver-info'>
            <label>Name:</label>
            <input type='text' name='Drivername' value={Drivername} onChange={(e) => setDrivername(e.target.value)} required />
            <label>E-mail:</label>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Phone Number:</label>
            <input type='tel' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <label>Password:</label>
            <input type='password' name='password' value={password} onChange={handlePasswordChange} required />

            <div  className={`password-strength ${passwordStrength.toLowerCase()}`}>
        {passwordStrength}
      </div>
          </div>
        </div>
      </div>

      <button type='submit'>Sign Up</button>
    </form>
  </div>
  </div>
);
};
<script>

</script>

export default Signup;
