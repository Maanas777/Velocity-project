import React, { useEffect } from 'react';

import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import { useLocation } from 'react-router-dom';




const Map = () => {
  const trip = useLocation();

  const pickup_lat = trip.state.pickuplocation.lat;
  const pickup_long = trip.state.pickuplocation.lon;

  const Destibnation_lat = trip.state.destination.lat;
  const Destibnation_long = trip.state.destination.lon;

  const pickupLocation = trip.state.pickuplocation.name;
  const destination = trip.state.destination.name;


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
