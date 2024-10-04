import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-sm rounded-lg animate-pulse">
      {/* Titre (nom du produit) */}
      <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
      
      {/* Image du produit */}
      <div className="h-64 bg-gray-300 rounded mb-6"></div>
      
      {/* Description */}
      <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
      
      {/* Prix */}
      <div className="h-6 bg-gray-300 rounded mb-4 w-1/4"></div>
      
      {/* Disponibilité en pharmacie */}
      {/* <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div> */}
    </div>
  );
};

export default ProductDetailSkeleton;
