import React from 'react';
import Navbar from '../components/navbar';
import useProductsService from '../services/productsService';

const AllProducts = () => {
  const { allProducts } = useProductsService();  

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 p-4">
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-5 transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-500 mt-2">
                {product.description}
              </p>
              {/* <p className="text-black mt-4">
                Prix : {product.price} €
              </p>
              <p className="text-gray-600 mt-2">
                Disponible à la pharmacie : <span className="font-semibold">{product.pharmacy.name}</span>
              </p> */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
