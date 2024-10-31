import React, { useEffect, useRef } from 'react';
import mapboxgl, { GeolocateControl, NavigationControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import userIconImage from '../../assets/user-icon.svg';
import pharmacyIconImage from '../../assets/pharmacy-icon.svg';

mapboxgl.accessToken = 'pk.eyJ1IjoiaW1yYW5lMjI0IiwiYSI6ImNrdzJtcDR3bDBoaXcycHBhZm5iamF4ZjgifQ.4LPfqGk8MAEKBflKcKvN_w'; // Your Mapbox access token here

const themes = {
  light: 'mapbox://styles/mapbox/streets-v11',
  dark: 'mapbox://styles/mapbox/dark-v10',
};

const Map = ({ userPosition, pharmacies, mapRef, isMobile, handleFlyToPharmacy }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (userPosition) {
      // Initialize Mapbox map
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: themes.light,
        center: [userPosition.lng, userPosition.lat],
        zoom: 13,
        projection: 'globe',
      });

      // Add navigation controls (zoom and compass)
      const mapInstance = mapRef.current;
      mapInstance.addControl(new NavigationControl(), 'top-right');

      // Add Geolocate control
      const geolocateControl = new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      });
      mapInstance.addControl(geolocateControl, 'top-right');

      // Add user location marker
      new mapboxgl.Marker({
        element: createUserIcon(),
        anchor: 'bottom',
      })
        .setLngLat([userPosition.lng, userPosition.lat])
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Vous êtes ici</strong>"))
        .addTo(mapInstance);

      // Add pharmacy markers
      pharmacies.forEach((pharmacy) => {
        const marker = new mapboxgl.Marker({
          element: createPharmacyIcon(pharmacy.name),
          anchor: 'bottom',
        })
          .setLngLat([pharmacy.localisation.longitude, pharmacy.localisation.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(createPopupContent({ 
            title: pharmacy.name, 
            address: pharmacy.address 
          })))
          .addTo(mapInstance);

        // Add click event listener to fly to pharmacy on click
        marker.getElement().addEventListener('click', () => {
          handleFlyToPharmacy(pharmacy.localisation.latitude, pharmacy.localisation.longitude);
        });
      });

      // Clean up on unmount
      return () => mapInstance.remove();
    }
  }, [userPosition, pharmacies, mapRef, handleFlyToPharmacy]);

  const createUserIcon = () => {
    const iconContainer = document.createElement('div');
    iconContainer.innerHTML = `
      <div style="display: flex; align-items: center; position: relative;">
        <img src="${userIconImage}" style="width: 42px; height: 42px; border-radius: 50%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); transition: transform 0.3s;" />
        <span style="
          margin-left: 8px;
          background-color: rgba(0, 128, 255, 0.85);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        ">Vous êtes ici</span>
      </div>
    `;
    return iconContainer;
  };

  const createPharmacyIcon = (pharmacyName) => {
    const iconContainer = document.createElement('div');
    iconContainer.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${pharmacyIconImage}" style="width: 38px; height: 38px;" />
        <span style="
          margin-left: 5px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 2px 5px;
          border-radius: 5px;
          font-size: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        ">${pharmacyName}</span>
      </div>
    `;
    return iconContainer;
  };

  const createPopupContent = (content) => `
    <div style="
      font-family: Arial, sans-serif;
      color: #333;
      padding: 10px;
      text-align: center;
    ">
      <h3 style="margin: 0; font-size: 16px; color: #0078A8;">${content.title}</h3>
      <p style="font-size: 14px; margin-top: 4px;">${content.address}</p>
    </div>
  `;

  return (
    <div style={{ position: 'relative', height: isMobile ? '40vh' : '50vh', width: '100%' }}>
      <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default Map;
