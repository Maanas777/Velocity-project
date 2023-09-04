import React from "react";
import { useState } from "react";
import './userNav.css'
import { BiMenu } from 'react-icons/bi'
import logo from './logofinal.png'




const UserNav = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      
        setMenuVisible(!isMenuVisible);
      };



  return (
    <body>
        <div className="main1">
            <div  className="logocontainer" >
       <img className="logo"src={logo} alt="" />
            </div>
            <label htmlFor="" className="menubar"  onClick={toggleMenu}>
                <i ><BiMenu/></i>
            </label>
            <ul className={isMenuVisible ? "open":'hidden-list-items'}>    
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Service</a></li>
                <li><a href="">Portfolio</a></li>
                <li><a href="">Price</a></li>
            </ul>
     

            </div>
     
    </body>
  );
};

export default UserNav;
