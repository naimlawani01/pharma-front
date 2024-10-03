import React from 'react';

const PharmacyCardSkeleton = () => {
  return (
    <div className="bg-white overflow-hidden rounded-sm shadow-sm animate-pulse">
      {/* Image simulée de la pharmacie */}
      <div className="h-48 bg-gray-300 rounded-t-sm mb-4"></div>
      {/* Contenu de la carte */}
      <div className="p-4">
        {/* Nom de la pharmacie */}
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        {/* Adresse de la pharmacie */}
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        {/* Numéro de téléphone */}
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        {/* Bouton de voir les produits */}
        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-32"></div>
      </div>
    </div>
  );
};

export default PharmacyCardSkeleton;
