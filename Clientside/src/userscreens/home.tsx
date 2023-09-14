import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/user/navbar/userNav";
import Hero from "../components/user/hero section/hero.tsx"
import Footer from "../components/user/footer/footer.tsx";
import { login } from "../redux/userSlice.tsx";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(storedUserData);

    dispatch(login(parsedUserData));
  }, [dispatch]);

  

  return (

      <div className="container-fluid">
        <Navbar />
 
      <div >
      <Hero />
      </div>
    

      <div className="footerhero">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
