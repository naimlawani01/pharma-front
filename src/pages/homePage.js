import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Map from '../components/Map/Map';
import { useFetchPharmacies } from '../hooks/useFetchPharmacies';
import { useUserPosition } from '../hooks/useUserPosition';
import PharmacyCard from '../components/PharmacyList/PharmacyCard';

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

  const handleViewDetails = (pharmacyId) => {
    navigate(`/pharmacy-details/${pharmacyId}`);
  };

  const handleFlyToPharmacy = (latitude, longitude) => {
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
        {/* Map Section */}
        {!isLoading && !error && (
          <div className="p-4 bg-gray-100 shadow-lg rounded-lg mb-8">
            <Map
              userPosition={userPosition}
              pharmacies={pharmacies}
              mapRef={mapRef}
              isMobile={isMobile}
              handleFlyToPharmacy={handleFlyToPharmacy}
            />
          </div>
        )}

        {/* Pharmacy List Section */}
        <div className="overflow-x-auto whitespace-nowrap p-4 bg-gray-20 shadow-lg rounded-lg">
          {/* Affiche toutes les cartes de pharmacie en défilement horizontal */}
          {!isLoading && pharmacies.length > 0 && pharmacies.map((pharmacy, index) => (
            <div key={index} className="inline-block mr-4">
              <PharmacyCard
                pharmacy={pharmacy}
                handleViewProducts={handleViewProducts}
                handleFlyToPharmacy={handleFlyToPharmacy}
                getRandomImageUrl={getRandomImageUrl}
                handleViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
