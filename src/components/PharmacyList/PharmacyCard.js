import React from 'react';

const PharmacyCard = ({ pharmacy, handleViewProducts, getRandomImageUrl }) => {
  return (
    <div className="bg-white overflow-hidden rounded-sm shadow-sm">
      {/* Image de la pharmacie */}
      <img
        src={getRandomImageUrl()}
        alt={`Pharmacy ${pharmacy.name}`}
        className="w-full h-48 object-cover"
      />
      {/* Contenu de la carte */}
      <div className="p-4">
        {/* Nom de la pharmacie */}
        <h3 className="font-normal text-lg mb-2 text-left">{pharmacy.name}</h3>
        {/* Adresse de la pharmacie */}
        <p className="text-gray-700 mb-1 text-left">{pharmacy.address}</p>
        {/* Numéro de téléphone */}
        <p className="text-gray-700 font-light mb-4 text-left">{pharmacy.phone}</p>
        {/* Bouton de voir les produits */}
        <button
          className="w-auto bg-gradient-to-r from-green-400 to-teal-500 text-white py-1 px-3 rounded-full text-sm shadow-sm hover:shadow-md transition-transform transform"
          onClick={() => handleViewProducts(pharmacy._id)}
        >
          Voir les produits
        </button>
      </div>
    </div>
  );
};

export default PharmacyCard;
