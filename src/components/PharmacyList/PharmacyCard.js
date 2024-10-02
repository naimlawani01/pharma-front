import React from 'react';

const PharmacyCard = ({ pharmacy, handleViewProducts, getRandomImageUrl }) => {
  return (
    <div className="bg-white overflow-hidden">
      <img
        src={getRandomImageUrl()}
        alt={`Pharmacy ${pharmacy.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{pharmacy.name}</h3>
        <p className="text-gray-700 mb-1">{pharmacy.address}</p>
        <p className="text-gray-700 mb-4">{pharmacy.phone}</p>
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
