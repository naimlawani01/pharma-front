import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Map from '../components/Map/Map';
import PharmacyList from '../components/PharmacyList/PharmacyList';
import { useFetchPharmacies } from '../hooks/useFetchPharmacies';
import { useUserPosition } from '../hooks/useUserPosition';
import userIconImage from '../assets/marker.png';
import pharmacyIconImage from '../assets/placeholder.png';
import L from 'leaflet';

const HomePage = () => {
  const { pharmacies, isLoading, error } = useFetchPharmacies();
  const { userPosition } = useUserPosition();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const imgUrl = [
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661766456250-bbde7dd079de?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imgUrl.length);
    return imgUrl[randomIndex];
  };

  const handleViewProducts = (pharmacyId) => {
    navigate(`/list-product/${pharmacyId}`);
  };

  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `<div style="display: flex; align-items: center;">
             <img src="${userIconImage}" style="width: 38px; height: 38px;" />
             <span style="margin-left: 5px; background-color: white; padding: 2px;">Vous êtes ici</span>
           </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const createPharmacyIcon = (pharmacyName) => L.divIcon({
    className: 'custom-pharmacy-icon',
    html: `<div style="display: flex; align-items: center;">
             <img src="${pharmacyIconImage}" style="width: 38px; height: 38px;" />
             <span style="margin-left: 5px; background-color: white; padding: 2px;">${pharmacyName}</span>
           </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const handleCenterOnUser = () => {
    if (userPosition && mapRef.current) {
      mapRef.current.flyTo(userPosition, 13);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-4">
            <h2 className=" text-3xl font-extralight mb-8 mt-5">Pharmacies Disponibles</h2>
            
            {/* Gestion de l'état de chargement */}
            {isLoading ? (
              <div className="text-center">Chargement des pharmacies...</div>
            ) : error ? (
              <div className="text-center text-red-500">Erreur lors du chargement des pharmacies</div>
            ) : (
              <PharmacyList
                pharmacies={pharmacies}
                handleViewProducts={handleViewProducts}
                getRandomImageUrl={getRandomImageUrl}
              />
            )}
          </div>

          {/* N'affiche la carte que si les pharmacies sont chargées */}
          {!isLoading && !error && (
            <div className="relative">
              <Map
                userPosition={userPosition}
                pharmacies={pharmacies}
                mapRef={mapRef}
                isMobile={isMobile}
                createPharmacyIcon={createPharmacyIcon}
                userIcon={userIcon}
                handleCenterOnUser={handleCenterOnUser}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
