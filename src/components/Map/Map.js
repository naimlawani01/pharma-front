import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import L from 'leaflet';

import userIconImage from '../../assets/user-icon.svg';  // Icône utilisateur
import pharmacyIconImage from '../../assets/pharmacy-icon.svg';  // Icône pharmacie

const Map = ({ userPosition, pharmacies, mapRef, isMobile, handleCenterOnUser }) => {
  const mapContainerStyle = {
    height: isMobile ? '40vh' : '80vh',
    width: '100%',
    position: 'relative',
  };

  // Icône utilisateur avec texte "Vous êtes ici"
  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <img src="${userIconImage}" style="width: 38px; height: 38px;" />
        <span style="
          margin-left: 5px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 2px 5px;
          border-radius: 5px;
          font-size: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          white-space: nowrap; /* Empêche le texte de se diviser en plusieurs lignes */
        ">Vous êtes ici</span>
      </div>
    `,
    iconSize: [50, 50], // Taille totale de l'icône avec le texte
    iconAnchor: [25, 50],  // Pour bien positionner l'icône sur la carte
    popupAnchor: [0, -50],
  });
  

  // Icône pharmacie avec texte
  const createPharmacyIcon = (pharmacyName) => L.divIcon({
    className: 'custom-pharmacy-icon',
    html: `
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
    `,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    padding: '10px',
    cursor: 'pointer',
  };

  return (
    <>
      {userPosition ? (
        <div style={{ position: 'relative' }}>
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

            {/* Marqueur pour la position de l'utilisateur avec texte */}
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>Vous êtes ici</strong>
                </div>
              </Popup>
            </Marker>

            {/* Marqueurs pour les pharmacies */}
            {pharmacies.map((pharmacy, index) => (
              <Marker
                key={index}
                position={[pharmacy.localisation.latitude, pharmacy.localisation.longitude]}
                icon={createPharmacyIcon(pharmacy.name)}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{pharmacy.name}</strong><br />
                    {pharmacy.address}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Bouton pour centrer sur la position de l'utilisateur */}
          <button
            onClick={handleCenterOnUser}
            style={buttonStyle}
            aria-label="Center on user location"
          >
            <MyLocationIcon />
          </button>
        </div>
      ) : (
        <p>Chargement de votre position...</p>
      )}
    </>
  );
};

export default Map;
