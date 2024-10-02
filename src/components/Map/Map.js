import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Map = ({ userPosition, pharmacies, mapRef, isMobile, createPharmacyIcon, userIcon, handleCenterOnUser }) => {
  const mapContainerStyle = {
    height: isMobile ? '40vh' : '80vh',
    width: '100%',
    position: 'relative',
  };

  return (
    <>
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
            {pharmacies.map((pharmacy, index) => (
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
    </>
  );
};

export default Map;
