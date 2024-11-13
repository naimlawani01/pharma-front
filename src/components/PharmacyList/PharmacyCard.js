import React, { useState } from 'react';

const PharmacyCard = ({ pharmacy, handleFlyToPharmacy, getRandomImageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour ouvrir/fermer la modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex"
      onClick={() => handleFlyToPharmacy(pharmacy.localisation.latitude, pharmacy.localisation.longitude)}
    >
      <div className="flex-shrink-0">
        <img
          src={getRandomImageUrl()}
          alt={`Pharmacy ${pharmacy.name}`}
          className="w-32 h-32 object-cover"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-1 text-gray-800">{pharmacy.name}</h3>
        <p className="text-gray-600 text-sm">{pharmacy.address}</p>
        <p className="text-gray-600 text-sm">{pharmacy.phone}</p>

        <div className="mt-4 flex space-x-2">
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-3 rounded-full text-sm shadow-md"
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation de l'événement de clic
              handleOpenModal(); // Ouvre la modal
            }}
          >
            Détails
          </button>
        </div>
      </div>

      {/* Modal pour afficher les détails de la pharmacie */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{pharmacy.name}</h2>
            <img
              src={pharmacy.img || getRandomImageUrl()}
              alt={`Pharmacy ${pharmacy.name}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 mb-2">Adresse : {pharmacy.address}</p>
            <p className="text-gray-700 mb-2">Téléphone : {pharmacy.phone}</p>
            <p className="text-gray-700 mb-2">Email : {pharmacy.email}</p>
            {pharmacy.localisation && (
              <p className="text-gray-700 mb-2">
                Localisation : {pharmacy.localisation.latitude}, {pharmacy.localisation.longitude}
              </p>
            )}

            <button
              className="mt-4 bg-red-500 text-white py-1 px-4 rounded-full"
              onClick={handleCloseModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyCard;
