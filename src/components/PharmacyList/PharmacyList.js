import React from 'react';
import PharmacyCard from './PharmacyCard';

const PharmacyList = ({ pharmacies, handleViewProducts, getRandomImageUrl }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pharmacies.slice(0, 2).map((pharmacy, index) => (
        <PharmacyCard
          key={index}
          pharmacy={pharmacy}
          handleViewProducts={handleViewProducts}
          getRandomImageUrl={getRandomImageUrl}
        />
      ))}
    </div>
  );
};

export default PharmacyList;
