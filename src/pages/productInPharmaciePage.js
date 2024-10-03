import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import useProductsInPharmacies from "../services/productsService"; 

const ProductsInPharmacie = () => {
  const products = useProductsInPharmacies(); 
  const navigate = useNavigate();

  const handleNavigate = (productInPharmacy) => {
    navigate(`/commandes`);
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 p-4">
        {products.length > 0 ? (
          products.map((productInPharmacy, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-5 transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-bold text-gray-800">
                {productInPharmacy.product.name}
              </h2>
              <p className="text-gray-500 mt-2">
                {productInPharmacy.product.description}
              </p>
              <p className="text-black mt-4">
                Prix : {productInPharmacy.price} €
              </p>
              <button
                className="mt-4 w-full bg-[#585B4C] text-white py-2 px-4 rounded-md hover:bg-[#40433A] transition-colors"
                onClick={() => handleNavigate(productInPharmacy)}
              >
                Commander
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsInPharmacie;
