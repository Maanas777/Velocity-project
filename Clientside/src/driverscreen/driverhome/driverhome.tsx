import Drivernav from "../../components/driver/drivernav/driverNav";
import Driverhero from "../../components/driver/driverhero/driverhero";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../redux/userSlice'




const Driverhome = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("DriverData");
    const parsedUserData = JSON.parse(storedUserData);

    dispatch(login(parsedUserData));
  }, [dispatch]);
  

  
  

  

  return (
 
    <div className="col-sm-12">
      
     
      <Drivernav />
      <Driverhero />
    </div>
  );
};

export default Driverhome;
