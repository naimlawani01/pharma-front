import React from 'react';
import Navbar from '../components/navbar';
import { useFetchAllProducts } from '../hooks/useFecthProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartContext';
import { useAuth } from '../hooks/useAuth'; // Hook pour gérer l'authentification
import { useNavigate } from 'react-router-dom'; // Pour rediriger l'utilisateur

const AllProducts = () => {
  const { allProducts, isLoading, error } = useFetchAllProducts();
  const { addToCart } = useCart(); // Utilisation du hook pour le panier
  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
  const navigate = useNavigate(); // Pour redirection

  const handleAddToCart = (product) => {
    if (user) {
      // Si l'utilisateur est connecté, ajouter au panier
      addToCart(product);
    } else {
      // Si l'utilisateur n'est pas connecté, redirection vers la page de login
      navigate('/login');
    }
  };

  if (isLoading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des produits.</p>;
  }

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

              <div
                className="mt-4 text-green-500 cursor-pointer flex items-center"
                onClick={() => handleAddToCart(product)} // Utilisation de la fonction conditionnelle
              >
                <FaShoppingCart className="mr-2" />
                <span>Ajouter au panier</span>
              </div>
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
