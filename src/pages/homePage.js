import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Map from '../components/Map/Map';
import PharmacyList from '../components/PharmacyList/PharmacyList';
import { useFetchPharmacies } from '../hooks/useFetchPharmacies';
import { useUserPosition } from '../hooks/useUserPosition';

const HomePage = () => {
  const { pharmacies, isLoading, error } = useFetchPharmacies();
  const { userPosition } = useUserPosition();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const mapRef = useRef(null);  // Map reference to control map actions
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

  const handleViewDetails = (pharmacyId) => {
    navigate(`/pharmacy-details/${pharmacyId}`);
  };

  // Function to fly to the pharmacy location on the map
  const handleFlyToPharmacy = (latitude, longitude) => {
    console.log("Flying to:", latitude, longitude); // Debugging log
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 13,
        essential: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-5">
          <div className="col-span-3 p-4">
            <h2 className="text-left text-3xl font-bold mb-8">Pharmacies Disponibles</h2>
            <PharmacyList
              pharmacies={pharmacies}
              handleViewProducts={handleViewProducts}
              handleViewDetails={handleViewDetails}
              handleFlyToPharmacy={handleFlyToPharmacy}
              getRandomImageUrl={getRandomImageUrl}
              isLoading={isLoading}
            />
          </div>

          {!isLoading && !error && (
            <div className="col-span-2 p-4">
              <Map
                userPosition={userPosition}
                pharmacies={pharmacies}
                mapRef={mapRef}
                isMobile={isMobile}
                handleFlyToPharmacy={handleFlyToPharmacy}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
