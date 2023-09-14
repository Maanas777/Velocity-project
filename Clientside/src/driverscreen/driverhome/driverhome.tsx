import Drivernav from "../../components/driver/drivernav/driverNav";
import Driverhero from "../../components/driver/driverhero/driverhero";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../redux/userSlice'

import React from "react";

const Driverhome = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("DriverData");
    const parsedUserData = JSON.parse(storedUserData);

    dispatch(login(parsedUserData));
  }, [dispatch]);




  return (
    <div>
      <Drivernav />
      <Driverhero />
    </div>
  );
};

export default Driverhome;
