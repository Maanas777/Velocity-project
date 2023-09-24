import React from 'react'
import { useLocation } from "react-router-dom";

const Map = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data,"mappppppppppp");
    

  return (
    <div>
      
    </div>
  )
}

export default Map
