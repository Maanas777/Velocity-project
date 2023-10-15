import React, { useEffect } from 'react';

import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import { useLocation } from 'react-router-dom';




const Map = () => {
  const trip = useLocation();


  function calculateDistance(pickup_lat, pickup_long, Destination_lat, Destination_long) {
    // Radius of the Earth in kilometers
    const earthRadius = 6371; // Use 3958.8 for miles

    // Haversine formula
    const dlat = Destination_lat - pickup_lat;
    const dlon = Destination_long - pickup_long;
    const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(pickup_lat) * Math.cos(Destination_lat) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    // Calculate the distance
    const distance = earthRadius * c;

    return distance;
}
  


  
  
  
  
  

  const pickup_lat = trip?.state?.trip?.pickupLocation?.lat;

  
  const pickup_long = trip?.state?.trip.pickupLocation.lon;
  
  

  const Destibnation_lat = trip?.state?.trip?.destinationLocation?.lat;

  
  const Destibnation_long =trip?.state?.trip?.destinationLocation?.lon;
  
  

  const pickupLocation = trip?.state?.trip?.pickupLocation?.name;
 
  
  const destination = trip?.state?.trip?.destinationLocation?.name;

  
  if (pickup_lat && pickup_long && Destibnation_lat && Destibnation_long) {
    const distance = calculateDistance(
        pickup_lat,
        pickup_long,
        Destibnation_lat,
        Destibnation_long
    );
    console.log(`Distance between pickup and destination: ${distance} km`);
} else {
    console.log('One or more coordinates are missing.');
}










  useEffect(() => {
    const mapboxToken = 'pk.eyJ1IjoibWFhbmFzNzc3IiwiYSI6ImNsbWxqbGhsdjAxNmEyc3IyNDhhZTV3Z2EifQ.ujqCz1sTNYUtQ_o1AEFPFA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [(pickup_long + Destibnation_long) / 2, (pickup_lat + Destibnation_lat) / 2],
      zoom: 13,
      accessToken: mapboxToken,
    });

    new mapboxgl.Marker()
      .setLngLat([pickup_long, pickup_lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>Pickup Location</h3><p>${pickupLocation}</p>`))
      .addTo(map);

    new mapboxgl.Marker()
      .setLngLat([Destibnation_long, Destibnation_lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>Destination</h3><p>${destination}</p>`))
      .addTo(map);

   
     const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup_long},${pickup_lat};${Destibnation_long},${Destibnation_lat}?access_token=${mapboxToken}&geometries=geojson`;
     fetch(directionsRequest)
       .then((response) => response.json())
       .then((data) => {
         const route = data.routes[0].geometry;
         map.addSource('route', {
           type: 'geojson',
           data: route,
         });
         map.addLayer({
           id: 'route',
           type: 'line',
           source: 'route',
           layout: {
             'line-join': 'round',
             'line-cap': 'round',
           },
           paint: {
             'line-color': '#4285f4',
             'line-width': 8,
           },
         });
       });

    return () => {
      map.remove();
    };
  }, [pickupLocation, pickup_long, pickup_lat, Destibnation_long, Destibnation_lat, destination]);

  return (
    <div className="mapmain">
      <h1 className="maptext">Follow The Map</h1>
      <div className="container" id="map" style={{ width: '70%', height: '89%' }} />
    </div>
  );
};

export default Map;
