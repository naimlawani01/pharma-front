import React from 'react';
import PharmacyCard from './PharmacyCard'; // Importer la carte réelle de pharmacie
import PharmacyCardSkeleton from '../Skeleton/PharmacyCardSkeleton'; // Importer le squelette

const PharmacyList = ({ pharmacies, handleViewProducts, handleViewDetails, handleFlyToPharmacy, getRandomImageUrl, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading ? (
        // Affiche plusieurs squelettes pendant le chargement
        [...Array(4)].map((_, index) => (
          <PharmacyCardSkeleton key={index} />
        ))
      ) : (
        pharmacies.map((pharmacy, index) => (
          <PharmacyCard
            key={index}
            pharmacy={pharmacy}
            handleViewProducts={handleViewProducts}
            handleFlyToPharmacy={handleFlyToPharmacy}
            getRandomImageUrl={getRandomImageUrl}
            handleViewDetails={handleViewDetails}
          />
        ))
      )}
    </div>
  );
};

export default PharmacyList;
