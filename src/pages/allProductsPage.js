import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useFetchAllProducts } from '../hooks/useFecthProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartContext';

const AllProducts = () => {
  const { allProducts, isLoading, error } = useFetchAllProducts();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productConfirmation, setProductConfirmation] = useState({}); // État pour suivre les notifications des produits

  // Récupérer le paramètre de recherche depuis l'URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filtrer les produits en fonction du terme de recherche
  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchQuery, allProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);

    // Définir la notification pour le produit spécifique
    setProductConfirmation((prev) => ({
      ...prev,
      [product.name]: true,
    }));

    // Réinitialiser la notification après 3 secondes
    setTimeout(() => {
      setProductConfirmation((prev) => ({
        ...prev,
        [product.name]: false,
      }));
    }, 3000);
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
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les Produits'}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-5 relative">
                <img
                  src={
                    product.img ||
                    'https://media.istockphoto.com/id/1465073112/fr/photo/capsules-bleues-sur-convoyeur-dans-une-usine-pharmaceutique-moderne-processus-de-fabrication.webp?s=1024x1024&w=is&k=20&c=4UmTp1KXgISND5-pMjhwtOTmE3VCSZ10gQrMbJr9-Uk='
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-green-500 font-semibold text-lg mb-4">
                   {product.price || 'XX'} GNF
                </p>
                <p className="text-gray-600 mb-4">
                  Disponible à la <span className="text-green-500">{product.pharmacy.name}</span>
                </p>

                <div className="flex items-center mb-4">
                  <label className="text-gray-600 mr-2">Quantité:</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 border rounded text-center"
                    onChange={(e) => (product.quantity = parseInt(e.target.value))}
                  />
                </div>

                {product.prescription && (
                  <p className="text-red-500 text-sm">Requiert une ordonnance</p>
                )}

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700"
                >
                  <FaShoppingCart className="mr-2" />
                  Ajouter au panier
                </button>

                {/* Notification locale au produit */}
                {productConfirmation[product.name] && (
                  <div className="absolute top-2 right-2 bg-green-100 border border-green-400 text-green-700 px-3 py-1 rounded text-sm">
                    Produit ajouté au panier avec succès !
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {searchQuery
                ? 'Aucun produit ne correspond à votre recherche.'
                : 'Aucun produit disponible pour le moment.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
