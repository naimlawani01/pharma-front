import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import L from 'leaflet';
import userIconImage from '../assets/marker.png';
import pharmacyIconImage from '../assets/placeholder.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetPharmacies from '../services/getPharmacies';

const HomePage = () => {
  const { pharmacies, loading, error } = GetPharmacies(); 
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `
      <div style="display: flex; align-items: center;">
        <img src="${userIconImage}" style="width: 38px; height: 38px;" />
        <span style="margin-left: 5px; background-color: white; padding: 2px;">Vous êtes ici</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const createPharmacyIcon = (pharmacyName) =>
    L.divIcon({
      className: 'custom-pharmacy-icon',
      html: `
        <div style="display: flex; align-items: center;">
          <img src="${pharmacyIconImage}" style="width: 38px; height: 38px;" />
          <span style="margin-left: 5px; background-color: white; padding: 2px;">${pharmacyName}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

  const handleViewProducts = (pharmacyId) => {
    navigate(`/list-product/${pharmacyId}`);
  };

  const handleViewDetails = () => {
    if (selectedPharmacy) {
      navigate(`/pharmacy/${selectedPharmacy._id}`);
    }
  };

  const handleCenterOnUser = () => {
    if (userPosition && mapRef.current) {
      mapRef.current.flyTo(userPosition, 13);
    }
  };

  const mapContainerStyle = {
    height: isMobile ? '40vh' : '80vh',
    width: '100%',
    position: 'relative',
  };

  const imgUrl = [
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661766456250-bbde7dd079de?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imgUrl.length);
    return imgUrl[randomIndex];
  };

  return (
    <>
      <Navbar/>
      <div className='container mx-auto'>
        <div class="grid grid-cols-3">
          <div className='col-span-2 p-4'>
            <h2 className="text-center text-2xl font-bold mb-8">Pharmacies Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pharmacies.slice(0, 2).map((pharmacy, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden"
                >
                  {/* Image de la pharmacie */}
                  <img
                    src={getRandomImageUrl()}
                    alt={`Pharmacy ${pharmacy.name}`}
                    className="w-full h-48 object-cover"
                  />

                  {/* Détails de la pharmacie */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{pharmacy.name}</h3>
                    <p className="text-gray-700 mb-1">{pharmacy.address}</p>
                    <p className="text-gray-700 mb-4">{pharmacy.phone}</p>

                    {/* Bouton pour voir les produits */}
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                      onClick={() => handleViewProducts(pharmacy._id)}
                    >
                      Voir les produits
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            {userPosition ? (
              <>
                <MapContainer
                  center={userPosition}
                  zoom={13}
                  style={mapContainerStyle}
                  ref={mapRef}
                  dragging={!isMobile}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={userPosition} icon={userIcon}>
                    <Popup>Vous êtes ici</Popup>
                  </Marker>
                  {!loading && !error && pharmacies.map((pharmacy, index) => (
                    <Marker
                      key={index}
                      position={[pharmacy.localisation.latitude, pharmacy.localisation.longitude]}
                      icon={createPharmacyIcon(pharmacy.name)}
                    >
                      <Popup>
                        {pharmacy.name}<br />
                        {pharmacy.address}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                <button
                  onClick={handleCenterOnUser}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
                  aria-label="Center on user location"
                >
                  <MyLocationIcon />
                </button>
              </>
            ) : (
              <p>Chargement de votre position...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;