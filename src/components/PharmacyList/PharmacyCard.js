import React from 'react';

const PharmacyCard = ({ pharmacy, handleViewProducts, getRandomImageUrl, handleFlyToPharmacy, handleViewDetails }) => {
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
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-1 px-3 rounded-full text-sm shadow-md"
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation de l'événement de clic
              handleViewProducts(pharmacy._id);
            }}
          >
            Voir Produits
          </button>

          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-3 rounded-full text-sm shadow-md"
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation de l'événement de clic
              handleViewDetails(pharmacy._id);
            }}
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
