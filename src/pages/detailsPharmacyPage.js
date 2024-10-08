// pages/PharmacyDetails.js
import React from 'react';
import usePharmacyDetails from '../hooks/usePharmacyDetails';
import Navbar from '../components/navbar';

const PharmacyDetails = () => {
  const { pharmacy, loading, error } = usePharmacyDetails();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des détails de la pharmacie.</p>;
  }

  return (
    <div>
      <Navbar />  {/* NavBar encapsulée dans un div */}
      
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
        {pharmacy ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{pharmacy.name}</h1>
            <p className="text-gray-700 mb-2">Adresse: {pharmacy.address}</p>
            <p className="text-gray-700 mb-2">Téléphone: {pharmacy.phone}</p>
            <p className="text-gray-700 mb-2">Email: {pharmacy.email}</p>
            
            {/* Vérifie si la localisation existe avant d'accéder aux valeurs latitude et longitude */}
            {pharmacy.localisation ? (
              <p className="text-gray-700 mb-2">
                Localisation: {pharmacy.localisation.latitude}, {pharmacy.localisation.longitude}
              </p>
            ) : (
              <p className="text-gray-700 mb-2">Localisation non disponible</p>
            )}
          </>
        ) : (
          <p>Aucune information disponible pour cette pharmacie.</p>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetails;
