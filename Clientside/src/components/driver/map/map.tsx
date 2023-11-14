import  { useEffect } from "react";

import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { dns } from "../../../axiosInstances/userInstance";

const socket = io(dns);

const Map = () => {





  const nav=useNavigate()

  const [isRideStarted, setRideStarted] = useState(false);

  const trip = useLocation();
 
  

  const pickup_lat = trip?.state?.trip?.pickupLocation?.lat;

  const pickup_long = trip?.state?.trip.pickupLocation.lon;

  const Destibnation_lat = trip?.state?.trip?.destinationLocation?.lat;

  const Destibnation_long = trip?.state?.trip?.destinationLocation?.lon;

  const pickupLocation = trip?.state?.trip?.pickupLocation?.name;

  const destination = trip?.state?.trip?.destinationLocation?.name;




  const handleClick = async () => {
    if (isRideStarted) {

      const message = "Ride Completed";
      socket.emit("ride_completed", message);
      localStorage.removeItem('isRideStarted')
      nav('/driverhome')


    } else {
      console.log("ride");
      
      const message = "The ride has started!";
      socket.emit("ride_started", message);
      setRideStarted(true);
      localStorage.setItem("isRideStarted", "true");
    }
  };

  useEffect(() => {
    const storedRideState = localStorage.getItem("isRideStarted");
    if (storedRideState === "true") {
      setRideStarted(true);
    }
  }, []);

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_mapboxToken;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [
        (pickup_long + Destibnation_long) / 2,
        (pickup_lat + Destibnation_lat) / 2,
      ],
      zoom: 13,
      accessToken: mapboxToken,
    });

    new mapboxgl.Marker()
      .setLngLat([pickup_long, pickup_lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<h3>Pickup Location</h3><p>${pickupLocation}</p>`
        )
      )
      .addTo(map);

    new mapboxgl.Marker()
      .setLngLat([Destibnation_long, Destibnation_lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<h3>Destination</h3><p>${destination}</p>`
        )
      )
      .addTo(map);

    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup_long},${pickup_lat};${Destibnation_long},${Destibnation_lat}?access_token=${mapboxToken}&geometries=geojson`;
    fetch(directionsRequest)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry;
        map.addSource("route", {
          type: "geojson",
          data: route,
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#4285f4",
            "line-width": 8,
          },
        });
      });

    return () => {
      map.remove();
    };
  }, [
    pickupLocation,
    pickup_long,
    pickup_lat,
    Destibnation_long,
    Destibnation_lat,
    destination,
  ]);

  return (
    <div className="mapmain">
      <div className="startridediv">
        <button
          className={isRideStarted ? "finishRide" : "startRide"}
          onClick={handleClick}
        >
          {isRideStarted ? "finish ride" : "Start Ride"}
        </button>
      </div>

      <div
        className="container"
        id="map"
        style={{ width: "70%", height: "85%" }}
      />
    </div>
  );
};

export default Map;
